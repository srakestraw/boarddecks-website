export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 text-sm text-gray-600">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* Left: Logo and tagline */}
        <div className="flex items-center space-x-3">
          <a href="/" className="hover:opacity-80 transition-opacity duration-200">
            <img src="/logos/board-decks-logo.svg" alt="BoardDecks Logo" className="h-6 w-auto" />
          </a>
          <span className="text-gray-700 font-medium">Clarity Where It Counts</span>
        </div>

        {/* Center: Navigation */}
        <div className="flex space-x-6 text-gray-600">
          <a href="/manifesto" className="hover:text-dark-navy transition">Manifesto</a>
          <a href="/why-us" className="hover:text-dark-navy transition">Why Us</a>
          <a href="/#ready-to-get-started" className="hover:text-dark-navy transition">Request Access</a>
          <a href="/privacy" className="hover:text-dark-navy transition">Privacy</a>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} BoardDecks, Inc. — All rights reserved.
        </div>
      </div>
    </footer>
  );
} 