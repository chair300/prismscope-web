# Prismscope - Public Website

Elite consulting intelligence democratized. AI-powered organizational optimization for everyone.

## Overview

This is the public marketing website for Prismscope, showcasing the platform's capabilities and value proposition. Built with React, Vite, and Tailwind CSS for modern, responsive design.

## Key Features Highlighted

- **Elite Consulting Methodology**: Same frameworks used by top consulting firms
- **Soul-Crushing Task Detection**: AI identifies and helps automate repetitive work
- **AI-Powered Speed**: Complete analysis in hours, not months

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment

### Quick Start
```bash
# Use the deployment script (recommended)
./deploy.sh

# Or specify a custom port
PORT=3030 ./deploy.sh
```

### Manual Docker Commands
```bash
# Build image
docker build -t prismscope-website:latest .

# Run container
docker run -d --name prismscope-website -p 8080:80 --restart unless-stopped prismscope-website:latest

# Test deployment
curl http://localhost:8080
curl http://localhost:8080/health
```

### Docker Compose
```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

### Container Features
- **Multi-stage build** for optimized image size
- **Security headers** configured in nginx
- **Health check endpoint** at `/health`
- **Gzip compression** enabled
- **Static asset caching** configured
- **Production-ready** nginx configuration

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── Hero.jsx            # Hero section with value prop
│   ├── Features.jsx        # Features showcase
│   ├── Pricing.jsx         # Pricing comparison
│   ├── Contact.jsx         # Contact and CTA
│   └── Footer.jsx          # Site footer
├── App.jsx                 # Main app component
├── main.jsx               # React entry point
└── index.css              # Global styles and utilities
```

## Key Sections

### Hero Section
- Primary value proposition
- Cost comparison with traditional consulting
- Clear call-to-action

### Features Section
- AI-powered diagnostic capabilities
- Organizational health assessment
- Soul-crushing task elimination
- Success metrics and ROI

### Pricing Section
- Three-tier pricing model
- Direct cost comparison with big consulting firms
- Feature breakdown by plan

### Contact Section
- Free assessment offer
- Implementation timeline
- Contact information

## Deployment Options

### Static Hosting
- Netlify
- Vercel 
- GitHub Pages
- AWS S3 + CloudFront

### Container Deployment
- Docker containers
- Kubernetes
- Azure Container Instances
- AWS ECS

## Contact

Built by Christopher Harrison, PhD
Email: harrison@provoco.ai
