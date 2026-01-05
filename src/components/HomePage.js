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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      <div className="relative">
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
