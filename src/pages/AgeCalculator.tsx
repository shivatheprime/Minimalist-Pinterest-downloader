import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw, Calendar } from 'lucide-react';
import { Button } from '@/components/Button';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Age Calculator - Calculate Your Exact Age | Pinvault';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Use our free age calculator to calculate your age in years, months, days, weeks, and total days from your date of birth.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Use our free age calculator to calculate your age in years, months, days, weeks, and total days from your date of birth.';
      document.head.appendChild(meta);
    }
  }, []);

  const calculateAge = () => {
    setError('');
    setResult(null);

    if (!dob) {
      setError('Please select your date of birth.');
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      setError('Invalid date.');
      return;
    }

    if (birthDate > today) {
      setError('Date of birth cannot be in the future.');
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      // Get the number of days in the previous month
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate totals
    const timeDiff = today.getTime() - birthDate.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (years * 12) + months;

    setResult({
      years,
      months,
      days,
      totalYears: years,
      totalMonths,
      totalWeeks,
      totalDays
    });
  };

  const handleReset = () => {
    setDob('');
    setResult(null);
    setError('');
  };

  return (
    <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAFAFA] dark:bg-white/5 rounded-full text-sm font-semibold tracking-wide text-[#D4AF37] border border-[#D4AF37]/20 mb-6">
            <Calendar className="w-4 h-4" />
            <span>Age Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-[#111111] dark:text-white">
            Calculate your exact age.
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Calculate your exact age in years, months, and days from your date of birth.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-[#111111] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none border border-gray-100 dark:border-white/10"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="dob" className="block text-sm font-semibold text-[#111111] dark:text-white uppercase tracking-wider mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm font-medium">
                  {error}
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <Button
                  onClick={calculateAge}
                  className="flex-1 h-14 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-xl font-bold uppercase tracking-widest hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white transition-all"
                >
                  Calculate Age
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-14 px-6 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all"
                  aria-label="Reset form"
                >
                  <RotateCcw className="w-5 h-5 text-[#111111] dark:text-white" />
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-8 mt-8 border-t border-gray-100 dark:border-white/10">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">Your Exact Age</h3>
                    
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white mb-1">{result.years}</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Years</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white mb-1">{result.months}</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Months</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl text-center">
                        <div className="text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white mb-1">{result.days}</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Days</div>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Total Time Alive</h3>
                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl overflow-hidden text-sm">
                      <div className="flex justify-between items-center p-4 border-b border-white dark:border-white/5">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Total Years</span>
                        <span className="font-bold text-[#111111] dark:text-white">{result.totalYears}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 border-b border-white dark:border-white/5">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Total Months</span>
                        <span className="font-bold text-[#111111] dark:text-white">{result.totalMonths.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 border-b border-white dark:border-white/5">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Total Weeks</span>
                        <span className="font-bold text-[#111111] dark:text-white">{result.totalWeeks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Total Days</span>
                        <span className="font-bold text-[#111111] dark:text-white">{result.totalDays.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-[#D4AF37]"
        >
          <div className="bg-white dark:bg-[#111111] rounded-3xl p-8 sm:p-12 border border-gray-100 dark:border-white/10">
            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mb-6">How Does the Age Calculator Work?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Our age calculator determines your exact age by comparing your date of birth with today's date. It calculates the precise number of years, months, and days you have been alive. This method accounts for variations in month lengths and leap years, providing a highly accurate result that simple year-subtraction cannot achieve.
            </p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mb-6">How Accurate Is the Age Calculator?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The calculator is completely accurate based on standard calendar calculations. It correctly handles special cases like leap years and February 29th birthdays. When calculating the difference between two dates, it factors in the exact number of days in each specific month passed, ensuring your "months and days" result is perfectly precise.
            </p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6 mb-12">
              <div>
                <h3 className="text-lg font-bold text-[#111111] dark:text-white mb-2">Can I calculate an age in the future?</h3>
                <p className="text-gray-600 dark:text-gray-300">Currently, this tool is designed to calculate your age up to today's date. Selecting a future date will result in an error message.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111111] dark:text-white mb-2">How are leap years handled?</h3>
                <p className="text-gray-600 dark:text-gray-300">The calculator uses the built-in calendar logic of modern web browsers, which naturally accounts for leap years. If you were born on February 29th, your age will be calculated correctly every year.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-100 dark:border-white/10">
              <Link to="/bmi-calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#D4AF37] transition-colors">
                Explore BMI Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/calorie-calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#D4AF37] transition-colors">
                Explore Calorie Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/all-tools" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#D4AF37] transition-colors">
                Back to All Tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
