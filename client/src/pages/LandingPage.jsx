import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/landing/HeroSection.jsx';
import Features from '../components/landing/FeaturesSection.jsx';
import CtaSection from '../components/landing/CtaSection.jsx';
import HowItWorksSection from '../components/landing/HowItWorksSection.jsx';

const LandingPage = () => {
  return (

    <div>
        <HeroSection/>
        <Features/>
        <HowItWorksSection/>
        <CtaSection/>
    </div>
    // <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 px-4">
    //   <div className="max-w-2xl text-center">
    //     <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-700">
    //       Welcome to AI Chatbot
    //     </h1>
    //     <p className="text-lg md:text-xl mb-8 text-gray-600">
    //       A smart conversational assistant powered by GPT and image recognition. Start chatting, upload images, and get intelligent responses in real time.
    //     </p>
    //     <div className="flex flex-col md:flex-row justify-center gap-4">
    //       <Link
    //         to="/chatpage"
    //         className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
    //       >
    //         Get Started
    //       </Link>
    //       <a
    //         href="https://github.com/your-repo"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition"
    //       >
    //         View on GitHub
    //       </a>
    //     </div>
    //   </div>
    // </section>
  );
};

export default LandingPage;
