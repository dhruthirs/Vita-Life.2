import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import StatsSection from './StatsSection';
import CallToAction from './CallToAction';
import Testimonials from './Testimonials';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="relative">
        {/* subtle dark overlay between background and content for readability */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
        <div className="relative pt-16">
          <Hero />
          <Features />
          <StatsSection />
          <CallToAction />
          <Testimonials />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
