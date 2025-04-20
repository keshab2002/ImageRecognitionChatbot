import { useState, useRef, useEffect } from 'react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
      addMessage('user', null, data.imageUrl);
      setPrompt('');
    } catch (error) {
      addMessage('error', error.message);
    } finally {
      setIsLoading(false);
      e.target.value = '';
    }
  };

  const addMessage = (role, text, imageUrl = null) => {
    const newMessage = {
      id: Date.now(),
      role,
      text,
      imageUrl,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt && !imageUrl) return;

    if (prompt) {
      addMessage('user', prompt);
    }

    setPrompt('');
    setIsLoading(true);

    try {
      addMessage('assistant', 'Thinking...');

      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          imagePath: imageUrl ? new URL(imageUrl).pathname : null
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      //  "Thinking..." message -> actual response
      setMessages(prev => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (updated[lastIndex].text === 'Thinking...') {
          updated[lastIndex].text = data.text;
        }
        return updated;
      });
    } catch (error) {
      addMessage('error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-app">
      <h1>Image Recognition Chatbot By Keshab Dey 😎</h1>
      
      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}-message`}>
            {message.imageUrl && (
              <img src={message.imageUrl} alt="Uploaded content" />
            )}
            {message.text && (
              <div 
                dangerouslySetInnerHTML={{
                  __html: message.role === 'assistant' 
                    ? md.render(message.text) 
                    : message.text
                }} 
              />
            )}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="chat-form">
        <div className="input-area">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={isLoading}
            className="upload-btn"
          >
            {isLoading ? 'Uploading...' : 'Upload Image'}
          </button>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={imageUrl ? 'Ask about the image...' : 'Upload an image first...'}
            disabled={!imageUrl || isLoading}
          />
          <button
            type="submit"
            disabled={!imageUrl || isLoading}
            className="send-btn"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}