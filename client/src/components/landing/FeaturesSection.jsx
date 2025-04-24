import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: "fas fa-eye",
      title: "Advanced Recognition",
      description: "Our AI can identify objects, people, text, and scenes with incredible accuracy.",
      color: "bg-purple-600"
    },
    {
      icon: "fas fa-comments",
      title: "Natural Conversations",
      description: "Chat naturally with our AI about any aspect of your uploaded images.",
      color: "bg-blue-600"
    },
    {
      icon: "fas fa-history",
      title: "Chat History",
      description: "All your conversations are saved for future reference and analysis.",
      color: "bg-green-600"
    }
  ];

  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Everything you need to analyze and understand your images
          </p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700 transform transition-all duration-300 hover:scale-105 hover:border-purple-500">
                <div className={`h-12 w-12 rounded-md ${feature.color} flex items-center justify-center`}>
                  <i className={`${feature.icon} text-white text-xl`}></i>
                </div>
                <h3 className="mt-6 text-xl font-medium text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;