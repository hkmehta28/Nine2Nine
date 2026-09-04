import { useState } from 'react'
import { products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import Divider from '../components/Divider.jsx'
import { motion, AnimatePresence } from 'framer-motion'

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Categories list extracted from data
  const categories = ['All', 'Necklaces', 'Rings', 'Bracelets', 'Earrings']

  // Filter items
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 min-h-screen">
      {/* Header and subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80 font-medium">
          Cast in Gold Vermeil
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-gold mt-2 font-normal uppercase tracking-wide">
          The Collection
        </h1>
        <Divider className="w-16 mx-auto mt-4" />
      </motion.div>

      {/* Category Tabs with layout-animation underlines */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-6 border-b border-gold/10 pb-6 mb-12">
        {categories.map((category) => {
          const isSelected = selectedCategory === category
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="relative px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-300 font-medium focus:outline-none"
            >
              <span className={isSelected ? 'text-gold font-semibold' : 'text-ivory/60 hover:text-ivory'}>
                {category}
              </span>
              {isSelected && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                  layoutId="active-category-indicator"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Grid with AnimatePresence */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((p, index) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={p} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 text-ivory/50"
        >
          No pieces currently in this category.
        </motion.div>
      )}
    </div>
  )
}