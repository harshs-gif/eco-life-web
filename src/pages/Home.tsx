import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Heart, Target, TrendingUp, Shield } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: Leaf,
      title: 'Sustainable Living',
      description: 'Practical tips and guides for eco-friendly lifestyle choices',
      color: 'green',
      page: 'sustainable',
    },
    {
      icon: Target,
      title: 'Productivity Tools',
      description: 'Goal tracking, habit building, and task management',
      color: 'blue',
      page: 'productivity',
    },
    {
      icon: Heart,
      title: 'Mental Wellness',
      description: 'Resources for mental health support and mindfulness',
      color: 'purple',
      page: 'mental-health',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-20 md:pb-32 overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-green-200 dark:bg-green-900/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300">
                  Certified Sustainable Platform
                </span>
              </motion.div>

              <h1 className="text-neutral-900 dark:text-white mb-6">
                Live Better, <span className="text-green-600 dark:text-green-400">Sustainably</span>
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300 mb-8">
                Discover inspiring sustainable living guides, interactive planners that build eco-friendly
                habits, and thoughtful mental wellness resources—all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={() => onNavigate('sustainable')}
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Get started with sustainable living"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => onNavigate('about')}
                  className="px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-green-500 dark:hover:border-green-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Learn more about EcoLife"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1689606646730-312a90287c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBzdXN0YWluYWJpbGl0eSUyMGdyZWVuJTIwZWFydGh8ZW58MXx8fHwxNzYzMDE3MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Sustainable nature landscape with green earth"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating stats card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-neutral-600 dark:text-neutral-400">Impact This Month</p>
                    <p className="text-neutral-900 dark:text-white">+32% Growth</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section removed: project is brand new and has no user metrics yet */}

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-neutral-900 dark:text-white mb-4">
              Everything You Need for a Better Life
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Comprehensive tools and resources to support your journey towards sustainability,
              productivity, and wellness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => onNavigate(feature.page)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-4 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-xl group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-neutral-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {feature.description}
                    </p>
                    <button
                      className="text-green-600 dark:text-green-400 flex items-center gap-2 group-hover:gap-3 transition-all"
                      aria-label={`Explore ${feature.title}`}
                    >
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-white/90 mb-8">
              Start your journey with sustainable guides, eco-focused planners, and wellness resources.
            </p>
            <motion.button
              onClick={() => onNavigate('sustainable')}
              className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-neutral-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Get started with sustainable guides"
            >
              Start Planning
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
