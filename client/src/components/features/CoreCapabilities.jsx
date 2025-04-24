// components/CoreCapabilities.jsx
import React from "react";

const CoreCapabilities = () => {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Core Capabilities</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our advanced AI technology combines powerful image recognition with
          natural language processing to deliver an intuitive image analysis
          experience.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Feature Card 1 */}
        <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800 hover:border-[#7C3AED] transition-all">
          <div className="bg-[#7C3AED] w-14 h-14 rounded-lg flex items-center justify-center mb-6">
            <i className="fas fa-eye text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-3">Smart Image Analysis</h3>
          <p className="text-gray-400 mb-4">
            Upload any image and our AI will analyze every detail with
            industry-leading accuracy, identifying objects, text, scenes, and
            more.
          </p>
          <a
            href="#"
            className="text-[#7C3AED] hover:text-[#9F7AEA] flex items-center cursor-pointer"
          >
            Learn More <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
        {/* Feature Card 2 */}
        <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800 hover:border-[#7C3AED] transition-all">
          <div className="bg-[#3B82F6] w-14 h-14 rounded-lg flex items-center justify-center mb-6">
            <i className="fas fa-comments text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-3">Natural Conversations</h3>
          <p className="text-gray-400 mb-4">
            Ask questions about any aspect of your images and receive
            intelligent, context-aware responses through our advanced language
            model.
          </p>
          <a
            href="#"
            className="text-[#3B82F6] hover:text-[#60A5FA] flex items-center cursor-pointer"
          >
            Learn More <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
        {/* Feature Card 3 */}
        <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800 hover:border-[#7C3AED] transition-all">
          <div className="bg-[#EC4899] w-14 h-14 rounded-lg flex items-center justify-center mb-6">
            <i className="fas fa-file-image text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-3">Universal Compatibility</h3>
          <p className="text-gray-400 mb-4">
            Support for all major image formats including JPG, PNG, GIF, and
            more. Upload from any device or directly from the web.
          </p>
          <a
            href="#"
            className="text-[#EC4899] hover:text-[#F472B6] flex items-center cursor-pointer"
          >
            Learn More <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CoreCapabilities;