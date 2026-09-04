import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, CheckCircle } from 'lucide-react'

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: 'Priya R.',
      location: 'Mumbai',
      initials: 'PR',
      rating: 5,
      review:
        'The Wraith Teardrop Pendant is absolutely stunning. The weight is perfect and it has a beautiful warm gold polish. I wear it everyday and it has not tarnished at all!',
    },
    {
      id: 2,
      name: 'Kiara M.',
      location: 'Delhi',
      initials: 'KM',
      rating: 5,
      review:
        'I am in love with the Open Cuff Bangle. It is sleek, fits perfectly, and goes with everything from shirts to cocktail dresses. The packaging was also incredibly premium.',
    },
    {
      id: 3,
      name: 'Aditi S.',
      location: 'Bangalore',
      initials: 'AS',
      rating: 5,
      review:
        'High-quality craftsmanship! The Molten Wave Ring is hand-sculpted and catches the light beautifully. Customer service was also very responsive. Highly recommend!',
    },
  ]

  const [index, setIndex] = useState(0)

  // Auto-play reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [reviews.length])

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % reviews.length)
  }

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4 text-center select-none relative">
      <div className="relative h-[220px] sm:h-[180px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            {/* Stars */}
            <div className="flex gap-1 justify-center">
              {[...Array(reviews[index].rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
            </div>

            {/* Testimonial text */}
            <blockquote className="font-display text-lg sm:text-xl text-ivory/80 italic font-light leading-relaxed max-w-lg">
              "{reviews[index].review}"
            </blockquote>

            {/* User Meta */}
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-wine/30 border border-gold/20 flex items-center justify-center text-[10px] font-bold text-gold">
                {reviews[index].initials}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-ivory">{reviews[index].name}</p>
                <div className="flex items-center gap-1 text-[9px] text-ivory/40 uppercase tracking-widest mt-0.5">
                  <CheckCircle className="w-3 h-3 text-gold/70" />
                  <span>Verified Purchase, {reviews[index].location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:-px-6 pointer-events-none">
        <button
          onClick={handlePrev}
          className="p-2 border border-gold/15 bg-charcoal hover:border-gold hover:text-gold text-ivory/50 rounded-full transition-all pointer-events-auto"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 border border-gold/15 bg-charcoal hover:border-gold hover:text-gold text-ivory/50 rounded-full transition-all pointer-events-auto"
          aria-label="Next review"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((r, i) => (
          <button
            key={r.id}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === i ? 'w-4 bg-gold' : 'w-1.5 bg-ivory/20'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
