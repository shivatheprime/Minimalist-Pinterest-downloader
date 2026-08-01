import React from 'react';
import { motion } from 'motion/react';
import { Link, ClipboardPaste, Download } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Link,
      title: 'Copy Link',
      description: 'Copy the Pinterest video, image or GIF link.',
      number: '1'
    },
    {
      icon: ClipboardPaste,
      title: 'Paste Link',
      description: 'Paste the link in the input box above.',
      number: '2'
    },
    {
      icon: Download,
      title: 'Download',
      description: 'Click download and get your file instantly.',
      number: '3'
    }
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase mb-4 block">How It Works</span>
        <h2 className="text-[40px] leading-tight font-semibold tracking-tighter text-[#111111] dark:text-white">Download in 3 Simple Steps</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-[#FAFAFA] dark:bg-[#111111] rounded-3xl p-8 border border-gray-100 dark:border-white/5 flex-1 max-w-sm relative w-full group hover:bg-white dark:hover:bg-[#1a1a1a] hover:shadow-xl dark:hover:shadow-none hover:shadow-gray-100/50 transition-all duration-300"
            >
              <div className="absolute top-8 right-8 text-[10px] font-bold text-gray-300 dark:text-gray-600 uppercase tracking-widest">
                Step {step.number}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#222222] border border-gray-100 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-[#D4AF37] mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-[#111111] dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
            
            {index < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center text-gray-200 dark:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
