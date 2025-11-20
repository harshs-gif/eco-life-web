import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Leaf, Droplet, Zap, Recycle, ShoppingBag, Home, Check, TrendingUp } from 'lucide-react';

const categories = [
  {
    id: 'energy',
    icon: Zap,
    title: 'Energy Conservation',
    color: 'yellow',
    tips: [
      {
        title: 'Switch to LED Bulbs',
        description: 'LED bulbs use 75% less energy and last 25 times longer than incandescent lighting.',
        difficulty: 'easy',
        impact: 85,
      },
      {
        title: 'Install Smart Thermostats',
        description: 'Optimize heating and cooling automatically, saving up to 23% on energy bills.',
        difficulty: 'medium',
        impact: 90,
      },
      {
        title: 'Use Solar Panels',
        description: 'Generate clean renewable energy for your home, reducing carbon footprint significantly.',
        difficulty: 'hard',
        impact: 95,
      },
    ],
  },
  {
    id: 'water',
    icon: Droplet,
    title: 'Water Conservation',
    color: 'blue',
    tips: [
      {
        title: 'Fix Leaky Faucets',
        description: 'A dripping faucet can waste up to 3,000 gallons of water per year.',
        difficulty: 'easy',
        impact: 70,
      },
      {
        title: 'Install Low-Flow Fixtures',
        description: 'Reduce water usage by up to 60% without compromising water pressure.',
        difficulty: 'medium',
        impact: 80,
      },
      {
        title: 'Collect Rainwater',
        description: 'Harvest rainwater for gardening and outdoor use, reducing municipal water demand.',
        difficulty: 'hard',
        impact: 85,
      },
    ],
  },
  {
    id: 'waste',
    icon: Recycle,
    title: 'Waste Reduction',
    color: 'green',
    tips: [
      {
        title: 'Start Composting',
        description: 'Divert organic waste from landfills and create nutrient-rich soil for gardens.',
        difficulty: 'easy',
        impact: 75,
      },
      {
        title: 'Reduce Single-Use Plastics',
        description: 'Switch to reusable bags, bottles, and containers to minimize plastic waste.',
        difficulty: 'easy',
        impact: 80,
      },
      {
        title: 'Practice Zero Waste Shopping',
        description: 'Buy in bulk, bring your own containers, and choose package-free products.',
        difficulty: 'medium',
        impact: 90,
      },
    ],
  },
  {
    id: 'transport',
    icon: ShoppingBag,
    title: 'Sustainable Transport',
    color: 'purple',
    tips: [
      {
        title: 'Use Public Transportation',
        description: 'Reduce your carbon footprint by 45% compared to driving alone.',
        difficulty: 'easy',
        impact: 85,
      },
      {
        title: 'Bike or Walk for Short Trips',
        description: 'Zero emissions for trips under 3 miles, plus health benefits.',
        difficulty: 'easy',
        impact: 80,
      },
      {
        title: 'Switch to Electric Vehicles',
        description: 'Reduce emissions by up to 50% compared to traditional gas vehicles.',
        difficulty: 'hard',
        impact: 95,
      },
    ],
  },
  {
    id: 'home',
    icon: Home,
    title: 'Eco-Friendly Home',
    color: 'orange',
    tips: [
      {
        title: 'Use Natural Cleaning Products',
        description: 'Avoid harmful chemicals with DIY cleaners using vinegar, baking soda, and lemon.',
        difficulty: 'easy',
        impact: 70,
      },
      {
        title: 'Choose Sustainable Materials',
        description: 'Opt for bamboo, recycled, or sustainably sourced materials for home improvements.',
        difficulty: 'medium',
        impact: 75,
      },
      {
        title: 'Improve Home Insulation',
        description: 'Reduce heating and cooling needs by up to 30% with proper insulation.',
        difficulty: 'hard',
        impact: 88,
      },
    ],
  },
];

