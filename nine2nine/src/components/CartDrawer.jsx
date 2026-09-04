import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react'

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total, isDrawerOpen, setIsDrawerOpen } = useCart()
  const drawerRef = useRef(null)

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isDrawerOpen])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsDrawerOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIsDrawerOpen])

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Slide-out Sidebar Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-charcoal border-l border-gold/15 z-50 flex flex-col shadow-2xl select-none"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-gold/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-gold" />
                <h3 className="font-display text-lg uppercase tracking-widest text-ivory font-semibold">
                  Your Collection
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 hover:text-gold text-ivory/50 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items list (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                    <ShoppingBag className="w-8 h-8 text-ivory/30 stroke-[1.2]" />
                    <div>
                      <p className="text-sm text-ivory/80">Your bag is empty.</p>
                      <p className="text-[11px] text-ivory/40 mt-0.5">Explore the collection to add items.</p>
                    </div>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="mt-2 text-xs uppercase tracking-widest text-gold underline font-semibold"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 border-b border-gold/5 pb-4"
                    >
                      <div className="w-16 h-20 bg-black/30 border border-gold/10 rounded-sm overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-display text-sm text-ivory font-medium line-clamp-1">
                              {item.name}
                            </h4>
                            <span className="text-[11px] text-gold font-body font-medium flex-shrink-0">
                              ₹{item.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <span className="text-[9px] uppercase tracking-widest text-ivory/40 mt-0.5 block">
                            {item.category}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          {/* Quantity selectors */}
                          <div className="flex items-center border border-gold/20 rounded-sm overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-xs text-gold hover:bg-gold/10"
                            >
                              −
                            </button>
                            <span className="text-[10px] font-semibold px-2 text-ivory/80">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-xs text-gold hover:bg-gold/10"
                            >
                              +
                            </button>
                          </div>
                          {/* Remove button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-ivory/30 hover:text-gold p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Summary Calculations & Checkout Button */}
            {items.length > 0 && (
              <div className="p-5 border-t border-gold/10 bg-black/20 space-y-4">
                <div className="space-y-2 text-xs text-ivory/70 font-light">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-ivory">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-gold font-medium">Free</span>
                  </div>
                </div>

                <div className="border-t border-gold/10 pt-3 flex justify-between text-sm text-ivory font-semibold">
                  <span>Subtotal</span>
                  <span className="text-gold">₹{total.toLocaleString('en-IN')}</span>
                </div>

                <div className="space-y-2 pt-2">
                  <motion.button
                    className="w-full py-3.5 bg-gold text-ink font-body text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm hover:bg-gold-bright transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Secure Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>

                  <Link to="/cart" onClick={() => setIsDrawerOpen(false)} className="block">
                    <button className="w-full py-2.5 bg-transparent border border-gold/30 hover:border-gold text-ivory/80 hover:text-gold font-body text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors">
                      View Full Bag page
                    </button>
                  </Link>
                </div>

                <div className="flex items-center gap-1.5 justify-center text-[9px] text-ivory/30 uppercase tracking-widest pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold/50" />
                  <span>Encrypted Safe Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
