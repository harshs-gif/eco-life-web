import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, BookOpen, Clock, User, Tag, ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import type { BlogPost } from '../types';

export function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'Sustainability', 'Wellness', 'Productivity', 'Lifestyle', 'Community'];

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        const res = await fetch('http://localhost:4000/api/blog');
        if (!res.ok) {
          throw new Error('Failed to load blog posts');
        }
        const data = await res.json();
        setPosts(data || []);
      } catch (err: any) {
        setError(err?.message || 'Unable to load blog posts.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (activePost) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => setActivePost(null)} className="mb-6 inline-flex items-center gap-2 text-green-600 dark:text-green-400">
            <ChevronLeft className="w-5 h-5" /> Back to Articles
          </button>
          <article className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
            <ImageWithFallback src={activePost.imageUrl} alt={activePost.title} className="w-full h-72 object-cover" />
            <div className="p-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full w-fit mb-4">
                <Tag className="w-4 h-4" />
                {activePost.category}
              </span>
              <h1 className="text-neutral-900 dark:text-white mb-4">{activePost.title}</h1>
              <div className="flex items-center gap-6 text-neutral-500 dark:text-neutral-400 mb-8">
                <span className="flex items-center gap-2"><User className="w-4 h-4" />{activePost.author}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{activePost.readTime}</span>
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {activePost.content.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </article>
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
            Loading articles...
          </div>
        )}
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl">
              <BookOpen className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-neutral-900 dark:text-white mb-4">Blog & Articles</h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Insights, guides, and stories from our community on sustainable living, wellness, and productivity
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Search blog articles"
              />
            </div>

            {/* Filter Button */}
            <button className="px-6 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center gap-2 hover:border-green-500 transition-colors">
              <Filter className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              <span className="text-neutral-900 dark:text-white">Filters</span>
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-green-600 text-white'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-green-50 dark:hover:bg-neutral-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={selectedCategory === category.toLowerCase()}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <ImageWithFallback
                    src={filteredPosts[0].imageUrl}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-600 text-white rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full w-fit mb-4">
                    <Tag className="w-4 h-4" />
                    {filteredPosts[0].category}
                  </span>
                  <h2 className="text-neutral-900 dark:text-white mb-4">{filteredPosts[0].title}</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-neutral-500 dark:text-neutral-400 mb-6">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {filteredPosts[0].author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {filteredPosts[0].readTime} read
                    </span>
                  </div>
                  <motion.button
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl w-fit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActivePost(filteredPosts[0])}
                  >
                    Read Article
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
              whileHover={{ y: -5 }}
            onClick={() => setActivePost(post)}
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-neutral-900/90 backdrop-blur text-neutral-900 dark:text-white rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-neutral-900 dark:text-white mb-3">{post.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              No articles found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-8 py-4 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-xl hover:border-green-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Articles
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
