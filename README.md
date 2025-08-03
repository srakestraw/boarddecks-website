# Board Decks

A modern, scalable website framework for Board Decks built with Next.js, Tailwind CSS, and TypeScript.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Heroicons
- **Forms**: React Hook Form
- **Utilities**: classnames

## 📁 Project Structure

```
BoardDecks/
├── app/
│   ├── layout.tsx          # Main layout with Inter font and responsive container
│   ├── page.tsx            # Home/landing page
│   └── globals.css         # Global styles with Tailwind imports
├── components/
│   ├── Logo.tsx            # Reusable logo component
│   ├── Button.tsx          # CTA button with variants
│   ├── Container.tsx       # Responsive wrapper component
│   └── EmailForm.tsx       # Email sign-up form with validation
├── public/
│   ├── favicon.svg         # Custom favicon
│   └── logos/              # Integration partner logos
├── styles/
│   └── globals.css         # Global styles (imported in app)
├── tailwind.config.ts      # Tailwind configuration with brand colors
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Brand Colors

- **Primary**: `#231e5a` (Purple)
- **Accent**: `#B794F4` (Light Purple)
- **Dark Navy**: `#1A1D2E` (Text)
- **Light Purple BG**: `#F9F6FF` (Background)

## 🛠️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🧩 Components

### Logo
- Responsive text logo with customizable size
- Uses brand primary color

### Button
- Multiple variants: primary, secondary, outline
- Different sizes: sm, md, lg
- Accessible with focus states

### Container
- Responsive wrapper with configurable max-width
- Consistent padding options

### EmailForm
- Form validation with react-hook-form
- Email pattern validation
- Loading states and error handling

## 🎯 Next Steps

The foundation is now ready for:
- Building the full landing page content
- Adding navigation components
- Implementing authentication
- Creating additional pages and routes
- Adding animations and interactions

## 📝 Notes

- Uses Inter font from Google Fonts
- Configured for App Router (Next.js 14)
- Includes TypeScript strict mode
- Optimized for accessibility and SEO 