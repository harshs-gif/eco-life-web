const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Basic request logging for visibility in development
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  });
  next();
});

// ------------------
// In-memory "database"
// ------------------

let contactMessages = [];

let productivityState = {
  goals: [
    {
      id: '1',
      title: 'Reduce plastic usage by 50%',
      progress: 65,
      targetDate: '2025-12-31',
      category: 'Sustainability',
    },
    {
      id: '2',
      title: 'Meditate daily for 30 days',
      progress: 23,
      targetDate: '2025-12-15',
      category: 'Wellness',
    },
  ],
  tasks: [
    { id: '1', title: 'Buy reusable shopping bags', completed: false, priority: 'high', category: 'Shopping' },
    { id: '2', title: 'Research solar panel options', completed: false, priority: 'medium', category: 'Home' },
    { id: '3', title: 'Start composting bin', completed: true, priority: 'high', category: 'Waste' },
  ],
  habits: [
    { id: '1', name: 'Morning Meditation', description: '10 minutes daily', streak: 7 },
    { id: '2', name: 'Zero Waste Shopping', description: 'Use reusable bags', streak: 14 },
    { id: '3', name: 'Bike to Work', description: 'Reduce carbon footprint', streak: 5 },
  ],
};

const blogPosts = [
  {
    id: '1',
    title: '10 Simple Steps to Reduce Your Carbon Footprint Today',
    excerpt:
      'Discover practical, actionable ways to minimize your environmental impact without major lifestyle changes.',
    category: 'Sustainability',
    author: 'Emma Green',
    date: '2025-11-10',
    imageUrl:
      'https://images.unsplash.com/photo-1689606646730-312a90287c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '5 min',
    content:
      'Cutting your carbon footprint does not require perfection. The most meaningful progress usually comes from a handful of everyday choices that you repeat over time. In this guide we focus on practical changes that real people actually stick with.\n\n' +
      '1) Choose low‑emission transport. For short trips under 2 km, walking or cycling is often just as fast as driving once you include parking. For longer commutes, try public transport a couple of days per week or set up a carpool with colleagues.\n\n' +
      '2) Shift a few meals each week to plant‑forward options. Studies from universities in the US and Europe consistently show that replacing red meat with beans, lentils or tofu even two or three times per week can noticeably lower your personal emissions while often saving money.\n\n' +
      '3) Power down your home. Swap old bulbs for LEDs, unplug idle chargers, and enable energy‑saving modes on laptops and TVs. Small actions like using a power strip for electronics can cut dozens of kilowatt‑hours over a year.\n\n' +
      '4) Optimize heating and cooling. Sealing window and door drafts, closing curtains on hot days, and adjusting your thermostat by just 1–2°C can reduce both bills and emissions. Many city climate programs run free home‑energy checkups—check your local council website.\n\n' +
      '5) Buy once, buy well. Before buying something new, ask: can I borrow, repair or buy second‑hand instead? Choosing durable items (like a sturdy reusable bottle or long‑lasting jacket) reduces waste and clutter.\n\n' +
      'None of these steps alone will “solve” climate change, but together they move your lifestyle in a lower‑carbon direction while often improving health and finances. Pick one or two changes to start this week and track how they feel over a month.',
  },
  {
    id: '2',
    title: 'The Power of Morning Meditation: A 30-Day Experiment',
    excerpt: 'How establishing a daily meditation practice transformed my mental health and productivity.',
    category: 'Wellness',
    author: 'Michael Chen',
    date: '2025-11-08',
    imageUrl:
      'https://images.unsplash.com/photo-1722094250550-4993fa28a51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '7 min',
    content:
      'For 30 days I sat for ten minutes each morning before touching my phone or opening my laptop. The experiment was simple: could a tiny meditation habit change how the rest of the day felt?\n\n' +
      'Week 1 was mostly restlessness. My mind replayed yesterday’s conversations and tomorrow’s to‑do list. I used a basic technique taught in many mindfulness courses: noticing the breath at the nostrils and gently returning attention whenever I got distracted. The goal was not “empty mind” but simply practicing coming back.\n\n' +
      'By Week 2 my mood felt more even. Research from clinics and universities shows that short, regular mindfulness sessions can reduce perceived stress and improve emotional regulation. I noticed that small frustrations—slow traffic, an awkward email—no longer hijacked my entire morning.\n\n' +
      'Week 3 brought clearer priorities. Because I meditated before opening messages, I was already calmer when planning the day. I picked one or two important tasks and protected them with focused time blocks. I also found it easier to say “no” to low‑value requests.\n\n' +
      'By Week 4 the habit felt natural, like brushing my teeth. The biggest change was not that life became stress‑free, but that recovery from stressful moments was faster. A few slow breaths during the day reminded my body of the calm state I had practiced in the morning.\n\n' +
      'If you want to try something similar, start tiny: sit comfortably, set a 5–10 minute timer, and focus on your breath or sounds. When your mind wanders (it will), notice it kindly and return. Track your streak on paper or in an app—real people keep habits when they stay simple and rewarding.',
  },
  {
    id: '3',
    title: 'Productivity Hacks from Sustainable Living Practices',
    excerpt: 'Learn how minimalism and intentional living can boost your efficiency and focus.',
    category: 'Productivity',
    author: 'Sarah Williams',
    date: '2025-11-05',
    imageUrl:
      'https://images.unsplash.com/photo-1699570044128-b61ef113b72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '6 min',
    content:
      'Sustainable living and personal productivity share a surprising rule: fewer, better inputs lead to clearer outcomes. Many people who simplify their homes also report sharper focus at work or school. Here are a few ideas you can borrow from eco‑friendly living to organize your day.\n\n' +
      '1) Declutter to decide faster. Just as a minimal wardrobe makes it easier to pick an outfit, a “minimal desk” reduces decision fatigue. Keep only the tools you use daily within arm’s reach; archive the rest. Researchers studying attention show that visual clutter competes for brain resources.\n\n' +
      '2) Batch similar tasks the way you might batch errands. Instead of checking email every few minutes, process messages in 2–3 focused blocks. Grouping tasks that use the same mental mode—writing, calls, design—cuts the “switching cost” that drains energy.\n\n' +
      '3) Design for reuse. In a low‑waste kitchen you might keep glass jars and containers ready for many purposes. In productivity terms, this means reusable templates: checklists for publishing a post, packing for travel, or preparing a presentation. Each template you create once can save dozens of minutes every time you repeat that type of work.\n\n' +
      '4) Close the loop weekly. Sustainability advocates talk about auditing waste; you can do a similar review for time and attention. Once a week, look back at your calendar and ask: what gave me energy, what drained it, and what can I change next week? This small ritual keeps your system honest and aligned with what actually matters.\n\n' +
      'You do not need a perfectly optimized life or a perfectly zero‑waste home. Treat both sustainability and productivity as ongoing experiments: try a small tweak, observe the results, and keep the changes that make your days feel lighter and more meaningful.',
  },
];

