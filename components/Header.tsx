'use client';

import React, { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById('ready-to-get-started')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="border-b border-gray-100 bg-white relative">
      <nav className="py-6">
        <div className="flex justify-between items-center">
          <a href="/" className="hover:opacity-80 transition-opacity duration-200">
            <Logo className="h-20 w-auto" />
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="/manifesto" 
              className="text-primary font-medium hover:text-primary/80 transition-colors duration-200"
            >
              Manifesto
            </a>
            <a 
              href="/why-us" 
              className="text-primary font-medium hover:text-primary/80 transition-colors duration-200"
            >
              Why Us
            </a>
            <a 
              href="#ready-to-get-started" 
              className="text-primary font-medium hover:text-primary/80 transition-colors duration-200"
              onClick={handleContactClick}
            >
              Contact
            </a>
          </div>
          
          {/* Mobile Hamburger Menu */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <svg 
              className="w-6 h-6 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-50">
            <div className="px-6 py-4 space-y-4">
              <a 
                href="/manifesto" 
                className="block text-primary font-medium hover:text-primary/80 transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Manifesto
              </a>
              <a 
                href="/why-us" 
                className="block text-primary font-medium hover:text-primary/80 transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Why Us
              </a>
              <a 
                href="#ready-to-get-started" 
                className="block text-primary font-medium hover:text-primary/80 transition-colors duration-200 py-2"
                onClick={handleContactClick}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 