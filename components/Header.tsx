import React from 'react'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <nav className="py-6">
        <div className="flex justify-between items-center">
          <Logo className="h-20 w-auto" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#ready-to-get-started" 
              className="text-primary font-medium hover:text-primary/80 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('ready-to-get-started')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              Contact
            </a>
          </div>
          
          {/* Mobile Hamburger Menu */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Open menu"
            aria-expanded="false"
          >
            <svg 
              className="w-6 h-6 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
} 