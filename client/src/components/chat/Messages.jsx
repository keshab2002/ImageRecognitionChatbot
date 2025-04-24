import React from 'react';

const Messages = ({ text, sender, timestamp }) => {
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
          sender === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-200"
        }`}
      >
        <p>{text}</p>
        <p
          className={`text-xs mt-1 ${
            sender === "user" ? "text-purple-200" : "text-gray-400"
          }`}
        >
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default Messages;
