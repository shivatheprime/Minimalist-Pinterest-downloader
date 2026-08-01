import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit3, Mail } from 'lucide-react';

export default function Blog() {
  return (
    <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto w-full text-center"
      >
        <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gray-100 dark:border-white/5">
          <Edit3 className="w-10 h-10 text-[#D4AF37]" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
          Our Blog is <br/> 
          <span className="italic font-light">Launching Soon</span>
        </h1>
        
        <p className="text-gray-500 dark:text-gray-400 mb-12 text-lg max-w-lg mx-auto leading-relaxed">
          Get ready for deep dives into content creation, tips for maximizing your workflow, and updates on our latest tools. We're polishing up our first articles!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 text-[#111111] dark:text-white rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all group">
            <Mail className="w-5 h-5" />
            <span>Notify Me</span>
          </button>
        </div>
      </motion.div>
    </main>
  );
}
