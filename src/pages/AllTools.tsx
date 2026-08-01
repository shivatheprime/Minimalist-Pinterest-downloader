import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Sparkles, Zap, Code } from 'lucide-react';

export default function AllTools() {
  const roadmapItems = [
    {
      title: "Instagram Reels Downloader",
      description: "Download high-quality Instagram videos and reels without watermarks.",
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      status: "In Progress"
    },
    {
      title: "TikTok Video Saver",
      description: "Save TikTok videos instantly in MP4 format for offline viewing.",
      icon: <Zap className="w-6 h-6 text-[#D4AF37]" />,
      status: "Planned"
    },
    {
      title: "AI Thumbnail Generator",
      description: "Automatically generate catchy thumbnails using AI for your downloaded videos.",
      icon: <Code className="w-6 h-6 text-[#D4AF37]" />,
      status: "Research"
    }
  ];

  return (
    <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto w-full text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAFAFA] dark:bg-white/5 rounded-full text-sm font-semibold tracking-wide text-[#D4AF37] border border-[#D4AF37]/20 mb-8">
          <Wrench className="w-4 h-4" />
          <span>Product Roadmap</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
          More Tools <br className="hidden md:block"/> 
          <span className="italic font-light text-gray-500">Coming Soon</span>
        </h1>
        
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
          We're constantly working on expanding our suite of creator tools. Here's a sneak peek at what we're building next to help you create and curate better content.
        </p>

        <div className="grid gap-6 md:grid-cols-3 text-left mb-16">
          {roadmapItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="p-6 bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/5 rounded-2xl relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors"
            >
              <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-full">
                  {item.status}
                </span>
              </div>
              <div className="mb-4 p-3 bg-gray-50 dark:bg-white/5 rounded-xl inline-block">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all">
          <span>⭐ Explore Current Tools</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </main>
  );
}
