// components/HeroSection.js
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#0F172A] z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%2520tech%2520company%2520office%2520with%2520purple%2520and%2520blue%2520lighting%2520accents%252C%2520open%2520workspace%2520with%2520glass%2520walls%252C%2520computer%2520workstations%2520and%2520collaborative%2520areas%252C%2520futuristic%2520aesthetic%2520with%2520clean%2520lines%2520and%2520minimal%2520design%252C%2520high-tech%2520environment&width=1440&height=400&seq=about-hero-bg-01&orientation=landscape')`,
          }}
        ></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          About ImageChat
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl">
          Pioneering the future of AI-powered image analysis since 2020. We're
          on a mission to make visual data accessible through natural
          conversations.
        </p>
        <div className="flex items-center text-gray-400">
          <div className="flex items-center mr-8">
            <i className="fas fa-calendar-alt mr-2 text-[#7C3AED]"></i>
            <span>Founded in 2020</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-map-marker-alt mr-2 text-[#7C3AED]"></i>
            <span>San Francisco, CA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;