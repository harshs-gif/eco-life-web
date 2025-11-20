# Deployment Guide - EcoLife Platform

This guide provides step-by-step instructions for deploying the EcoLife platform to various hosting providers.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:
- [ ] All dependencies are installed (`npm install`)
- [ ] Build runs successfully (`npm run build`)
- [ ] TypeScript compilation passes (`npm run type-check`)
- [ ] No console errors in development mode
- [ ] All environment variables are configured
- [ ] Images and assets are optimized

## 🌐 Netlify Deployment (Recommended)

### Method 1: Git Integration (Automated)

1. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - (Already configured in `netlify.toml`)

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live in minutes!

### Method 2: Netlify CLI (Manual)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Follow Prompts**
   - Authorize Netlify CLI
   - Select "Create & configure a new site"
   - Choose your team
   - Enter site name (or use auto-generated)
   - Publish directory: `dist`

### Environment Variables (Netlify)

If you need to add environment variables:
1. Go to Site settings → Build & deploy → Environment
2. Add variables with `VITE_` prefix
3. Trigger a new deployment

## 🚀 Vercel Deployment

### Method 1: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow Prompts**
   - Connect to your Vercel account
   - Link to existing project or create new
   - Configure project settings
   - Deploy

### Method 2: Git Integration

1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

2. **Configure**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Deploy**
   - Click "Deploy"
   - Your site will be live!

## 🔥 Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

3. **Configure**
   - Select or create Firebase project
   - Set public directory to `dist`
   - Configure as single-page app: Yes
   - Set up automatic builds with GitHub: Optional

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🐳 Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**
   ```nginx
   server {
     listen 80;
     server_name _;
     root /usr/share/nginx/html;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }

     # Cache static assets
     location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
     }
   }
   ```

3. **Build and Run**
   ```bash
   docker build -t ecolife-platform .
   docker run -p 80:80 ecolife-platform
   ```

## 🌍 Custom Server (VPS/Dedicated)

### Using Nginx

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Upload to Server**
   ```bash
   scp -r dist/* user@your-server:/var/www/ecolife
   ```

3. **Configure Nginx**
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     root /var/www/ecolife;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }

     # Enable gzip compression
     gzip on;
     gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

4. **SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

## 🔧 Performance Optimization

### Pre-Deployment

1. **Optimize Images**
   - Use WebP format where possible
   - Compress images (TinyPNG, Squoosh)
   - Use appropriate sizes for responsive design

2. **Analyze Bundle Size**
   ```bash
   npm run build -- --analyze
   ```

3. **Enable Compression**
   - Already configured in `netlify.toml`
   - For custom servers, enable gzip/brotli

### Post-Deployment

1. **Test Performance**
   - Run Lighthouse audit
   - Test with WebPageTest
   - Check Core Web Vitals

2. **Monitor**
   - Set up analytics (Google Analytics, Plausible)
   - Monitor error tracking (Sentry)
   - Set up uptime monitoring

## 🔒 Security Best Practices

1. **HTTPS Only**
   - Always use HTTPS in production
   - Enforce with HSTS headers

2. **Environment Variables**
   - Never commit `.env` files
   - Use platform-specific secret management
   - Rotate API keys regularly

3. **CSP Headers**
   - Configure Content Security Policy
   - Restrict resource loading

4. **Regular Updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Run `npm audit` regularly

## 📊 Monitoring & Analytics

### Recommended Tools

1. **Performance Monitoring**
   - Lighthouse CI
   - Web Vitals
   - New Relic / Datadog

2. **Error Tracking**
   - Sentry
   - Rollbar
   - LogRocket

3. **Analytics**
   - Google Analytics 4
   - Plausible (privacy-focused)
   - Matomo

## 🆘 Troubleshooting

### Build Fails

- Check Node.js version (18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run type-check`

### 404 on Refresh

- Ensure SPA redirect rules are configured
- Check `netlify.toml` or equivalent config

### Assets Not Loading

- Verify base URL in `vite.config.ts`
- Check asset paths are relative
- Ensure assets are in `public/` or imported correctly

### Performance Issues

- Enable lazy loading for images
- Split code into smaller chunks
- Enable CDN caching
- Optimize images and assets

## 📞 Support

For deployment issues:
- Check the [Issues](https://github.com/yourusername/ecolife/issues) page
- Join our community Discord
- Email: support@ecolife.com

---

Happy Deploying! 🚀
