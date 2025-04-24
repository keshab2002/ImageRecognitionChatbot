// components/CTA.js
import React from 'react';

const CTA = () => {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Join Us on Our Mission</h2>
        <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
          Whether you're looking to use our technology, join our team, or
          partner with us, we're excited to connect and explore possibilities
          together.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-[#4F46E5] hover:bg-gray-100 px-6 py-3 rounded-md font-medium cursor-pointer whitespace-nowrap !rounded-button">
            Try ImageChat
          </button>
          <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium cursor-pointer whitespace-nowrap !rounded-button">
            View Careers
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;