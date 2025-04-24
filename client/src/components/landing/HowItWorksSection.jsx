import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Upload Your Image",
      description: "Drag and drop or select any image you want to analyze. We support all common formats.",
      image: "https://readdy.ai/api/search-image?query=person%20dragging%20and%20dropping%20image%20file%20into%20futuristic%20interface%2C%20glowing%20neon%20purple%20and%20blue%20upload%20area%2C%20cyberpunk%20style%2C%20digital%20art%20with%20high%20detail%2C%20dark%20background%20with%20tech%20elements%2C%203D%20rendering&width=400&height=200&seq=002&orientation=landscape"
    },
    {
      number: "2",
      title: "Ask Questions",
      description: "Chat with our AI about anything you see in the image. Ask specific questions or get general insights.",
      image: "https://readdy.ai/api/search-image?query=person%20typing%20questions%20in%20futuristic%20chat%20interface%20with%20holographic%20elements%2C%20AI%20assistant%20responding%2C%20neon%20blue%20and%20purple%20glow%2C%20cyberpunk%20aesthetic%2C%20dark%20tech%20environment%2C%20detailed%20digital%20art&width=400&height=200&seq=003&orientation=landscape"
    },
    {
      number: "3",
      title: "Get Insights",
      description: "Receive detailed analysis, recommendations, and information based on your image content.",
      image: "https://readdy.ai/api/search-image?query=futuristic%20data%20visualization%20with%20holographic%20charts%20and%20graphs%2C%20AI%20analyzing%20image%20content%2C%20glowing%20purple%20and%20blue%20interface%20elements%2C%20cyberpunk%20style%2C%20dark%20tech%20environment%20with%20neon%20highlights%2C%20detailed%203D%20rendering&width=400&height=200&seq=004&orientation=landscape"
    }
  ];

  return (
    <div className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Simple, powerful, and intuitive
          </p>
        </div>
        <div className="mt-16">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-800 text-lg font-medium text-gray-400">
                Three simple steps
              </span>
            </div>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-8 grid-cols-1 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold">{step.number}</span>
                      </div>
                      <h3 className="ml-3 text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-base text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 h-48 overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={step.image}
                    alt={step.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;