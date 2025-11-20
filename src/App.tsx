import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './pages/Home';
import { SustainableLiving } from './pages/SustainableLiving';
import { Productivity } from './pages/Productivity';
import { MentalHealth } from './pages/MentalHealth';
import { Blog } from './pages/Blog';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AuthProvider } from './context/AuthContext';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';

// Page type definition
type PageType = 'home' | 'sustainable' | 'productivity' | 'mental-health' | 'blog' | 'about' | 'contact' | 'auth' | 'dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'sustainable':
        return <SustainableLiving />;
      case 'productivity':
        return <Productivity />;
      case 'mental-health':
        return <MentalHealth />;
      case 'blog':
        return <Blog />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'auth':
        return <Auth onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <LoadingSpinner size="lg" message="Loading EcoLife..." />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
            <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
            
            <main role="main" aria-label="Main content">
              {renderPage()}
            </main>

            <Footer />
          </div>
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
}