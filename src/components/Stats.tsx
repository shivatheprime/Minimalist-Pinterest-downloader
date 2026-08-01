import React from 'react';
import { motion } from 'motion/react';
import { CloudDownload, ShieldCheck, Globe2, Infinity } from 'lucide-react';

export default function Stats() {
  const stats = [
    { icon: CloudDownload, value: '5M+', label: 'Downloads' },
    { icon: ShieldCheck, value: '99.99%', label: 'Success Rate' },
    { icon: Globe2, value: '190+', label: 'Countries' },
    { icon: Infinity, value: 'Unlimited', label: 'Downloads' },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-[#FAFAFA] dark:bg-[#111111] border border-gray-100 dark:border-white/5 p-8 rounded-3xl flex flex-col"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="text-[11px] text-[#D4AF37] uppercase font-bold tracking-widest">{stat.label}</div>
              <stat.icon className="w-5 h-5 text-gray-300 dark:text-gray-600" strokeWidth={2} />
            </div>
            <div className="text-3xl font-bold tracking-tighter text-[#111111] dark:text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
