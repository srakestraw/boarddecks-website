import React from 'react'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <img
      src="/logos/board-decks-logo.svg"
      alt="Board Decks logo"
      role="img"
      className={className}
    />
  )
} 