// components/HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
    <div className="mt-16 relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#0F172A] z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Abstract%20digital%20network%20pattern%20with%20glowing%20blue%20lines%20and%20nodes%20on%20dark%20background%2C%20tech%20circuit%20board%20design%20with%20geometric%20patterns%2C%20futuristic%20technology%20concept%20with%20grid%20lines%20and%20connection%20points&width=1440&height=400&seq=hero-bg-01&orientation=landscape')`,
          }}
        ></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Features & Capabilities
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl">
          Experience the power of AI-driven image analysis through natural
          conversations. Upload any image and ask questions to get detailed
          insights instantly.
        </p>
        <button className="bg-[#7C3AED] hover:bg-[#6D28D9] px-6 py-3 rounded-md text-white font-medium cursor-pointer whitespace-nowrap !rounded-button">
          Try Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;