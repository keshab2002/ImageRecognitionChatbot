import React from "react";
import HeroSection from "../components/aboutus/HeroSection.jsx";
import OurStory from "../components/aboutus/OurStory.jsx";
import Team from "../components/aboutus/Team.jsx";
import Achievements from "../components/aboutus/Achievements.jsx";
import CTA from "../components/aboutus/CTA.jsx";

const AboutUs = () => {
  return (
    <div>
      <HeroSection classname="mt-200"/>
      <OurStory/>
      <Team/>
      <Achievements/>
      <CTA/>
    </div>
  );
};

export default AboutUs;
