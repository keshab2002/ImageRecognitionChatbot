/* eslint-disable no-unused-vars */
"use client";
import TextareaAutosize from "react-textarea-autosize";

import { Pencil, Trash2 } from "lucide-react"; // ✅ Lucide icons
import React, { useEffect, useRef, useState } from "react";
const USER_ID = "12345"; // replace with dynamic userId if needed

const Home = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messageWriting, setMessageWriting] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/user/${USER_ID}`)
      .then((res) => res.json())
      .then((res) => setChats(res.data.chats || []))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatDetails = (chatId) => {
    setSelectedChatId(chatId);
    fetch(`http://localhost:5000/api/chat/${chatId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.data.messages || []))
      .catch((err) => console.log(err));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setIsUploadingImage(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.optimizedUrl) {
        setImagePreviewUrl(data.optimizedUrl);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const sendMessage = async () => {
    if (!messageWriting.trim() && !imagePreviewUrl) return;

    const userMessage = {
      role: "user",
      content: messageWriting,
      imageUrl: imagePreviewUrl || "",
    };

    // Add the user message to the state immediately for UI responsiveness
    setMessages((prev) => [...prev, userMessage]);

    // Clear input fields
    setMessageWriting("");
    setImage(null);
    setImagePreviewUrl("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: selectedChatId,
          role: "user",
          content: userMessage.content,
          imageUrl: userMessage.imageUrl,
        }),
      });

      const data = await res.json();
      console.log("Message sent:", data);

      // After getting the assistant's response, update state with it
      const assistantMessage = {
        role: "assistant",
        geminiResponse: data.data.text || "", // assuming content holds AI reply
      };
      console.log("Assistant message:", assistantMessage);

      setMessages((prev) => [...prev, assistantMessage]);

      // Scroll to bottom after the new message is added
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewChat = async () => {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: USER_ID,
        title: prompt("Enter new chat title:"),
      }),
    });

    const data = await res.json();
    setChats((prev) => [...prev, data.data]);
  };

  const renameChat = async (chatId) => {
    const newTitle = prompt("Enter new chat title:");
    if (!newTitle) return;
    const res = await fetch(`http://localhost:5000/api/chat`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, chatId: chatId }),
    });
    const data = await res.json();
    setChats((prev) =>
      prev.map((chat) => (chat._id === chatId ? data.data : chat))
    );
  };

  const deleteChat = async (chatId) => {
    const confirmDelete = window.confirm("Are you sure to delete this chat?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/chat`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: USER_ID, chatId }),
    });

    setChats((prev) => prev.filter((chat) => chat._id !== chatId));
    if (selectedChatId === chatId) {
      setSelectedChatId(null);
      setMessages([]);
    }
  };

  return (
    <div className="mt-16 flex h-[calc(100vh-4rem)] bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      {isHistoryOpen && (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Chat History</h2>
          </div>

          <button
            onClick={createNewChat}
            className="mx-4 my-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Chat
          </button>

          <div className="overflow-y-auto flex-1">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => fetchChatDetails(chat._id)}
                className={`group p-3 px-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer ${
                  selectedChatId === chat._id ? "bg-blue-50" : ""
                }`}
              >
                <span className="text-sm font-medium truncate max-w-[120px]">
                  {chat.title}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      renameChat(chat._id);
                    }}
                    className="text-gray-500 hover:text-blue-600"
                    title="Rename"
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat._id);
                    }}
                    className="text-gray-500 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <button
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">PixelMide</h1>
          <div className="w-5"></div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-2">
                {msg.content || msg.imageUrl ? (
                  <div className="flex justify-end">
                    <div className="max-w-lg rounded-lg px-4 py-2 bg-blue-500 text-white">
                      {msg.imageUrl && (
                        <img
                          src={msg.imageUrl}
                          alt="Uploaded"
                          className="max-w-xs max-h-48 rounded-lg object-contain mb-2"
                        />
                      )}
                      {msg.content && <p>{msg.content}</p>}
                    </div>
                  </div>
                ) : null}

                {msg.geminiResponse && (
                  <div className="flex justify-start">
                    <div className="max-w-lg rounded-lg px-4 py-2 bg-white text-gray-800 border border-gray-200">
                      <p className="whitespace-pre-line">
                        {msg.geminiResponse}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messageEndRef} />
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white text-gray-600 border border-gray-200 animate-pulse">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}
            {isUploadingImage && (
              <div className="flex justify-end">
                <div className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 border border-blue-300 animate-pulse">
                  Uploading image...
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
          <div className="flex space-x-2">
            {/* <input
              type="text"
              value={messageWriting}
              onChange={(e) => setMessageWriting(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             */}
            <TextareaAutosize
              value={messageWriting}
              onChange={(e) => setMessageWriting(e.target.value)}
              placeholder="Type your message..."
              minRows={1}
              className="flex-1 resize-none border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="flex items-center px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              📎
            </label>
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
