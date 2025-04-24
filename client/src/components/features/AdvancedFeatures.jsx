// components/AdvancedFeatures.jsx
import React from "react";

const AdvancedFeatures = () => {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover the full range of powerful capabilities that make ImageChat
          the leading image analysis platform.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature Item 1 */}
        <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 hover:bg-opacity-70 transition-all">
          <div className="text-[#7C3AED] mb-4">
            <i className="fas fa-object-group text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Object Detection</h3>
          <p className="text-gray-400">
            Precisely identify and locate multiple objects within a single image
            with high accuracy.
          </p>
        </div>
        {/* Feature Item 2 */}
        <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 hover:bg-opacity-70 transition-all">
          <div className="text-[#3B82F6] mb-4">
            <i className="fas fa-font text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Text Recognition</h3>
          <p className="text-gray-400">
            Extract and analyze text from images, including handwriting, printed
            text, and various languages.
          </p>
        </div>
        {/* Feature Item 3 */}
        <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 hover:bg-opacity-70 transition-all">
          <div className="text-[#EC4899] mb-4">
            <i className="fas fa-palette text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Color Analysis</h3>
          <p className="text-gray-400">
            Identify dominant colors, patterns, and color schemes within any
            uploaded image.
          </p>
        </div>
        {/* Feature Item 4 */}
        <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 hover:bg-opacity-70 transition-all">
          <div className="text-[#10B981] mb-4">
            <i className="fas fa-mountain text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Scene Understanding</h3>
          <p className="text-gray-400">
            Recognize environments, settings, and contexts with detailed scene
            classification.
          </p>
        </div>
        {/* Feature Item 5 */}
        <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 hover:bg-opacity-70 transition-all">
          <div className="text-[#F59E0B] mb-4">
            <i className="fas fa-history text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Conversation History</h3>
          <p className="text-gray-400">
            Access past image analyses and conversations with our intelligent
            history tracking.
          </p>
        </div>
        {/* Feature Item 6 */}
        <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 hover:bg-opacity-70 transition-all">
          <div className="text-[#8B5CF6] mb-4">
            <i className="fas fa-share-alt text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Easy Sharing</h3>
          <p className="text-gray-400">
            Share your image analyses with colleagues or friends with one-click
            sharing options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFeatures;