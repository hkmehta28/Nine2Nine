import React from 'react'
import Divider from './Divider.jsx'
import Logo from './Logo.jsx'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/10 mt-24 bg-charcoal/40 grainy-bg py-12 text-center overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-wine/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Brand Logo */}
        <Logo className="h-12 w-12" />
        <h3 className="font-display text-2xl text-gold tracking-[0.3em] uppercase mt-3 font-semibold">
          Nine 2 Nine
        </h3>
        <p className="text-[10px] uppercase tracking-[0.4em] text-ivory/40 mt-1">
          A Jewelry for Everyone
        </p>

        <Divider className="my-6 w-full" />

        {/* Social Tag from Reference Image */}
        <motion.a
          href="https://instagram.com/nine2nine_jewel"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-gold/20 hover:border-gold/60 rounded-full text-xs uppercase tracking-widest text-ivory/70 hover:text-gold transition-all duration-300 bg-ink/30"
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-gold"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span className="font-medium">nine2nine_jewel</span>
        </motion.a>

        <p className="text-[11px] text-ivory/30 mt-8 tracking-widest">
          © {new Date().getFullYear()} 929 Nine2Nine. Cast for everyday wear.
        </p>
      </div>
    </footer>
  )
}