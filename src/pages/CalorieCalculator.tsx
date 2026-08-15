import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw, Flame, AlertCircle } from 'lucide-react';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

export default function CalorieCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  
  // Metric inputs
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  
  // Imperial inputs
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weightLbs, setWeightLbs] = useState('');

  const [activityLevel, setActivityLevel] = useState('1.2');

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    document.title = 'Calorie Calculator - Estimate Daily Calorie Needs | Pinvault';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Use our free calorie calculator to estimate daily calorie needs based on age, sex, height, weight, and activity level.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Use our free calorie calculator to estimate daily calorie needs based on age, sex, height, weight, and activity level.';
      document.head.appendChild(meta);
    }
  }, []);

  const calculateCalories = () => {
    setError('');
    setWarning('');
    setResult(null);

    const a = parseInt(age);
    if (!a || a < 18 || a > 100) {
      setError('Please enter a valid age between 18 and 100.');
      return;
    }

    let hCm = 0;
    let wKg = 0;

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
      hCm = h;
      wKg = w;
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
      
      hCm = totalInches * 2.54;
      wKg = w * 0.453592;
    }

    // Mifflin-St Jeor equation
    let bmr = (10 * wKg) + (6.25 * hCm) - (5 * a);
    if (sex === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * parseFloat(activityLevel);
    const weightLoss = tdee - 500;
    const weightGain = tdee + 500;

    if ((sex === 'female' && weightLoss < 1200) || (sex === 'male' && weightLoss < 1500)) {
      setWarning('Your estimated calorie target for weight loss may be too low for general use. Please consult a qualified healthcare professional or registered dietitian for personalized guidance.');
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss: Math.round(Math.max(weightLoss, sex === 'male' ? 1500 : 1200)), // Apply a safe floor
      weightGain: Math.round(weightGain)
    });
  };

  const handleReset = () => {
    setAge('');
    setHeightCm('');
    setWeightKg('');
    setHeightFeet('');
    setHeightInches('');
    setWeightLbs('');
    setActivityLevel('1.2');
    setResult(null);
    setError('');
    setWarning('');
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
            <Flame className="w-4 h-4" />
            <span>Calorie Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-[#111111] dark:text-white">
            Estimate daily calorie needs.
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Estimate your daily calorie needs based on your age, sex, height, weight, and activity level.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-[#111111] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none border border-gray-100 dark:border-white/10"
          >
            <div className="flex bg-gray-50 dark:bg-white/5 p-1 rounded-xl mb-6">
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
            
            <div className="flex bg-gray-50 dark:bg-white/5 p-1 rounded-xl mb-8">
              <button
                onClick={() => { setSex('male'); setResult(null); setError(''); }}
                className={cn(
                  "flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-lg transition-all",
                  sex === 'male' ? "bg-white dark:bg-[#222222] text-[#111111] dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Male
              </button>
              <button
                onClick={() => { setSex('female'); setResult(null); setError(''); }}
                className={cn(
                  "flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-lg transition-all",
                  sex === 'female' ? "bg-white dark:bg-[#222222] text-[#111111] dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Female
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="age" className="block text-sm font-semibold text-[#111111] dark:text-white uppercase tracking-wider mb-2">
                  Age (18-100)
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 30"
                  className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                />
              </div>

              {unit === 'metric' ? (
                <div className="flex gap-4">
                  <div className="flex-1">
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
                  <div className="flex-1">
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
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className="flex-1">
                      <label htmlFor="heightFeet" className="block text-sm font-semibold text-[#111111] dark:text-white uppercase tracking-wider mb-2">
                        Height (Ft)
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
                  <div className="flex-1">
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
                </div>
              )}

              <div>
                <label htmlFor="activityLevel" className="block text-sm font-semibold text-[#111111] dark:text-white uppercase tracking-wider mb-2">
                  Activity Level
                </label>
                <select
                  id="activityLevel"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all appearance-none"
                >
                  <option value="1.2">Sedentary (Little or no exercise)</option>
                  <option value="1.375">Lightly Active (Exercise 1-3 days/week)</option>
                  <option value="1.55">Moderately Active (Exercise 3-5 days/week)</option>
                  <option value="1.725">Very Active (Exercise 6-7 days/week)</option>
                  <option value="1.9">Extra Active (Very hard exercise/physical job)</option>
                </select>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <Button
                  onClick={calculateCalories}
                  className="flex-1 h-14 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-xl font-bold uppercase tracking-widest hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white transition-all"
                >
                  Calculate Calories
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
                    
                    <div className="bg-[#111111] dark:bg-white text-white dark:text-[#111111] p-8 rounded-2xl text-center mb-6">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Estimated Maintenance Calories</h3>
                      <div className="text-4xl sm:text-5xl font-bold mb-2">{result.tdee.toLocaleString()}</div>
                      <div className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-500">Calories / Day</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl text-center">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Weight Loss</h4>
                        <div className="text-2xl font-bold text-[#111111] dark:text-white mb-1">{result.weightLoss.toLocaleString()}</div>
                        <div className="text-[10px] uppercase text-gray-400">Calories / Day</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl text-center">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Weight Gain</h4>
                        <div className="text-2xl font-bold text-[#111111] dark:text-white mb-1">{result.weightGain.toLocaleString()}</div>
                        <div className="text-[10px] uppercase text-gray-400">Calories / Day</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl flex justify-between items-center text-sm mb-6">
                      <span className="font-semibold text-gray-500 dark:text-gray-400">Basal Metabolic Rate (BMR)</span>
                      <span className="font-bold text-[#111111] dark:text-white">{result.bmr.toLocaleString()} kcal</span>
                    </div>

                    {warning && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-4 rounded-xl text-sm text-yellow-800 dark:text-yellow-200/80 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p><strong>Warning:</strong> {warning}</p>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-400 text-center">
                      These are general estimates, not medical or personalized nutrition advice.
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
            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mb-6">What Are Daily Calorie Needs?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Daily calorie needs refer to the total amount of energy (in calories) your body requires each day to maintain its current weight. This is known as your Total Daily Energy Expenditure (TDEE). If you consume fewer calories than your TDEE, you will likely lose weight. If you consume more, you will likely gain weight.
            </p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mb-6">How Is BMR Calculated?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Basal Metabolic Rate (BMR) is the number of calories your body burns at rest just to keep vital functions running (like breathing and pumping blood). We use the widely accepted <strong>Mifflin-St Jeor equation</strong> to estimate your BMR, which is considered one of the most accurate estimation formulas available without clinical testing.
            </p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mb-6">What Is TDEE?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Your Total Daily Energy Expenditure (TDEE) is calculated by multiplying your BMR by an activity multiplier. This accounts for the energy you burn through daily movements, exercise, and digesting food. This is the "Maintenance Calories" value shown in the results.
            </p>

            <h2 className="text-2xl font-bold text-[#111111] dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6 mb-12">
              <div>
                <h3 className="text-lg font-bold text-[#111111] dark:text-white mb-2">Is a 500-calorie deficit safe?</h3>
                <p className="text-gray-600 dark:text-gray-300">A 500-calorie deficit is generally considered safe and sustainable for most healthy adults, typically leading to about 1 pound of weight loss per week. However, calorie targets should generally not drop below 1,200 for women or 1,500 for men without medical supervision.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111111] dark:text-white mb-2">How accurate is this calculator?</h3>
                <p className="text-gray-600 dark:text-gray-300">This calculator provides a solid estimate based on population averages. However, individual metabolisms vary based on genetics, muscle mass, hormonal factors, and medical conditions.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-100 dark:border-white/10">
              <Link to="/bmi-calculator" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#D4AF37] transition-colors">
                Explore BMI Calculator <ArrowRight className="w-4 h-4" />
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