const ecoRecommendations = [
  {
    id: 'transport',
    title: 'Greener Transport Swaps',
    tips: [
      'Walk or bike short distances under 2 km whenever possible.',
      'Bundle errands into a single trip to reduce emissions.',
      'Try public transport twice a week instead of driving alone.',
    ],
  },
  {
    id: 'home',
    title: 'Low-Energy Home Tweaks',
    tips: [
      'Switch to LED bulbs and power strips for idle electronics.',
      'Seal window and door drafts to reduce heating and cooling loss.',
      'Wash clothes in cold water and line-dry when you can.',
    ],
  },
  {
    id: 'habits',
    title: 'Micro-Habits That Compound',
    tips: [
      'Carry a reusable bottle and bag every day.',
      'Do a 5-minute nightly audit of waste and energy use.',
      'Schedule one weekly “eco action” like a cleanup or repair.',
    ],
  },
];

// ------------------
// Core routes
// ------------------

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Eco Life backend is running' });
});

// Contact form: submit a message
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const id = Date.now().toString();
  const createdAt = new Date().toISOString();

  const entry = { id, name, email, subject: subject || '', message, createdAt };
  contactMessages.push(entry);

  res.status(201).json({ success: true, message: 'Message received. Thank you for reaching out!', entry });
});

// Contact messages list (for future dashboard/admin)
app.get('/api/contact', (req, res) => {
  res.json({ count: contactMessages.length, items: contactMessages });
});

