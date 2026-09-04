import React from 'react'
import { motion } from 'framer-motion'

export default function Logo({ className = "h-16 w-16", showText = false }) {
  return (
    <div className={`flex flex-col items-center justify-center ${showText ? 'gap-2' : ''}`}>
      <motion.div
        className={`relative ${className}`}
        whileHover={{ scale: 1.05, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f2ca50" />
              <stop offset="30%" stopColor="#e8c579" />
              <stop offset="70%" stopColor="#c9a35a" />
              <stop offset="100%" stopColor="#554300" />
            </linearGradient>
            <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="shine-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9a35a" stopOpacity="0" />
              <stop offset="50%" stopColor="#fff5db" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c9a35a" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Golden Outer Ring */}
          <circle
            cx="50"
            cy="52"
            r="38"
            stroke="url(#gold-gradient)"
            strokeWidth="1.2"
            opacity="0.85"
          />

          {/* Crescent Moon Arc (Top Left Sweeping) */}
          <path
            d="M 50 14 A 38 38 0 0 0 12 52 A 38 38 0 0 0 25 78 A 37 37 0 0 1 20 52 A 37 37 0 0 1 50 15.5 Z"
            fill="url(#gold-gradient)"
            opacity="0.9"
            filter="url(#gold-glow)"
          />

          {/* Logo Brand Numbers "929" */}
          <text
            x="50"
            y="59"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', serif"
            fontSize="26"
            fontWeight="bold"
            fill="url(#gold-gradient)"
            letterSpacing="-0.05em"
            filter="url(#gold-glow)"
          >
            929
          </text>

          {/* Four-pointed Sparkle Star at Top Center */}
          <path
            d="M 50 6 L 52 11 L 57 13 L 52 15 L 50 20 L 48 15 L 43 13 L 48 11 Z"
            fill="url(#gold-gradient)"
            filter="url(#gold-glow)"
          />

          {/* Decorative Sparkle dots */}
          <circle cx="28" cy="24" r="1" fill="#e8c579" />
          <circle cx="72" cy="36" r="0.8" fill="#e8c579" />
        </svg>
      </motion.div>

      {showText && (
        <div className="text-center select-none">
          <h2 className="font-display text-2xl tracking-[0.25em] text-gold uppercase mt-1">
            Nine 2 Nine
          </h2>
          <p className="text-[9px] tracking-[0.4em] uppercase text-ivory/50 mt-0.5">
            A Jewelry For Everyone
          </p>
        </div>
      )}
    </div>
  )
}
