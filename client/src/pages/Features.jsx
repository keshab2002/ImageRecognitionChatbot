import React from 'react'
import HeroSection from '../components/features/HeroSection.jsx';
import CoreCapabilities from '../components/features/CoreCapabilities.jsx';
import AdvancedFeatures from '../components/features/AdvancedFeatures.jsx';
import DemoSection from '../components/features/DemoSection.jsx';
import CtaSection from '../components/features/CtaSection.jsx';

function Features() {
  return (
    <div>
        <HeroSection/>
        <CoreCapabilities/>
        <DemoSection/>
        <AdvancedFeatures/>
        <CtaSection/>

    </div>
  )
}

export default Features