// ------------------
// Productivity APIs
// ------------------

// Get full productivity snapshot
app.get('/api/productivity', (req, res) => {
  res.json(productivityState);
});

// Add a new goal
app.post('/api/productivity/goals', (req, res) => {
  const { title, targetDate, category } = req.body || {};
  if (!title) {
    return res.status(400).json({ error: 'Goal title is required.' });
  }

  const goal = {
    id: Date.now().toString(),
    title,
    progress: 0,
    targetDate: targetDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: category || 'Personal',
  };

  productivityState.goals.push(goal);
  res.status(201).json(goal);
});

// Update goal progress
app.patch('/api/productivity/goals/:id', (req, res) => {
  const { id } = req.params;
  const { progress } = req.body || {};

  const goal = productivityState.goals.find((g) => g.id === id);
  if (!goal) {
    return res.status(404).json({ error: 'Goal not found.' });
  }

  if (typeof progress === 'number') {
    goal.progress = Math.min(100, Math.max(0, progress));
  }

  res.json(goal);
});

// Add a new task
app.post('/api/productivity/tasks', (req, res) => {
  const { title, priority, category } = req.body || {};
  if (!title) {
    return res.status(400).json({ error: 'Task title is required.' });
  }

  const task = {
    id: Date.now().toString(),
    title,
    completed: false,
    priority: priority || 'medium',
    category: category || 'General',
  };

  productivityState.tasks.push(task);
  res.status(201).json(task);
});

// Toggle task completion
app.patch('/api/productivity/tasks/:id/toggle', (req, res) => {
  const { id } = req.params;
  const task = productivityState.tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found.' });
  }
  task.completed = !task.completed;
  res.json(task);
});

// Delete a task
app.delete('/api/productivity/tasks/:id', (req, res) => {
  const { id } = req.params;
  const before = productivityState.tasks.length;
  productivityState.tasks = productivityState.tasks.filter((t) => t.id !== id);
  const deleted = productivityState.tasks.length < before;
  if (!deleted) {
    return res.status(404).json({ error: 'Task not found.' });
  }
  res.json({ success: true });
});

// Simple habit streak bump
app.post('/api/productivity/habits/:id/tick', (req, res) => {
  const { id } = req.params;
  const habit = productivityState.habits.find((h) => h.id === id);
  if (!habit) {
    return res.status(404).json({ error: 'Habit not found.' });
  }
  habit.streak += 1;
  res.json(habit);
});

// ------------------
// Content APIs
// ------------------

// Blog list
app.get('/api/blog', (req, res) => {
  res.json(blogPosts);
});

// Single blog post
app.get('/api/blog/:id', (req, res) => {
  const post = blogPosts.find((p) => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found.' });
  }
  res.json(post);
});

// Eco recommendations
app.get('/api/recommendations', (req, res) => {
  const { area } = req.query;
  if (area) {
    const match = ecoRecommendations.find((r) => r.id === area);
    if (!match) {
      return res.status(404).json({ error: 'No recommendations for that area.' });
    }
    return res.json(match);
  }
  res.json(ecoRecommendations);
});

// Fallback 404 handler for unknown API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint not found.' });
  }
  next();
});

// Central error handler to avoid crashing on unexpected errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`Eco Life backend running on http://localhost:${PORT}`);
});
