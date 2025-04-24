// components/OurStory.js
import React from 'react';

const OurStory = () => {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl overflow-hidden">
            <img
              src="https://readdy.ai/api/search-image?query=Diverse%2520team%2520of%2520tech%2520professionals%2520collaborating%2520in%2520modern%2520office%2520space%2520with%2520glass%2520walls%2520and%2520purple%2520lighting%2520accents%252C%2520working%2520on%2520computer%2520screens%2520showing%2520AI%2520image%2520analysis%2520interfaces%252C%2520professional%2520environment%2520with%2520minimal%2520design&width=600&height=400&seq=about-story-img-01&orientation=landscape"
              alt="ImageChat founding team"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-300 mb-6">
              ImageChat began with a simple question: What if we could talk to
              our images? In 2020, our founders—a team of AI researchers,
              computer vision experts, and UX designers—came together to
              answer this question.
            </p>
            <p className="text-gray-300 mb-6">
              We recognized that while image recognition technology was
              advancing rapidly, the interfaces for interacting with these
              systems remained complex and technical. Our vision was to create
              a natural, conversational way to extract insights from visual
              data.
            </p>
            <h3 className="text-xl font-bold mb-4 text-[#7C3AED]">
              Our Mission
            </h3>
            <p className="text-gray-300 mb-6">
              To democratize access to advanced image analysis through
              intuitive, conversation-based interfaces that anyone can use,
              regardless of technical expertise.
            </p>
            <div className="flex flex-col space-y-4">
              <TimelineItem 
                icon="rocket" 
                year="2020" 
                text="Company founded in San Francisco" 
              />
              <TimelineItem 
                icon="code" 
                year="2021" 
                text="First beta version launched" 
              />
              <TimelineItem 
                icon="chart-line" 
                year="2023" 
                text="Reached 1 million users milestone" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ icon, year, text }) => (
  <div className="flex items-center">
    <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center mr-4">
      <i className={`fas fa-${icon} text-[#7C3AED]`}></i>
    </div>
    <div>
      <h4 className="font-semibold">{year}</h4>
      <p className="text-gray-400">{text}</p>
    </div>
  </div>
);

export default OurStory;