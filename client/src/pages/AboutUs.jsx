import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          About PixelMide
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          At PixelMide, we're building the future of AI-powered interaction by combining conversational AI with powerful image recognition. Our mission is to make visual data more accessible, understandable, and actionable — for everyone.
        </p>
        <div className="grid gap-8 md:grid-cols-2 text-left">
          <div>
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">🚀 Our Vision</h2>
            <p className="text-gray-400">
              We envision a world where AI enhances how we communicate with images. Whether it's helping students, professionals, or hobbyists — PixelMide provides intuitive tools to interact with visual content like never before.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-400 mb-2">💡 Our Approach</h2>
            <p className="text-gray-400">
              We leverage state-of-the-art AI models for both language and image understanding. From smart chatbots to intelligent search features, every line of code is crafted to enhance usability and accessibility.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-purple-300 mb-4">👨‍💻 Meet the Team</h2>
          <p className="text-gray-400">
            We're a passionate team of developers, designers, and AI enthusiasts — driven by the idea of creating something truly useful and impactful. Join us on our journey as we continue to innovate and grow!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
