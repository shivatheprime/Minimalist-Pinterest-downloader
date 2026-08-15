import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Sparkles, Zap, Code, Calculator, Activity, Flame } from 'lucide-react';

export default function AllTools() {
  const activeTools = [
    {
      title: "Age Calculator",
      description: "Calculate your exact age in years, months, and days.",
      icon: <Calculator className="w-6 h-6 text-[#D4AF37]" />,
      status: "Available",
      path: "/age-calculator"
    },
    {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index based on your height and weight.",
      icon: <Activity className="w-6 h-6 text-[#D4AF37]" />,
      status: "Available",
      path: "/bmi-calculator"
    },
    {
      title: "Calorie Calculator",
      description: "Estimate your daily calorie needs for maintenance, weight loss, or weight gain.",
      icon: <Flame className="w-6 h-6 text-[#D4AF37]" />,
      status: "Available",
      path: "/calorie-calculator"
    }
  ];

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
        className="max-w-4xl mx-auto w-full text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAFAFA] dark:bg-white/5 rounded-full text-sm font-semibold tracking-wide text-[#D4AF37] border border-[#D4AF37]/20 mb-8">
          <Wrench className="w-4 h-4" />
          <span>All Tools</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
          Explore Our <span className="text-[#D4AF37]">Tools</span>
        </h1>
        
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
          We're constantly expanding our suite of tools to help you create, curate, and optimize your life.
        </p>

        <h2 className="text-2xl font-bold text-left mb-8">Fitness & Health</h2>
        <div className="grid gap-6 md:grid-cols-3 text-left mb-16">
          {activeTools.map((item, index) => (
            <motion.div 
              key={`active-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="p-6 bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/5 rounded-2xl relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors flex flex-col"
            >
              <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-400/10 px-2 py-1 rounded-full">
                  {item.status}
                </span>
              </div>
              <div className="mb-4 p-3 bg-gray-50 dark:bg-white/5 rounded-xl inline-block w-fit">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 flex-grow">
                {item.description}
              </p>
              <Link to={item.path} className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] dark:text-white hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors mt-auto">
                Open Tool <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-left mb-8">Product Roadmap <span className="italic font-light text-gray-500 text-lg">Coming Soon</span></h2>
        <div className="grid gap-6 md:grid-cols-3 text-left mb-16">
          {roadmapItems.map((item, index) => (
            <motion.div 
              key={`roadmap-${index}`}
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
              <div className="mb-4 p-3 bg-gray-50 dark:bg-white/5 rounded-xl inline-block w-fit">
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
