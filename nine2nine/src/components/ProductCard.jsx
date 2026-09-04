import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext.jsx'
import { ShoppingBag } from 'lucide-react'

export default function ProductCard({ product, index }) {
  const { addItem } = useCart()

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        to={`/product/${product.id}`}
        className="group relative flex flex-col h-full bg-charcoal/30 border border-gold/10 hover:border-gold/30 rounded-sm overflow-hidden transition-all duration-500 shadow-lg hover:shadow-gold/5"
      >
        {/* Soft decorative shadow background glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-wine/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Image Container with Zoom Effect & Quick Add Overlay */}
        <div className="aspect-[4/5] overflow-hidden relative bg-black/40">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Subtle gold sheen overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Quick Add Button Slide-up Overlay */}
          <div className="absolute inset-0 flex items-end justify-center p-4">
            <motion.button
              onClick={handleQuickAdd}
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2.5 bg-gold text-ink font-body text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 transition-all duration-300 shadow-lg hover:bg-gold-bright"
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
              <span>Quick Add</span>
            </motion.button>
          </div>
        </div>

        {/* Card Details */}
        <div className="p-5 flex flex-col justify-between flex-grow text-center relative z-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold/60 font-medium">
              {product.category}
            </p>
            <h3 className="font-display text-lg sm:text-xl text-ivory/90 group-hover:text-gold-bright transition-colors duration-300 mt-1.5 font-medium leading-snug">
              {product.name}
            </h3>
          </div>
          <p className="text-gold font-body font-medium tracking-wide mt-3 text-sm">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}