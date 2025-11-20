import React from 'react';
import { motion } from 'motion/react';

export function About() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-neutral-900 dark:text-white mb-4">About Our Project</h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            This project envisions a vibrant online community where users can find inspiring sustainable
            living guides and track their progress with interactive tools. The site will offer customizable
            productivity planners that emphasize eco-friendly habits, seamlessly integrating personal growth
            with environmental responsibility. Users will benefit from thoughtful mental health resources,
            including self-assessment quizzes and direct access to counseling or peer support groups. Visually,
            the platform will feature calming animations and a clean, modern design to create a welcoming
            atmosphere. Community engagement will thrive through public and private forums, as well as regular
            eco-challenges and leaderboards to motivate action. The technology behind the site will prioritize
            speed, accessibility, and a reduced carbon footprint, aligning the digital experience with the core
            values promoted.
          </p>
        </motion.div>

        {/* Technology Principles */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
            <h3 className="text-neutral-900 dark:text-white mb-2">Performance & Accessibility</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Fast, inclusive experiences for all users, on any device.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
            <h3 className="text-neutral-900 dark:text-white mb-2">Low-Carbon Web</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Optimized assets and infrastructure to minimize energy use.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
            <h3 className="text-neutral-900 dark:text-white mb-2">Calm UI</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Clean design and gentle motion that supports wellbeing.</p>
          </div>
        </motion.div>

        {/* Status & Contact */}
        <section className="mb-8">
          <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
            <p className="text-neutral-800 dark:text-neutral-200 mb-2">
              This is a new initiative—there are no users yet. We’re actively building core features and will
              open access soon.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              For collaboration or inquiries, contact the project owner at
              {' '}<a href="mailto:harshsoam60@gmail.com" className="text-green-700 dark:text-green-400 underline">harshsoam60@gmail.com</a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
