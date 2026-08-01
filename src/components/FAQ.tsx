import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "Is it free to download Pinterest videos and images?",
    answer: "Yes, our Pinterest downloader is 100% free to use. There are no hidden fees, subscriptions, or limits on how many files you can download."
  },
  {
    question: "Do I need to install any software or extensions?",
    answer: "No installation is required. Our tool works entirely in your web browser, making it safe and easy to use on any device, whether you're on a mobile phone, tablet, or desktop."
  },
  {
    question: "Are the downloaded files high quality?",
    answer: "Yes! We extract the highest quality available from the original Pinterest post, ensuring you get HD videos and full-resolution images without any watermarks."
  },
  {
    question: "Is it legal to download from Pinterest?",
    answer: "You can download content for personal, offline use. However, you should respect copyright laws and not redistribute or use the downloaded content for commercial purposes without the creator's permission."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase block mb-4">FAQ</span>
        <h2 className="text-[40px] leading-tight font-semibold tracking-tighter text-[#111111] dark:text-white">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "border rounded-[24px] overflow-hidden transition-all duration-300",
                isOpen ? "bg-white dark:bg-[#111111] border-[#D4AF37]/30 dark:border-[#D4AF37]/30 shadow-lg shadow-gray-100/50 dark:shadow-none" : "bg-[#FAFAFA] dark:bg-[#0a0a0a] border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10"
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex items-center justify-between w-full p-6 md:p-8 text-left focus:outline-none"
              >
                <span className="text-[#111111] dark:text-white font-semibold tracking-tight text-lg pr-4">{faq.question}</span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 flex-shrink-0",
                  isOpen ? "bg-[#D4AF37]/10" : "bg-white dark:bg-[#222222] border border-gray-100 dark:border-white/10"
                )}>
                  <ChevronDown 
                    className={cn("w-4 h-4 transition-transform duration-300", isOpen ? "rotate-180 text-[#D4AF37]" : "text-gray-400 dark:text-gray-500")} 
                  />
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-gray-500 dark:text-gray-400 leading-relaxed pt-0">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
