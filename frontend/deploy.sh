#!/bin/bash

# Lagos Restaurant Directory - Vercel Deployment Script
# This script automates the deployment process to Vercel

set -e

echo "🚀 Lagos Restaurant Directory - Vercel Deployment"
echo "=================================================="

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the frontend directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Run build to check for errors
echo "🔧 Building project..."
npm run build

# Check for environment variables
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found. Creating from template..."
    cp .env.example .env.local
    echo "📝 Please update .env.local with your actual values before deploying"
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed successfully!"
echo "📱 Your Lagos Restaurant Directory is now live!"
echo ""
echo "Next steps:"
echo "1. Configure environment variables in Vercel dashboard"
echo "2. Set up custom domain (optional)"
echo "3. Configure analytics and monitoring"
