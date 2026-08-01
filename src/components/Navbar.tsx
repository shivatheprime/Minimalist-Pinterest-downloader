import React, { useState, useEffect } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Theme logic
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled ? "bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-gray-100 dark:border-white/5 py-3 shadow-sm" : "bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-[#111111] dark:bg-white rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white dark:text-[#111111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-[#111111] dark:text-white">PinVault</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            <a href="#" className="text-[#111111] dark:text-white border-b border-[#D4AF37] pb-1">
              Pinterest Video
            </a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">
              Pinterest Image
            </a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">
              YouTube Thumbnail
            </a>
            <Link to="/all-tools" className="hover:text-[#D4AF37] transition-colors">
              All Tools
            </Link>
            <Link to="/blog" className="hover:text-[#D4AF37] transition-colors">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <button onClick={toggleTheme} className="p-2 text-gray-400 hover:text-[#111111] dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-white/5">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="hidden lg:flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-gray-400 cursor-pointer hover:text-[#111111] dark:hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
