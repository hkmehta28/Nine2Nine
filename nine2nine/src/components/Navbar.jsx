import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import Logo from './Logo.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'

export default function Navbar() {
  const { count, setIsDrawerOpen } = useCart()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Collection', path: '/shop' },
  ]

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-gold/10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gold announcement bar */}
      <div className="bg-gold text-ink text-[9px] sm:text-[10px] py-1.5 px-4 uppercase tracking-[0.25em] font-bold text-center select-none relative z-50 shadow-md">
        Complimentary Shipping on all orders • 18K Recycled Gold Finish • Shop Everyday Luxury
      </div>

      {/* Main Navbar */}
      <div className="bg-ink/80 backdrop-blur-md py-3 px-6 border-t border-gold/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Brand Logo and Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="h-10 w-10" />
            <span className="font-display text-xl tracking-[0.25em] text-gold group-hover:text-gold-bright transition-colors uppercase font-medium">
              Nine 2 Nine
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative py-2 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 text-ivory/80 hover:text-gold-bright"
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                      layoutId="navbar-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Cart Trigger & Mobile Menu Toggle */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2 text-xs uppercase tracking-widest text-ivory/80 hover:text-gold transition-colors p-2 focus:outline-none"
              aria-label="Open cart collection"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5] text-gold" />
              <span className="hidden sm:inline font-medium text-ivory/80">Bag</span>
              <AnimatePresence mode="popLayout">
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="absolute -top-1 -right-2 bg-gold text-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger Menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-ivory/80 hover:text-gold focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gold/10 bg-ink/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs uppercase tracking-[0.25em] font-medium ${
                    location.pathname === link.path ? 'text-gold' : 'text-ivory/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}