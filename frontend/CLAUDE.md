# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the frontend for Lagos Restaurant Directory - a comprehensive restaurant discovery platform for Lagos, Nigeria. Built with Next.js 14, it serves as the user interface for a restaurant directory that combines data from Google Places API, TripAdvisor, and other sources. The platform uniquely focuses on regulatory compliance (NTDC/NAFDAC badges), street food vendor integration, and Nigerian cultural relevance.

## Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Export static site
npm run export
```

### Deployment
```bash
# Quick deploy to Vercel (using deployment script)
./deploy.sh

# Manual Vercel CLI deployment
vercel --prod
```

## High-Level Architecture

### Data Pipeline Overview
The platform uses a multi-source data approach:
1. **Google Places API** (primary) - Restaurant details, coordinates, hours, reviews
2. **TripAdvisor** (supplementary) - Additional reviews and restaurant discovery
3. **Social Media APIs** (planned) - Photos, social handles, events
4. **Compliance Verification** - NTDC/NAFDAC regulatory badges
5. **Street Food Integration** - Informal vendor onboarding system

### Technology Stack
- **Frontend**: Next.js 14.2.30 with App Router, React 18.3.1, Tailwind CSS 3.4.17
- **Backend** (planned): Node.js/Express with MongoDB
- **Data Collection**: Scrapy framework with Google Places API integration
- **Deployment**: Vercel with security headers and performance optimization
- **Analytics**: Vercel Analytics integration

## Code Architecture

### Project Structure
```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.js        # Root layout with Analytics
│   │   ├── page.js          # Homepage (placeholder)
│   │   └── globals.css      # Global styles + Tailwind
│   └── components/          # React components by feature
│       ├── layout/          # Header, Footer, Hero, AreaGuide
│       ├── restaurant/      # RestaurantCard, RestaurantGrid, FeaturedRestaurants
│       ├── search/          # SearchSection with filtering
│       └── filters/         # FilterSidebar
├── pages/                   # Legacy Pages Router
│   └── mockup.tsx           # Complete UI mockup/prototype
├── vercel.json             # Deployment config with security headers
├── next.config.js          # Next.js optimization settings
└── tailwind.config.js      # Custom orange theme configuration
```

### Component Design System

#### RestaurantCard Component
Core component expecting restaurant data structure:
```javascript
{
  id: string,
  name: string,
  rating: number,
  reviewCount: number,
  cuisine: string,
  area: string,
  priceRange: string,
  image: string,
  highlights: string[],
  isOpen: boolean,
  nextOpenTime: string
}
```

#### Key Features
- **Compliance Badges**: NTDC/NAFDAC regulatory compliance indicators
- **Street Food Support**: Specialized components for informal vendors
- **Cultural Relevance**: Nigerian areas (Victoria Island, Lekki, Ikoyi) and cuisines
- **Mobile-First Design**: Responsive components with touch-friendly interfaces

### Styling System
- **Primary Theme**: Custom orange/amber palette (#ec6817 primary-500)
- **Design Language**: Modern card-based layout with shadows and hover effects
- **Typography**: Font-display for headings, clean sans-serif for body text
- **Icons**: Emoji-based for simplicity and cultural relevance

### Current Implementation Status

#### ✅ Completed Features
- Complete component architecture and design system
- Responsive layout with Header, Hero, Search, and Restaurant Grid
- Tailwind CSS configuration with custom theme
- Vercel deployment configuration with security headers
- Analytics integration
- Comprehensive UI mockup (pages/mockup.tsx)

#### 🔄 In Progress
- Integration with backend API
- Real restaurant data population
- Advanced filtering and search functionality

#### 📋 Planned Features  
- MongoDB integration via REST API
- User authentication and reviews
- Compliance verification workflow
- Street food vendor onboarding
- Multi-language support (English/Yoruba)

## Unique Platform Features

### Regulatory Compliance System
The platform includes unique Nigerian-specific features:
- **NTDC Compliance**: Tourism establishment licensing badges
- **NAFDAC Verification**: Food safety registration indicators  
- **Hygiene Ratings**: Health inspection certificates (A/B/C grades)
- **Compliance Scoring**: Algorithm-based compliance assessment

### Street Food Integration
Specialized onboarding for informal vendors:
- **Community Validation**: Local endorsements and testimonials
- **Alternative Documentation**: Flexible verification for informal businesses
- **Location Tracking**: GPS-based mobile vendor tracking
- **Cultural Preservation**: Focus on traditional Nigerian food culture

### Lagos-Specific Enhancements
- **Area Intelligence**: Neighborhood detection (Victoria Island, Lekki, Ikoyi, Surulere)
- **Phone Standardization**: Nigerian (+234) format conversion
- **Cultural Cuisines**: Nigerian, Continental, Chinese, Lebanese cuisine categories
- **Local Features**: Jollof rice, Suya, street food specialties

## Data Schema Integration

The frontend is designed to work with a comprehensive MongoDB schema including:
- **Restaurant Collection**: 50+ fields including compliance data
- **Users Collection**: Customer profiles with preferences
- **Reviews Collection**: Enhanced review system with detailed ratings
- **Categories Collection**: Hierarchical cuisine and restaurant type system

## Development Guidelines

### Component Patterns
- Use 'use client' directive for interactive components
- Implement proper error boundaries and loading states
- Follow mobile-first responsive design principles
- Include accessibility features (alt texts, keyboard navigation)

### State Management
- React useState for local component state
- No global state management currently implemented
- API integration planned via REST endpoints

### Performance Optimization
- Next.js Image component with proper sizing
- Lazy loading for restaurant cards and images
- Static optimization enabled
- Vercel deployment optimizations

### Nigerian Market Considerations
- Design for low-bandwidth scenarios
- Support for multiple payment methods (mobile money, bank transfers)
- Cultural color schemes and imagery
- Local area and landmark references

## Backend Integration Points

### Expected API Endpoints
```
GET /api/restaurants - List restaurants with filtering
GET /api/restaurants/:id - Individual restaurant details
POST /api/restaurants - Add new restaurant (business owners)
GET /api/compliance/:id - Compliance status and badges
POST /api/reviews - Submit restaurant reviews
GET /api/areas - Lagos area/neighborhood data
```

### Data Processing Pipeline
The backend processes data from:
1. **Google Places Grid Spider**: 260 grid points covering Lagos metropolitan area
2. **Compliance Verification System**: NTDC/NAFDAC document processing
3. **Street Food Onboarding**: Community validation workflow
4. **Review Aggregation**: Multi-source review compilation

## Deployment Configuration

### Vercel Setup
- **Region**: Cleveland (cle1) for optimal performance
- **Security Headers**: XSS protection, content sniffing prevention, frame options
- **Environment Variables**: NEXT_PUBLIC_SITE_URL, API endpoints
- **Image Optimization**: Unsplash remote patterns configured

### Performance Metrics
- **Build Size**: ~87.3 kB (optimized)
- **Coverage**: 2,500+ restaurants (projected)
- **Areas**: 20+ Lagos neighborhoods
- **Compliance Rate**: Target >80% verified restaurants

This platform represents a comprehensive approach to restaurant discovery in Lagos, combining modern web technologies with deep understanding of Nigerian food culture and regulatory requirements.