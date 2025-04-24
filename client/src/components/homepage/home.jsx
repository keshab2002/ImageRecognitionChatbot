import React, { useState } from "react";

const Home = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [activeChatId, setActiveChatId] = useState(1);
  const [chatSessions, setChatSessions] = useState([
    { 
      id: 1, 
      title: "First Chat", 
      messages: [
        {
          id: 1,
          sender: "user",
          text: "Hello, how are you?",
          timestamp: new Date().toLocaleTimeString(),
        },
        {
          id: 2,
          sender: "bot",
          text: "I'm doing well, thank you! How can I assist you today?",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]
    },
    { 
      id: 2, 
      title: "Project Discussion", 
      messages: [
        {
          id: 1,
          sender: "user",
          text: "About the design...",
          timestamp: new Date().toLocaleTimeString(),
        },
        {
          id: 2,
          sender: "bot",
          text: "What specific aspect of the design?",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]
    },
  ]);

  const currentChat = chatSessions.find(chat => chat.id === activeChatId);
  const chatHistory = currentChat ? currentChat.messages : [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newUserMessage = {
      id: chatHistory.length + 1,
      sender: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === activeChatId
          ? { ...session, messages: [...session.messages, newUserMessage] }
          : session
      )
    );
    setMessage("");

    setTimeout(() => {
      const botResponse = {
        id: chatHistory.length + 2,
        sender: "bot",
        text: "Thanks for your message! How can I help you further?",
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatSessions(prevSessions => 
        prevSessions.map(session => 
          session.id === activeChatId
            ? { ...session, messages: [...session.messages, botResponse] }
            : session
        )
      );
    }, 1000);
  };

  const startNewChat = () => {
    const newChatId = chatSessions.length > 0 ? Math.max(...chatSessions.map(c => c.id)) + 1 : 1;
    const newChat = {
      id: newChatId,
      title: `Chat ${newChatId}`,
      messages: []
    };
    
    setChatSessions([newChat, ...chatSessions]);
    setActiveChatId(newChatId);
  };

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);

    const fileMessage = {
      id: chatHistory.length + 1,
      sender: "user",
      content: (
        <img 
          src={fileUrl} 
          alt="Uploaded content" 
          className="max-w-xs max-h-48 rounded-lg object-contain"
        />
      ),
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === activeChatId
          ? { ...session, messages: [...session.messages, fileMessage] }
          : session
      )
    );
  };

  return (
    <div className="mt-16 flex h-screen bg-gray-100">
      {/* Chat History Sidebar */}
      {isHistoryOpen && (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Chat History</h2>
          </div>
          
          <button
            onClick={startNewChat}
            className="mx-4 my-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
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
            {chatSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => handleChatSelect(session.id)}
                className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                  session.id === activeChatId ? "bg-blue-50" : ""
                }`}
              >
                <p className="text-sm font-medium">{session.title}</p>
                <p className="text-xs text-gray-500 truncate">
                  {session.messages.length > 0 
                    ? (session.messages[session.messages.length - 1].text || "Photo sent")
                    : "No messages yet"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
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
          <h1 className="text-xl font-semibold">Chat Assistant</h1>
          <div className="w-5"></div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {msg.content ? (
                    <div className="bg-transparent p-0">{msg.content}</div>
                  ) : (
                    <p>{msg.text}</p>
                  )}
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "user" ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <label className="flex items-center px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*"
              />
            </label>
            
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;