// components/CtaSection.jsx
import React from "react";

const CtaSection = () => {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Transform Your Image Analysis?
        </h2>
        <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already leveraging the power of AI to
          gain insights from their images. Start your journey today with our free
          trial.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-[#4F46E5] hover:bg-gray-100 px-6 py-3 rounded-md font-medium cursor-pointer whitespace-nowrap !rounded-button">
            Start Free Trial
          </button>
          <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium cursor-pointer whitespace-nowrap !rounded-button">
            View Pricing
          </button>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;