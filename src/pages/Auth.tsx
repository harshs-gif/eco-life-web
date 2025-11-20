import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

interface AuthProps {
  onNavigate: (page: string) => void;
}

export function Auth({ onNavigate }: AuthProps) {
  const { signup, login, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      onNavigate('home');
    } catch (err: any) {
      setError(err?.message ?? 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      onNavigate('home');
    } catch (err: any) {
      setError(err?.message ?? 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-md mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg">
          <h1 className="text-neutral-900 dark:text-white mb-6">{mode === 'login' ? 'Login' : 'Create account'}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-300">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-neutral-600 dark:text-neutral-300">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700" />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <motion.button type="submit" disabled={loading} className="w-full px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Register'}
            </motion.button>
          </form>
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
              <span>or</span>
              <span className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
            </div>
            <motion.button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-60 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm">Continue with Google</span>
            </motion.button>
          </div>
          <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
            {mode === 'login' ? (
              <button onClick={() => setMode('register')} className="text-green-600 dark:text-green-400 hover:underline">Create a new account</button>
            ) : (
              <button onClick={() => setMode('login')} className="text-green-600 dark:text-green-400 hover:underline">I already have an account</button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