export function SustainableLiving() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [completedTips, setCompletedTips] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  const [recommendations, setRecommendations] = useState<Array<{ id: string; title: string; tips: string[] }>>([]);
  const [recError, setRecError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecs = async () => {
      try {
        setRecError(null);
        const res = await fetch('http://localhost:4000/api/recommendations');
        if (!res.ok) {
          throw new Error('Failed to load eco recommendations');
        }
        const data = await res.json();
        setRecommendations(data || []);
      } catch (err: any) {
        setRecError(err?.message || 'Unable to load eco recommendations.');
      }
    };

    loadRecs();
  }, []);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  const toggleTipComplete = (categoryId: string, tipTitle: string) => {
    const key = `${categoryId}-${tipTitle}`;
    setCompletedTips((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      
      // Calculate progress
      const totalTips = categories.reduce((sum, cat) => sum + cat.tips.length, 0);
      const completed = newSet.size;
      setProgress(Math.round((completed / totalTips) * 100));
      
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'hard':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl">
              <Leaf className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-neutral-900 dark:text-white mb-4">Sustainable Living Guide</h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Practical tips and actionable steps to reduce your environmental impact and live more sustainably
          </p>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-neutral-900 dark:text-white mb-1">Your Progress</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {completedTips.size} of {categories.reduce((sum, cat) => sum + cat.tips.length, 0)} tips completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400">{progress}%</span>
            </div>
          </div>
          <div className="relative h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-green-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Smart Eco Recommendations (from backend) */}
        {recommendations.length > 0 && (
          <motion.section
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-neutral-900 dark:text-white text-xl">Smart Eco Recommendations</h2>
              {recError && (
                <span className="text-xs text-red-600 dark:text-red-400">{recError}</span>
              )}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendations.map((rec) => (
                <div key={rec.id} className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-neutral-900 dark:text-white mb-3">{rec.title}</h3>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {rec.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Categories */}
        <div className="space-y-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                aria-expanded={openCategory === category.id}
                aria-controls={`category-${category.id}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-${category.color}-100 dark:bg-${category.color}-900/30 rounded-xl`}>
                    <category.icon className={`w-6 h-6 text-${category.color}-600 dark:text-${category.color}-400`} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-neutral-900 dark:text-white">{category.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {category.tips.length} tips available
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openCategory === category.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-neutral-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openCategory === category.id && (
                  <motion.div
                    id={`category-${category.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="p-6 space-y-4">
                      {category.tips.map((tip, tipIndex) => {
                        const isCompleted = completedTips.has(`${category.id}-${tip.title}`);
                        return (
                          <motion.div
                            key={tipIndex}
                            className={`p-4 rounded-xl border-2 transition-colors ${
                              isCompleted
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900'
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: tipIndex * 0.1 }}
                          >
                            <div className="flex items-start gap-4">
                              <button
                                onClick={() => toggleTipComplete(category.id, tip.title)}
                                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                  isCompleted
                                    ? 'bg-green-500 border-green-500'
                                    : 'border-neutral-300 dark:border-neutral-600 hover:border-green-500'
                                }`}
                                aria-label={`Mark ${tip.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
                              >
                                {isCompleted && <Check className="w-4 h-4 text-white" />}
                              </button>

                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className={`text-neutral-900 dark:text-white ${isCompleted ? 'line-through' : ''}`}>
                                    {tip.title}
                                  </h4>
                                  <span className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor(tip.difficulty)}`}>
                                    {tip.difficulty}
                                  </span>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                                  {tip.description}
                                </p>
                                <div className="flex items-center gap-2">
                                  <span className="text-neutral-600 dark:text-neutral-400">Impact:</span>
                                  <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden max-w-[200px]">
                                    <div
                                      className="h-full bg-gradient-to-r from-green-400 to-green-600"
                                      style={{ width: `${tip.impact}%` }}
                                    />
                                  </div>
                                  <span className="text-green-600 dark:text-green-400">{tip.impact}%</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Impact Summary */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-2xl text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-4">Your Potential Impact</h3>
          <p className="mb-6">
            By implementing these sustainable practices, you can significantly reduce your carbon footprint
            and contribute to a healthier planet for future generations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
              <p className="text-white/80 mb-1">CO₂ Reduction</p>
              <p>-2.5 tons/year</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
              <p className="text-white/80 mb-1">Water Saved</p>
              <p>15,000 gal/year</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
              <p className="text-white/80 mb-1">Waste Diverted</p>
              <p>500 lbs/year</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
              <p className="text-white/80 mb-1">Energy Saved</p>
              <p>$800/year</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
