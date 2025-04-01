"use client"
import React from 'react';
import Navbar from './components/Landing/Navbar';
import HeroSection from './components/Landing/HeroSection';
import FeaturesSection from './components/Landing/FeaturesSection';
import HowItWorks from './components/Landing/HowItWorks';
import TestimonialsSection from './components/Landing/TestimonialsSection';
import CTASection from './components/Landing/CTASection';
import Footer from './components/Landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;