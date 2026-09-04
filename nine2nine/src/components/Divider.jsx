import React from 'react'
import { motion } from 'framer-motion'

export default function Divider({ className = "my-6" }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <motion.span
        className="h-px w-12 bg-gradient-to-l from-gold/70 to-transparent block"
        initial={{ scaleX: 0, originX: 1 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
      <motion.svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ rotate: -45, scale: 0.6, opacity: 0 }}
        whileInView={{ rotate: 45, scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.3 }}
      >
        <path
          d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z"
          fill="#c9a35a"
          filter="drop-shadow(0 0 2px rgba(201, 163, 90, 0.5))"
        />
      </motion.svg>
      <motion.span
        className="h-px w-12 bg-gradient-to-r from-gold/70 to-transparent block"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
    </div>
  )
}