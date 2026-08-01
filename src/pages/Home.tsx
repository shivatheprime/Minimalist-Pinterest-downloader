import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      
      {/* Subtle divider */}
      <div className="max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-gray-100 dark:via-white/10 to-transparent my-8" />
      
      <Stats />
      <HowItWorks />
      <Features />
      
      <div className="max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-gray-100 dark:via-white/10 to-transparent my-8" />
      <FAQ />
    </main>
  );
}
