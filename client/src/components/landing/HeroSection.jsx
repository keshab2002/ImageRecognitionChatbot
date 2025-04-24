import React from 'react';
import Message from '../chat/Message';

const HeroSection = ({
  onSignupClick,
  messages,
  inputMessage,
  onInputChange,
  onSendMessage,
  onKeyPress,
  remainingQuestions,
  onImageUpload
}) => {
  return (
    <div className="relative pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=futuristic%20gaming%20setup%20with%20neon%20purple%20and%20blue%20lights%2C%20advanced%20technology%20interface%2C%20holographic%20displays%2C%20high-tech%20environment%20with%20glowing%20elements%2C%20cyberpunk%20aesthetic%2C%20detailed%203D%20rendering%20with%20ray%20tracing%2C%20cinematic%20lighting&width=1440&height=800&seq=001&orientation=landscape"
          alt="Hero Background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Unlock the Power of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Visual AI
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Upload any image and chat with our advanced AI to analyze,
              understand, and extract insights. Perfect for gamers,
              creators, and tech enthusiasts.
            </p>
            <div className="mt-10 flex space-x-4">
              <button
                onClick={onSignupClick}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 ease-in-out shadow-lg hover:shadow-purple-500/30"
              >
                Get Started
              </button>
              <a
                href="#features"
                className="px-8 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 ease-in-out"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="hidden md:block md:w-1/2 ml-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">
                  Chat with AI Assistant
                </h3>
                <span className="px-2 py-1 text-xs font-medium text-green-400 bg-green-400/10 rounded-full">
                  Online
                </span>
              </div>
              <div className="h-80 overflow-y-auto mb-4 space-y-4">
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    text={message.text}
                    sender={message.sender}
                    timestamp={message.timestamp}
                  />
                ))}
              </div>
              <div className="relative flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={onInputChange}
                  onKeyPress={onKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-gray-700 border-none rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                />
                <label className="flex items-center px-4 py-3 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                  <i className="fas fa-image mr-2"></i>
                  <span>Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onImageUpload}
                  />
                </label>
                <button
                  onClick={onSendMessage}
                  className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                {remainingQuestions > 0
                  ? `${remainingQuestions} questions remaining before signup required`
                  : "Please sign up to continue chatting"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;