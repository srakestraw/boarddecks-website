#!/bin/bash

# Netlify Deployment Script for Board Decks
echo "🚀 Board Decks - Netlify Deployment"
echo "===================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Building the application for static export..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Static files generated in 'out' directory"
    echo ""
    echo "🎯 Next Steps:"
    echo "1. Go to https://netlify.com"
    echo "2. Sign up/Login with your GitHub account"
    echo "3. Click 'New site from Git'"
    echo "4. Connect your repository: srakestraw/boarddecks-website"
    echo "5. Configure build settings:"
    echo "   - Build command: npm run build"
    echo "   - Publish directory: out"
    echo "6. Deploy!"
    echo ""
    echo "🌐 Your site will be live at:"
    echo "   https://your-site-name.netlify.app"
    echo ""
    echo "📝 Your API function will be at:"
    echo "   https://your-site-name.netlify.app/.netlify/functions/early-access"
    echo ""
    echo "🧪 Test your API with:"
    echo "curl -X POST https://your-site-name.netlify.app/.netlify/functions/early-access \\"
    echo "  -H \"Content-Type: application/json\" \\"
    echo "  -d '{\"firstName\":\"Test\",\"lastName\":\"User\",\"company\":\"Test Co\",\"email\":\"test@example.com\"}'"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi 