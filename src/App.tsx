/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AllTools from './pages/AllTools';
import Blog from './pages/Blog';
import AgeCalculator from './pages/AgeCalculator';
import BmiCalculator from './pages/BmiCalculator';
import CalorieCalculator from './pages/CalorieCalculator';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#111111] dark:text-white font-sans selection:bg-[#D4AF37]/20 flex flex-col transition-colors duration-300">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/all-tools" element={<AllTools />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/bmi-calculator" element={<BmiCalculator />} />
          <Route path="/calorie-calculator" element={<CalorieCalculator />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
