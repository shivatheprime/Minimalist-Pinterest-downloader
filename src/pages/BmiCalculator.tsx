import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw, Activity, AlertCircle } from 'lucide-react';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

export default function BmiCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Metric inputs
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  
  // Imperial inputs
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weightLbs, setWeightLbs] = useState('');

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'BMI Calculator - Calculate Your Body Mass Index | Pinvault';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Use our free BMI calculator to calculate your Body Mass Index from your height and weight and understand the general BMI categories.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Use our free BMI calculator to calculate your Body Mass Index from your height and weight and understand the general BMI categories.';
      document.head.appendChild(meta);
    }
  }, []);

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { label: 'Normal weight', color: 'text-green-500' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500' };
    return { label: 'Obesity', color: 'text-red-500' };
  };

  const calculateBmi = () => {
    setError('');
    setResult(null);

    let bmi = 0;
    let heightText = '';
    let weightText = '';

    if (unit === 'metric') {
      const h = parseFloat(heightCm);
      const w = parseFloat(weightKg);

      if (!h || !w || h <= 0 || w <= 0) {
        setError('Please enter valid positive numbers for height and weight.');
        return;
      }
      
      if (h > 300 || h < 50) {
        setError('Please enter a realistic human height.');
        return;
      }
      
      if (w > 500 || w < 2) {
        setError('Please enter a realistic human weight.');
        return;
      }

      const heightM = h / 100;
      bmi = w / (heightM * heightM);
      heightText = `${h} cm`;
      weightText = `${w} kg`;
    } else {
      const ft = parseFloat(heightFeet);
      const inc = parseFloat(heightInches) || 0;
      const w = parseFloat(weightLbs);

      if (!ft || ft <= 0 || !w || w <= 0) {
        setError('Please enter valid positive numbers for height and weight.');
        return;
      }
      
      if (inc < 0 || inc >= 12) {
        setError('Inches must be between 0 and 11.');
        return;
      }

      const totalInches = (ft * 12) + inc;
      
      if (totalInches > 120 || totalInches < 20) {
        setError('Please enter a realistic human height.');
        return;
      }
      
      if (w > 1100 || w < 5) {
        setError('Please enter a realistic human weight.');
        return;
      }

      bmi = 703 * w / (totalInches * totalInches);
      heightText = `${ft}'${inc}"`;
      weightText = `${w} lbs`;
    }

    const category = getBmiCategory(bmi);

    setResult({
      bmi: bmi.toFixed(1),
      category,
      heightText,
      weightText
    });
  };

  const handleReset = () => {
    setHeightCm('');
    setWeightKg('');
    setHeightFeet('');
    setHeightInches('');
    setWeightLbs('');
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
            <Activity className="w-4 h-4" />
            <span>BMI Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-[#111111] dark:text-white">
            Calculate your Body Mass Index.
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Calculate your Body Mass Index using your height and weight.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-[#111111] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none border border-gray-100 dark:border-white/10"
          >
            <div className="flex bg-gray-50 dark:bg-white/5 p-1 rounded-xl mb-8">
              <button
                onClick={() => { setUnit('metric'); setResult(null); setError(''); }}
                className={cn(
                  "flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-lg transition-all",
                  unit === 'metric' ? "bg-white dark:bg-[#222222] text-[#111111] dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Metric
              </button>
              <button
                onClick={() => { setUnit('imperial'); setResult(null); setError(''); }}
                className={cn(
                  "flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-lg transition-all",
                  unit === 'imperial' ? "bg-white dark:bg-[#222222] text-[#111111] dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Imperial
              </button>
            </div>

            <div className="space-y-6">
              {unit === 'metric' ? (
                <>
                  <div>
                    <label htmlFor="heightCm" className="block text-sm font-semibold text-[#111111] dark:text-white uppercase tracking-wider mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      id="heightCm"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="e.g. 175"
                      className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="weightKg" className="block text-sm font-semibold text-[#111111] dark:text-white uppercase tracking-wider mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      id="weightKg"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="e.g. 70"
                      className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label htmlFor="heightFeet" className="block text-sm font-semibold text-[#111111] dark:text-white uppercase tracking-wider mb-2">
                        Height (Feet)
                      </label>
                      <input
                        type="number"
                        id="heightFeet"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="heightInches" className="block text-sm font-semibold text-[#111111] dark:text-white uppercase tracking-wider mb-2">
                        Inches
                      </label>
                      <input
                        type="number"
                        id="heightInches"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        placeholder="e.g. 9"
                        className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="weightLbs" className="block text-sm font-semibold text-[#111111] dark:text-white uppercase tracking-wider mb-2">
                      Weight (lbs)
                    </label>
                    <input
                      type="number"
                      id="weightLbs"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(e.target.value)}
                      placeholder="e.g. 150"
                      className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>
                </>
              )}

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <Button
                  onClick={calculateBmi}
                  className="flex-1 h-14 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-xl font-bold uppercase tracking-widest hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white transition-all"
                >
                  Calculate BMI
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
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">Your BMI Result</h3>
                    
                    <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-2xl text-center mb-6">
                      <div className="text-5xl font-bold text-[#111111] dark:text-white mb-2">{result.bmi}</div>
                      <div className={cn("text-xl font-bold tracking-tight", result.category.color)}>
                        {result.category.label}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl overflow-hidden text-sm mb-6">
                      <div className="flex justify-between items-center p-4 border-b border-white dark:border-white/5">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Height</span>
                        <span className="font-bold text-[#111111] dark:text-white">{result.heightText}</span>
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Weight</span>
                        <span className="font-bold text-[#111111] dark:text-white">{result.weightText}</span>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-4 rounded-xl text-sm text-yellow-800 dark:text-yellow-200/80">
                      <strong>Disclaimer:</strong> BMI is a screening measure and is not a medical diagnosis. Results should not be considered medical advice.
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
            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mb-6">What Is BMI?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Body Mass Index (BMI) is a person's weight in kilograms divided by the square of height in meters. It is an inexpensive and easy screening method for weight category—underweight, healthy weight, overweight, and obesity.
            </p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mb-6">How Is BMI Calculated?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Metric formula:</strong> BMI = weight (kg) / (height (m) × height (m))
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              <strong>Imperial formula:</strong> BMI = 703 × weight (lbs) / (height (in) × height (in))
            </p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mb-6">BMI Categories</h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-8 space-y-2">
              <li><strong>Underweight:</strong> BMI less than 18.5</li>
              <li><strong>Normal weight:</strong> BMI 18.5 to 24.9</li>
              <li><strong>Overweight:</strong> BMI 25 to 29.9</li>
              <li><strong>Obesity:</strong> BMI 30 or higher</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6 mb-12">
              <div>
                <h3 className="text-lg font-bold text-[#111111] dark:text-white mb-2">Is BMI accurate for everyone?</h3>
                <p className="text-gray-600 dark:text-gray-300">BMI does not measure body fat directly. It may overestimate body fat in athletes and others who have a muscular build. It may underestimate body fat in older persons and others who have lost muscle.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111111] dark:text-white mb-2">Is this calculator for children?</h3>
                <p className="text-gray-600 dark:text-gray-300">No, this calculator uses the adult BMI categories. BMI for children and teens is calculated differently and requires comparing the results to age- and sex-specific percentiles.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-100 dark:border-white/10">
              <Link to="/calorie-calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#D4AF37] transition-colors">
                Explore Calorie Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/age-calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#D4AF37] transition-colors">
                Explore Age Calculator <ArrowRight className="w-4 h-4" />
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
