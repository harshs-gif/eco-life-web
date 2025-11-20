# EcoLife - Sustainable Living Platform

A comprehensive, production-ready web application promoting sustainable living, productivity, and mental health. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🌱 Features

### Core Pages
- **Home**: Hero section with animated elements, mission statement, and feature highlights
- **Sustainable Living Guide**: Interactive accordions, progress trackers, and eco-friendly tips
- **Productivity Tools**: Goal tracking, habit builder, and task management system
- **Mental Health Support**: Educational resources, self-assessment quizzes, and meditation guides
- **Community Hub**: Forum discussions, live chat, and challenge leaderboards
- **Blog**: Article listings with search/filter functionality
- **About**: Team bios, animated timeline, and impact metrics
- **Contact**: Form validation, FAQ section, and contact information

### Key Features
- ✅ **Dark Mode**: Smooth theme transitions with system preference detection
- ✅ **Responsive Design**: Mobile-first approach, fully responsive across all devices
- ✅ **Accessibility**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation
- ✅ **Animations**: Smooth scroll-triggered animations using Framer Motion
- ✅ **Performance**: Optimized bundle size, lazy loading, and efficient rendering
- ✅ **SEO Ready**: Semantic HTML, proper meta tags, and structured content
- ✅ **Type Safety**: Full TypeScript implementation with strict typing

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4.0
- **Animations**: Framer Motion (Motion/React)
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useContext, useEffect)
- **Build Tool**: Vite
- **Deployment**: Netlify (configuration included)

## 📁 Project Structure

```
/
├── components/
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   ├── ui/                      # ShadCN UI components
│   ├── Navigation.tsx           # Main navigation with dark mode toggle
│   ├── Footer.tsx               # Footer with newsletter signup
│   └── LoadingSpinner.tsx       # Loading state component
├── context/
│   └── ThemeContext.tsx         # Dark mode context provider
├── pages/
│   ├── Home.tsx                 # Landing page
│   ├── SustainableLiving.tsx    # Sustainability guide
│   ├── Productivity.tsx         # Productivity tools
│   ├── MentalHealth.tsx         # Mental wellness resources
│   ├── Community.tsx            # Community hub
│   ├── Blog.tsx                 # Blog and articles
│   ├── About.tsx                # About us page
│   └── Contact.tsx              # Contact form and FAQ
├── types/
│   └── index.ts                 # TypeScript type definitions
├── styles/
│   └── globals.css              # Global styles and Tailwind config
├── App.tsx                      # Main app component with routing
├── netlify.toml                 # Netlify deployment configuration
└── README.md                    # This file
```

## 🎨 Design System

### Color Palette
- **Primary Green**: #22c55e, #16a34a (sustainability theme)
- **Primary Blue**: #3b82f6, #1e40af (trust and calm)
- **Neutral Tones**: #a3a3a3, #525252 (balance)
- **Mental Health**: #f1f5f9, #e2e8f0 (soft, calming)

### Typography
- Custom font hierarchy defined in globals.css
- Consistent spacing and line-height
- Accessible contrast ratios (4.5:1 minimum)

### Animations
- Scroll-triggered fade-ins and slide-ins
- Hover effects on interactive elements
- Smooth page transitions
- Dark mode toggle animation

## 🛠️ Development

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
No environment variables required for basic functionality. For production deployment with analytics or backend services, add:

```env
VITE_API_URL=your_api_url
VITE_ANALYTICS_ID=your_analytics_id
```

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Build settings are pre-configured in `netlify.toml`
3. Deploy automatically on push to main branch

### Manual Build
```bash
npm run build
# Upload contents of /dist directory to your hosting provider
```

## ♿ Accessibility

This application follows WCAG 2.1 AA standards:
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast ratios
- Focus indicators on all interactive elements

## 🌍 Sustainability Features

Built with eco-friendly practices:
- Efficient animations to reduce CPU/GPU usage
- Dark mode for energy savings on OLED screens
- Optimized images and assets
- Minimal JavaScript bundle size
- Green hosting recommendations

## 📱 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a demonstration project showcasing best practices for sustainable web development. Feel free to use it as a template for your own projects.

## 📄 License

This project is created for educational and demonstration purposes.

## 🙏 Acknowledgments

- Unsplash for high-quality images
- Lucide for beautiful icons
- Tailwind CSS for the utility-first framework
- Framer Motion for smooth animations
- The open-source community

## 📞 Support

For questions or feedback about this project:
- Email: hello@ecolife.com
- Community: Join our discussions in the Community Hub

---

Built with 💚 for a sustainable future
