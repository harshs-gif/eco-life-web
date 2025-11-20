import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Target, Plus, Check, Trash2, Calendar, TrendingUp, Flame, Download } from 'lucide-react';
import type { Goal, Task, Habit } from '../types';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export function Productivity() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [habits, setHabits] = useState<Habit[]>([]);

  const [newTask, setNewTask] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [focusMinutes, setFocusMinutes] = useState(25);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [reflection, setReflection] = useState('');
  const [reflectionLog, setReflectionLog] = useState<string[]>([]);

  const [saving, setSaving] = useState(false);

  const saveState = async (next: { goals: Goal[]; tasks: Task[]; habits: Habit[] }) => {
    if (!user) return;
    setSaving(true);
    try {
      const ref = doc(db, 'productivity', user.uid);
      await setDoc(ref, next, { merge: true });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setGoals([]);
        setTasks([]);
        setHabits([]);
        setLoading(false);
        return;
      }

      try {
        setError(null);
        setLoading(true);
        const ref = doc(db, 'productivity', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data: any = snap.data();
          setGoals((data.goals as Goal[]) || []);
          setTasks((data.tasks as Task[]) || []);
          setHabits(
            ((data.habits as Habit[]) || []).map((h: any) => ({
              ...h,
              completedDates: h.completedDates || [],
            })) as Habit[],
          );
        } else {
          setGoals([]);
          setTasks([]);
          setHabits([]);
        }
      } catch (err: any) {
        setError(err?.message || 'Unable to load productivity data.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  const toggleTask = async (id: string) => {
    const nextTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(nextTasks);
    await saveState({ goals, tasks: nextTasks, habits });
  };

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const task: Task = {
          id: Date.now().toString(),
          title: newTask.trim(),
          completed: false,
          priority: 'medium',
          category: 'General',
        };
        const nextTasks = [...tasks, task];
        setTasks(nextTasks);
        await saveState({ goals, tasks: nextTasks, habits });
        setNewTask('');
      } catch (err: any) {
        setError(err?.message || 'Unable to add task.');
      }
    }
  };

  useEffect(() => {
    let timer: number | undefined;
    if (isFocusRunning && remainingSeconds > 0) {
      timer = window.setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (remainingSeconds === 0 && isFocusRunning) {
      setIsFocusRunning(false);
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [isFocusRunning, remainingSeconds]);

  const startFocus = () => {
    setRemainingSeconds(focusMinutes * 60);
    setIsFocusRunning(true);
  };

  const stopFocus = () => {
    setIsFocusRunning(false);
  };

  const resetFocus = () => {
    setIsFocusRunning(false);
    setRemainingSeconds(focusMinutes * 60);
  };

  const handleAddReflection = () => {
    if (!reflection.trim()) return;
    setReflectionLog((prev) => [reflection.trim(), ...prev].slice(0, 5));
    setReflection('');
  };

  const deleteTask = async (id: string) => {
    const prev = tasks;
    const nextTasks = tasks.filter(task => task.id !== id);
    setTasks(nextTasks);
    try {
      await saveState({ goals, tasks: nextTasks, habits });
    } catch {
      setTasks(prev);
    }
  };

  const addGoal = async () => {
    if (newGoal.trim()) {
      try {
        const goal: Goal = {
          id: Date.now().toString(),
          title: newGoal.trim(),
          progress: 0,
          targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          category: 'Personal',
        };
        const nextGoals = [...goals, goal];
        setGoals(nextGoals);
        await saveState({ goals: nextGoals, tasks, habits });
        setNewGoal('');
      } catch (err: any) {
        setError(err?.message || 'Unable to add goal.');
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      default:
        return '';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg mt-8">
            <h1 className="text-neutral-900 dark:text-white mb-4">Sign in to use productivity tools</h1>
            <p className="text-neutral-600 dark:text-neutral-300">
              Please log in with your email or Google account to save your goals, tasks, and habits to your personal profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        {loading && (
          <div className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">
            Loading your goals and tasks...
          </div>
        )}
        {!loading && saving && (
          <div className="mb-4 text-xs text-neutral-500 dark:text-neutral-400">
            Saving your changes...
          </div>
        )}
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
              <Target className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-neutral-900 dark:text-white mb-4">Productivity Tools</h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Track your goals, manage tasks, and build sustainable habits for long-term success
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Goals Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-neutral-900 dark:text-white flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Goals
                </h2>
                <button
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  aria-label="Download goal planner"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                    placeholder="Add a new goal..."
                    className="flex-1 px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="New goal input"
                  />
                  <motion.button
                    onClick={addGoal}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Add goal"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-neutral-900 dark:text-white mb-1">{goal.title}</h3>
                        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs">
                            {goal.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {goal.targetDate}
                          </span>
                        </div>
                      </div>
                      <span className="text-blue-600 dark:text-blue-400">{goal.progress}%</span>
                    </div>
                    <div className="relative h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Task Manager */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                Task Manager
              </h2>

              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="New task input"
                  />
                  <motion.button
                    onClick={addTask}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Add task"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-2">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-neutral-300 dark:border-neutral-600 hover:border-green-500'
                      }`}
                      aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
                    >
                      {task.completed && <Check className="w-3 h-3 text-white" />}
                    </button>

                    <span className={`flex-1 ${task.completed ? 'line-through text-neutral-400' : 'text-neutral-900 dark:text-white'}`}>
                      {task.title}
                    </span>

                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>

                    <motion.button
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Delete ${task.title}`}
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Habit Tracker Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg sticky top-24">
              <h2 className="text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                Habit Tracker
              </h2>

              <div className="space-y-4">
                {habits.map((habit, index) => (
                  <motion.div
                    key={habit.id}
                    className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-neutral-900 dark:text-white mb-1">{habit.name}</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">{habit.description}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full">
                        <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-orange-600 dark:text-orange-400">{habit.streak}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 mt-3">
                      <TrendingUp className="w-4 h-4" />
                      <span>{habit.streak} day streak</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Add new habit"
              >
                <Plus className="w-5 h-5" />
                Add Habit
              </motion.button>

              {/* Focus Timer */}
              <div className="mt-8 border-t border-neutral-200 dark:border-neutral-700 pt-6">
                <h3 className="text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Focus Session
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  Set a short, distraction-free block to work on one important task.
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <label className="text-sm text-neutral-600 dark:text-neutral-400">Minutes</label>
                  <input
                    type="number"
                    min={5}
                    max={60}
                    value={focusMinutes}
                    onChange={(e) => {
                      const v = Number(e.target.value) || 0;
                      setFocusMinutes(v);
                      setRemainingSeconds(v * 60);
                    }}
                    className="w-20 px-2 py-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm"
                  />
                </div>
                <div className="text-2xl font-mono text-neutral-900 dark:text-white mb-3">
                  {String(Math.floor(remainingSeconds / 60)).padStart(2, '0')}
                  :
                  {String(remainingSeconds % 60).padStart(2, '0')}
                </div>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={startFocus}
                    className="flex-1 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
                  >
                    Start
                  </button>
                  <button
                    onClick={stopFocus}
                    className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-sm text-neutral-900 dark:text-white"
                  >
                    Pause
                  </button>
                  <button
                    onClick={resetFocus}
                    className="px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Weekly Reflection */}
              <div className="mt-6 border-t border-neutral-200 dark:border-neutral-700 pt-6">
                <h3 className="text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  Weekly Reflection
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  Note down what worked well this week and one thing you want to improve.
                </p>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  rows={3}
                  className="w-full mb-2 px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm"
                  placeholder="Example: I finished my top task 3 days in a row. Next week I want to protect my mornings better."
                />
                <button
                  onClick={handleAddReflection}
                  className="w-full px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm mb-3"
                >
                  Save Reflection
                </button>
                {reflectionLog.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto text-sm text-neutral-700 dark:text-neutral-300">
                    {reflectionLog.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
