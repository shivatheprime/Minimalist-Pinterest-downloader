import React from 'react';
import { motion } from 'motion/react';
import { Zap, Infinity, Lock, Check } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Download in under 3 seconds.'
    },
    {
      icon: Infinity,
      title: 'Unlimited Downloads',
      description: 'No limits. Download as much as you want.'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'We don\'t store your data. 100% secure.'
    },
    {
      icon: Check,
      title: 'No Login Required',
      description: 'No sign up. No hassle. Just download.'
    }
  ];

  return (
    <section className="py-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase">Why Choose Us</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-[#FAFAFA] dark:bg-[#111111] border border-gray-100 dark:border-white/5 rounded-3xl p-8 hover:bg-white dark:hover:bg-[#1a1a1a] hover:shadow-xl dark:hover:shadow-none hover:shadow-gray-100/50 transition-all duration-300 group"
          >
             <div className="w-10 h-10 bg-white dark:bg-[#222222] border border-gray-100 dark:border-white/10 rounded-[14px] flex items-center justify-center text-[#D4AF37] mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-5 h-5" strokeWidth={2} />
             </div>
             <div>
                <h3 className="text-[#111111] dark:text-white font-semibold text-lg mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
             </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
