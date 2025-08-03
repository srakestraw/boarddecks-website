# Deployment Guide - Netlify

## 🚀 Deploy to Netlify

### Automatic Deployment (Recommended)

1. **Connect to GitHub**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select `srakestraw/boarddecks-website`

2. **Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: 18 (auto-detected)

3. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Manual Deployment

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload to Netlify**:
   - Drag and drop the `out` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --dir=out --prod`

### Environment Variables

No environment variables are required for this static site.

### Custom Domain

1. Go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS settings as instructed

### Build Configuration

The `netlify.toml` file includes:
- ✅ Build command and publish directory
- ✅ Security headers
- ✅ Cache optimization for static assets
- ✅ SPA fallback for client-side routing

### Troubleshooting

- **Build fails**: Check Node.js version (18+ required)
- **404 errors**: Ensure `trailingSlash: true` in next.config.js
- **Images not loading**: Verify `unoptimized: true` for static export

## 🔗 Live Site

Once deployed, your site will be available at:
`https://your-site-name.netlify.app` 