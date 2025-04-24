// components/Achievements.js
import React from 'react';

const Achievements = () => {
  const achievements = [
    {
      value: "1M+",
      title: "Active Users",
      description: "Trusted by over a million users worldwide to analyze and understand their images.",
      color: "#7C3AED"
    },
    {
      value: "98%",
      title: "Accuracy Rate",
      description: "Our AI consistently achieves industry-leading accuracy in image recognition tasks.",
      color: "#3B82F6"
    },
    {
      value: "5",
      title: "Industry Awards",
      description: "Recognized for innovation in AI and user experience design.",
      color: "#EC4899"
    }
  ];

  return (
    <div className="py-16 px-6 md:px-12 lg:px-20 bg-gray-900 bg-opacity-30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Milestones and recognition that mark our journey of innovation and
            growth.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AchievementCard = ({ achievement }) => (
  <div className="bg-gray-800 rounded-xl p-6 text-center">
    <div className={`text-[${achievement.color}] text-4xl font-bold mb-2`}>
      {achievement.value}
    </div>
    <h3 className="text-xl font-semibold mb-3">{achievement.title}</h3>
    <p className="text-gray-400">{achievement.description}</p>
  </div>
);

export default Achievements;