// components/LeadershipTeam.js
import React from 'react';

const LeadershipTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      bio: "Former AI Research Lead at Google with 15+ years of experience in computer vision and machine learning.",
      image: "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520Asian%2520female%2520tech%2520CEO%2520in%2520her%252040s%2520with%2520shoulder-length%2520black%2520hair%252C%2520wearing%2520modern%2520business%2520attire%2520with%2520purple%2520accent%252C%2520neutral%2520studio%2520background%252C%2520confident%2520expression%252C%2520high-quality%2520portrait&width=400&height=400&seq=team-member-1&orientation=portrait",
      color: "#7C3AED",
      social: ["linkedin", "twitter"]
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Co-Founder & CTO",
      bio: "PhD in Computer Science from MIT, specializing in natural language processing and multimodal AI systems.",
      image: "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520Black%2520male%2520tech%2520executive%2520in%2520his%252030s%2520with%2520short%2520hair%2520and%2520glasses%252C%2520wearing%2520modern%2520business%2520casual%2520attire%252C%2520neutral%2520studio%2520background%252C%2520friendly%2520confident%2520expression%252C%2520high-quality%2520portrait&width=400&height=400&seq=team-member-2&orientation=portrait",
      color: "#3B82F6",
      social: ["linkedin", "github"]
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Chief Product Officer",
      bio: "Former UX Director at Adobe with expertise in creating intuitive interfaces for complex technologies.",
      image: "https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520Hispanic%2520female%2520tech%2520executive%2520in%2520her%252030s%2520with%2520curly%2520hair%252C%2520wearing%2520modern%2520business%2520attire%252C%2520neutral%2520studio%2520background%252C%2520warm%2520professional%2520smile%252C%2520high-quality%2520portrait&width=400&height=400&seq=team-member-3&orientation=portrait",
      color: "#EC4899",
      social: ["linkedin", "dribbble"]
    }
  ];

  return (
    <div className="py-16 px-6 md:px-12 lg:px-20 bg-gray-900 bg-opacity-30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet the visionaries and experts driving ImageChat's innovation
            and growth.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(member => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamMemberCard = ({ member }) => (
  <div className="bg-gray-800 rounded-xl overflow-hidden">
    <div className="h-64 overflow-hidden">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover object-top"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
      <p className={`text-[${member.color}] mb-4`}>{member.role}</p>
      <p className="text-gray-400 mb-4">{member.bio}</p>
      <div className="flex space-x-4">
        {member.social.map(platform => (
          <a
            key={platform}
            href="#"
            className="text-gray-400 hover:text-[#7C3AED] cursor-pointer"
          >
            <i className={`fab fa-${platform}`}></i>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default LeadershipTeam;