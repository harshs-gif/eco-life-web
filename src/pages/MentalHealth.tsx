import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Brain, Wind, Sunrise, Moon as MoonIcon, Volume2, Play, Pause, CheckCircle, ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function MentalHealth() {
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeResource, setActiveResource] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<null | { title: string; content: string; image?: string }>(null);

  const resources = [
    {
      icon: Brain,
      title: 'Understanding Mental Health',
      description: 'Learn about different aspects of mental wellness and how to maintain emotional balance',
      color: 'purple',
      articles: 12,
    },
    {
      icon: Wind,
      title: 'Breathing Exercises',
      description: 'Guided breathing techniques to reduce stress and anxiety',
      color: 'blue',
      articles: 8,
    },
    {
      icon: Sunrise,
      title: 'Morning Routines',
      description: 'Start your day right with mindful morning practices',
      color: 'yellow',
      articles: 10,
    },
    {
      icon: MoonIcon,
      title: 'Sleep Hygiene',
      description: 'Tips for better sleep quality and restorative rest',
      color: 'indigo',
      articles: 15,
    },
  ];

  const articlesByResource: Record<string, { title: string; content: string; image?: string }[]> = {
    'Understanding Mental Health': [
      {
        title: 'Mental Health Basics: Mood, Stress, and Support',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
        content:
          'Mental health affects how we think, feel, and act. It changes over time based on biology, life events, and habits.\n\n' +
          'Common signs you may need extra care include persistent sadness, irritability, sleep changes, loss of interest, or trouble concentrating. Reaching out early makes recovery easier.\n\n' +
          'Foundations that help most people:\n' +
          '• Regular sleep and meals\n' +
          '• Daily movement and sunlight\n' +
          '• Connection with friends or community\n' +
          '• Short mindfulness breaks to reset.\n\n' +
          'If symptoms interfere with school, work, or relationships for more than two weeks, consider speaking with a licensed professional or your primary care provider.'
      },
      {
        title: 'When to Seek Professional Help',
        content:
          'Therapy is useful even when things are “fine.” Seek help urgently if you have thoughts of harming yourself or others, or can’t perform daily tasks.\n\n' +
          'How to start: write three goals, choose providers covered by your plan, and schedule a 15‑minute consult to check fit.'
      },
      {
        title: 'Building a Personal Support System',
        content:
          'List three people you can text when you need perspective. Share your preferred ways to receive support (listening, advice, distraction).\n\n' +
          'Join one community space—class, club, or volunteer group—to widen your circle over time.'
      },
      {
        title: 'Journaling for Clarity',
        content:
          'Try a 5‑minute daily check‑in: What happened? How did I feel? What do I need now?\n\n' +
          'Short, honest notes reduce rumination and help you spot patterns.'
      }
    ],
    'Breathing Exercises': [
      {
        title: 'Box Breathing (4‑4‑4‑4) Guide',
        content:
          'Sit comfortably. Inhale through the nose for 4, hold 4, exhale 4, hold 4. Repeat 4–6 rounds.\n\n' +
          'This technique balances the nervous system and is helpful before presentations or difficult conversations.'
      },
      {
        title: 'Physiological Sigh for Fast Calm',
        content:
          'Take one deep nasal inhale, then a second short sip to fully expand the lungs, then a long slow exhale through the mouth. Do 3–5 times to quickly reduce tension.'
      },
      {
        title: '4‑7‑8 Breathing for Sleep',
        content:
          'Inhale for 4, hold 7, exhale 8 through pursed lips. Repeat 4 rounds.\n\n' +
          'This lengthens exhalation, signaling safety to your nervous system.'
      },
      {
        title: 'Resonant Breathing (6 breaths/min)',
        content:
          'Breathe in for 5 seconds and out for 5 seconds, 5–10 minutes.\n\n' +
          'Use a timer or app tones; it can lower anxiety and improve HRV.'
      }
    ],
    'Morning Routines': [
      {
        title: 'A 10‑Minute Morning for Clarity',
        content:
          '1) Light: open curtains or step outside for 2 minutes.\n\n' +
          '2) Movement: 20 squats or a short stretch.\n\n' +
          '3) Mind: 3 mindful breaths and write the top 1–3 tasks for the day.'
      },
      {
        title: 'Digital Boundaries Before 10 AM',
        content:
          'Delay social media and news until after your first deep‑work block.\n\n' +
          'Protecting mornings from inputs preserves attention for what matters.'
      },
      {
        title: 'Habit Stacking for Consistency',
        content:
          'Attach a new practice to an existing one: “After brushing teeth, I do 3 breaths.”\n\n' +
          'Small, consistent actions beat occasional big efforts.'
      }
    ],
    'Sleep Hygiene': [
      {
        title: 'Sleep Hygiene Essentials',
        content:
          'Keep a consistent sleep and wake time, limit caffeine after noon, dim lights 90 minutes before bed, and keep the room cool and dark.\n\n' +
          'If you can’t sleep after 20 minutes, get up, read something calm under dim light, and return when sleepy.'
      },
      {
        title: 'Wind‑Down Routine (30 minutes)',
        content:
          'Pick three steps: warm shower, stretch, low‑light reading, herbal tea, or journaling.\n\n' +
          'Make it predictable—your body learns that sleep is coming.'
      },
      {
        title: 'Caffeine and Light Timing',
        content:
          'Stop caffeine 8–10 hours before bed and dim bright overhead lights after sunset.\n\n' +
          'Aim for morning daylight exposure to anchor your body clock.'
      }
    ]
  };

  const quizQuestions = [
    {
      question: 'How often do you feel overwhelmed by daily tasks?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
    },
    {
      question: 'Do you take time for self-care activities?',
      options: ['Daily', 'Few times a week', 'Rarely', 'Never'],
    },
    {
      question: 'How would you rate your sleep quality?',
      options: ['Excellent', 'Good', 'Fair', 'Poor'],
    },
    {
      question: 'Do you have someone to talk to when stressed?',
      options: ['Always', 'Usually', 'Sometimes', 'Rarely'],
    },
  ];

  const meditationSessions = [
    { title: '5-Minute Quick Calm', duration: '5 min', type: 'Breathing' },
    { title: 'Body Scan Meditation', duration: '15 min', type: 'Relaxation' },
    { title: 'Mindful Walking', duration: '10 min', type: 'Movement' },
    { title: 'Evening Wind Down', duration: '20 min', type: 'Sleep' },
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setQuizAnswers([]);
    setShowQuizResult(false);
  };

  const getQuizScore = () => {
    const score = quizAnswers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = quizQuestions.length * 3;
    const percentage = ((maxScore - score) / maxScore) * 100;
    return Math.round(percentage);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
              <Heart className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h1 className="text-neutral-900 dark:text-white mb-4">Mental Health Support</h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Your mental health matters. Explore resources, take self-assessments, and practice mindfulness
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveResource(resource.title)}
                  className="text-left bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`p-3 bg-${resource.color}-100 dark:bg-${resource.color}-900/30 rounded-xl w-fit mb-4`}>
                    <resource.icon className={`w-6 h-6 text-${resource.color}-600 dark:text-${resource.color}-400`} />
                  </div>
                  <h3 className="text-neutral-900 dark:text-white mb-2">{resource.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">{resource.description}</p>
                  <span className="text-purple-600 dark:text-purple-400">
                    {(articlesByResource[resource.title]?.length ?? resource.articles)} articles
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Self-Assessment Quiz */}
            <motion.div
              className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-neutral-900 dark:text-white">Wellness Check-In</h2>
                {showQuizResult && (
                  <button
                    onClick={resetQuiz}
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Retake Quiz
                  </button>
                )}
              </div>

              {!showQuizResult ? (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400 mb-2">
                      <span>Question {currentQuizQuestion + 1} of {quizQuestions.length}</span>
                      <span>{Math.round(((currentQuizQuestion + 1) / quizQuestions.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <h3 className="text-neutral-900 dark:text-white mb-6">
                    {quizQuestions[currentQuizQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className="w-full p-4 text-left bg-neutral-50 dark:bg-neutral-900 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-2 border-neutral-200 dark:border-neutral-700 hover:border-purple-500 rounded-xl transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-neutral-900 dark:text-white">{option}</span>
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-6 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <CheckCircle className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <h3 className="text-neutral-900 dark:text-white mb-4">
                    Your Wellness Score: {getQuizScore()}%
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
                    {getQuizScore() >= 75
                      ? 'Great job! You seem to be managing your mental health well. Keep up the good practices!'
                      : getQuizScore() >= 50
                      ? 'You\'re doing okay, but there\'s room for improvement. Consider trying some of our resources.'
                      : 'It might be helpful to focus more on self-care. Explore our resources and consider talking to someone.'}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Resource Articles List or Featured Article */}
            <motion.div
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {!activeResource && !activeArticle && (
                <div className="relative h-64">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1722094250550-4993fa28a51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwd2VsbG5lc3MlMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NjI5MDg2MjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Person meditating peacefully"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="px-3 py-1 bg-purple-600 rounded-full text-xs mb-3 inline-block">
                      Featured Article
                    </span>
                    <h3 className="mb-2">The Science of Mindfulness</h3>
                    <p className="text-white/80">
                      Discover how mindfulness practices can transform your mental well-being
                    </p>
                  </div>
                </div>
              )}

              {/* Articles list for a selected resource */}
              {activeResource && !activeArticle && (
                <div className="p-6">
                  <button onClick={() => setActiveResource(null)} className="mb-4 inline-flex items-center gap-2 text-purple-600 dark:text-purple-400">
                    <ChevronLeft className="w-4 h-4" /> Back to resources
                  </button>
                  <h3 className="text-neutral-900 dark:text-white mb-4">{activeResource} Articles</h3>
                  <div className="space-y-4">
                    {articlesByResource[activeResource]?.map((a, i) => (
                      <div key={i} className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                        <div>
                          <h4 className="text-neutral-900 dark:text-white">{a.title}</h4>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg" onClick={() => setActiveArticle(a)}>
                          Read
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Article detail */}
              {activeArticle && (
                <article className="bg-white dark:bg-neutral-800">
                  {activeArticle.image && (
                    <ImageWithFallback src={activeArticle.image} alt={activeArticle.title} className="w-full h-64 object-cover" />
                  )}
                  <div className="p-6">
                    <button onClick={() => setActiveArticle(null)} className="mb-4 inline-flex items-center gap-2 text-purple-600 dark:text-purple-400">
                      <ChevronLeft className="w-4 h-4" /> Back to {activeResource}
                    </button>
                    <h3 className="text-neutral-900 dark:text-white mb-4">{activeArticle.title}</h3>
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                      {activeArticle.content.split('\n\n').map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                </article>
              )}
            </motion.div>
          </div>

          {/* Meditation Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg sticky top-24">
              <h2 className="text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                <Volume2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                Meditation Sessions
              </h2>

              <div className="space-y-3 mb-6">
                {meditationSessions.map((session, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-neutral-900 dark:text-white">{session.title}</h4>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
                        aria-label={isPlaying ? 'Pause meditation' : 'Play meditation'}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-xs">
                        {session.type}
                      </span>
                      <span>{session.duration}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
