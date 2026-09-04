import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import Divider from '../components/Divider.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckSquare } from 'lucide-react'

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart()

  const shippingCost = 0 // Free shipping
  const estimatedTax = Math.round(total * 0.03) // 3% estimate tax
  const orderTotal = total + shippingCost + estimatedTax

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 bg-charcoal border border-gold/15 flex items-center justify-center rounded-full shadow-lg">
            <ShoppingBag className="w-6 h-6 text-gold/60" />
          </div>
          <div>
            <h2 className="font-display text-2xl text-ivory tracking-wide">Your bag is empty</h2>
            <p className="text-sm text-ivory/50 mt-1">There are no pieces currently in your collection.</p>
          </div>
          <Link to="/shop">
            <motion.button
              className="px-8 py-3 bg-gold text-ink font-body text-xs font-semibold uppercase tracking-widest rounded-sm hover:shadow-lg hover:shadow-gold/25"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse the Collection
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-4xl text-gold font-normal uppercase tracking-wide">Your Bag</h1>
        <Divider className="my-3 justify-start w-16" />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-12 mt-10 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                transition={{ duration: 0.4 }}
                className="flex gap-6 border-b border-gold/10 pb-6 items-center"
              >
                <div className="w-20 h-24 sm:w-24 sm:h-28 bg-charcoal border border-gold/10 rounded-sm overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gold/70 font-medium">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl text-ivory font-medium mt-1 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-gold text-sm font-medium mt-1 font-body">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Quantity adjustments and delete */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gold/20 rounded-sm bg-ink/50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-xs font-semibold px-2 text-ivory/80 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <motion.button
                      onClick={() => removeItem(item.id)}
                      className="text-ivory/40 hover:text-gold p-2 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Checkout Summary Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 rounded-sm relative overflow-hidden"
        >
          {/* Subtle wine gradient highlight inside summary */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-wine/10 rounded-full blur-2xl pointer-events-none" />

          <h3 className="font-display text-xl text-ivory font-semibold tracking-wide border-b border-gold/10 pb-4 mb-4">
            Order Summary
          </h3>

          <div className="space-y-3.5 text-xs text-ivory/70 tracking-wide font-light">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (3%)</span>
              <span className="font-medium">₹{estimatedTax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Shipping</span>
              <span className="text-gold font-medium">Free</span>
            </div>

            <Divider className="my-2" />

            <div className="flex justify-between text-sm text-ivory font-semibold tracking-wider">
              <span>Total</span>
              <span className="text-gold">₹{orderTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <motion.button
            className="w-full mt-6 py-4 bg-gold text-ink font-body text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm hover:bg-gold-bright transition-colors hover:shadow-lg hover:shadow-gold/15"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>

          <div className="flex items-center gap-2 justify-center mt-6 text-[10px] uppercase tracking-widest text-ivory/40">
            <ShieldCheck className="w-3.5 h-3.5 text-gold/60" />
            <span>Secure SSL Encrypted Checkout</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}