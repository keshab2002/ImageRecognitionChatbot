// components/DemoSection.jsx
import React, { useState } from "react";

const DemoSection = () => {
  const [fileSelected, setFileSelected] = useState(false);

  return (
    <div className="py-16 px-6 md:px-12 lg:px-20 bg-gray-900 bg-opacity-30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Experience It Yourself</h2>
            <p className="text-gray-400 mb-6">
              Upload an image and ask any question about it. Our AI will
              analyze the image and provide detailed answers based on what it
              sees.
            </p>
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center mr-3">
                  <i className="fas fa-check text-sm"></i>
                </div>
                <span className="text-gray-300">
                  Identify objects, people, and scenes
                </span>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center mr-3">
                  <i className="fas fa-check text-sm"></i>
                </div>
                <span className="text-gray-300">
                  Extract and analyze text from images
                </span>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center mr-3">
                  <i className="fas fa-check text-sm"></i>
                </div>
                <span className="text-gray-300">
                  Get detailed descriptions and insights
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center mr-3">
                  <i className="fas fa-check text-sm"></i>
                </div>
                <span className="text-gray-300">
                  Ask follow-up questions for deeper analysis
                </span>
              </div>
            </div>
            <button className="bg-[#7C3AED] hover:bg-[#6D28D9] px-6 py-3 rounded-md text-white font-medium cursor-pointer whitespace-nowrap !rounded-button">
              Try Demo Now
            </button>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="mb-6">
              <div
                className={`border-2 border-dashed ${
                  fileSelected ? "border-green-500" : "border-gray-600"
                } rounded-lg p-8 text-center cursor-pointer`}
                onClick={() => setFileSelected(true)}
              >
                {fileSelected ? (
                  <div>
                    <div
                      className="w-full h-48 bg-cover bg-center rounded mb-3"
                      style={{
                        backgroundImage: `url('https://readdy.ai/api/search-image?query=professional%20DSLR%20photo%20of%20a%20modern%20city%20skyline%20with%20tall%20skyscrapers%20and%20urban%20architecture%20at%20sunset%2C%20vibrant%20colors%20reflecting%20on%20glass%20buildings%2C%20high%20resolution%20detailed%20cityscape%20with%20dramatic%20sky&width=400&height=200&seq=demo-img-01&orientation=landscape')`,
                      }}
                    ></div>
                    <p className="text-green-500 font-medium">
                      Image uploaded successfully!
                    </p>
                  </div>
                ) : (
                  <div>
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-500 mb-3"></i>
                    <p className="text-gray-400">
                      Drag & drop your image here or click to browse
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Supports JPG, PNG, GIF (Max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">
                Ask a question about your image:
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="What's in this image?"
                  className="w-full bg-gray-700 border-none rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-[#7C3AED] focus:outline-none"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#7C3AED] p-2 rounded-md cursor-pointer whitespace-nowrap !rounded-button">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
            <div className="bg-gray-900 rounded-md p-4">
              <div className="flex items-start mb-4">
                <div className="bg-[#7C3AED] p-2 rounded-md mr-3">
                  <i className="fas fa-robot text-sm"></i>
                </div>
                <div>
                  <p className="text-gray-300">
                    This image shows a modern city skyline at sunset. There are
                    several tall skyscrapers with glass facades reflecting the
                    orange and purple hues of the sunset. The architecture
                    appears to be contemporary with a mix of different building
                    heights creating an interesting urban silhouette.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;