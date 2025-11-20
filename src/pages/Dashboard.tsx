import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Target, CheckCircle2 } from 'lucide-react';

interface BackendStats {
  contacts: number;
  goals: number;
  tasks: number;
  habits: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<BackendStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        const [contactRes, prodRes] = await Promise.all([
          fetch('http://localhost:4000/api/contact'),
          fetch('http://localhost:4000/api/productivity'),
        ]);

        if (!contactRes.ok || !prodRes.ok) {
          throw new Error('Failed to load dashboard data');
        }

        const contactData = await contactRes.json();
        const prodData = await prodRes.json();

        setStats({
          contacts: contactData.count || 0,
          goals: (prodData.goals || []).length,
          tasks: (prodData.tasks || []).length,
          habits: (prodData.habits || []).length,
        });
      } catch (err: any) {
        setError(err?.message || 'Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-neutral-900 dark:text-white mb-4">Founder Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            High-level overview of how your EcoLife experience is being used locally.
          </p>
        </motion.div>

        {error && (
          <div className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</div>
        )}
        {loading && (
          <div className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">
            Loading dashboard...
          </div>
        )}

        {stats && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">Contact Messages</p>
                <p className="text-neutral-900 dark:text-white text-2xl font-semibold">{stats.contacts}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">Goals & Tasks</p>
                <p className="text-neutral-900 dark:text-white text-2xl font-semibold">
                  {stats.goals} goals · {stats.tasks} tasks
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">Active Habits</p>
                <p className="text-neutral-900 dark:text-white text-2xl font-semibold">{stats.habits}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
