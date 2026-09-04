import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import Divider from '../components/Divider.jsx'
import Logo from '../components/Logo.jsx'
import GiftFinder from '../components/GiftFinder.jsx'
import Reviews from '../components/Reviews.jsx'
import { ArrowRight, Compass, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react'

export default function Home() {
  const featured = products.slice(0, 3)

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <div className="grainy-bg min-h-screen">
      {/* Cinematic Parallax Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-gold/10 bg-black">
        {/* Background Image Container with parallax scale zoom */}
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/hero_showcase.png')` }}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 0.55 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />

        {/* Rich vignettes & wine red gradient overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-ink/30 via-wine-dark/20 to-ink pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(74,20,32,0.15),transparent_70%)] pointer-events-none" />

        {/* Hero Branding Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center select-none"
        >
          {/* Logo animation */}
          <motion.div variants={itemVariants} className="mb-4">
            <Logo className="h-20 w-20" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] text-gold font-normal uppercase leading-none"
          >
            Nine 2 Nine
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[10px] sm:text-xs uppercase tracking-[0.45em] text-ivory/80 mt-3 font-medium"
          >
            A Jewelry For Everyone.
          </motion.p>

          <motion.div variants={itemVariants} className="w-48">
            <Divider className="my-6" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-ivory/60 max-w-md mx-auto text-sm sm:text-base font-light tracking-wide leading-relaxed"
          >
            Cast in high-polish gold vermeil for everyday elegance — designed to wear from morning coffee to midnight.
          </motion.p>

          {/* Interactive CTA button */}
          <motion.div variants={itemVariants} className="mt-10">
            <Link to="/shop">
              <motion.button
                className="group relative flex items-center gap-3 px-8 py-3.5 bg-gold text-ink font-body text-xs font-semibold uppercase tracking-widest overflow-hidden rounded-sm hover:shadow-lg hover:shadow-gold/20"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background button slide effect */}
                <div className="absolute inset-0 bg-gold-bright -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                <span className="relative z-10 flex items-center gap-2">
                  Shop the Collection
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Mouse scroll down indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-60"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span className="text-[9px] uppercase tracking-widest text-gold font-medium">Scroll</span>
          <div className="w-4 h-7 border border-gold/40 rounded-full p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-gold rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Editorial Story Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Story Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs uppercase tracking-widest text-gold font-medium">Our Craft</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-ivory font-normal leading-tight">
            Designed for <span className="text-gold italic font-light">Every Moment</span>.
          </h2>
          <Divider className="my-1 justify-start" />
          <p className="text-ivory/70 font-light leading-relaxed text-base sm:text-lg">
            At Nine 2 Nine, we believe jewelry should not be reserved solely for occasions. It is a daily companion, a subtle stamp of self-expression. 
          </p>
          <p className="text-ivory/60 font-light leading-relaxed text-sm">
            Each piece is meticulously crafted using high-grade recycled metals, finished in thick 18k gold vermeil to ensure exceptional wearability, luster, and longevity. Designed to fit seamlessly into any wardrobe, for anyone.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-2xl text-gold font-semibold">18k</span>
              <span className="text-[10px] uppercase tracking-widest text-ivory/40">Gold Vermeil Finish</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-2xl text-gold font-semibold">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-ivory/40">Recycled Base</span>
            </div>
          </div>
        </motion.div>

        {/* Story Graphic / Overlay Cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex justify-center items-center h-[380px]"
        >
          {/* Burgundy accent background card */}
          <div className="absolute top-4 right-4 w-[85%] h-[90%] bg-wine/25 border border-wine/40 rounded-sm pointer-events-none" />

          {/* Foreground main showcase card */}
          <motion.div
            className="w-[85%] h-[90%] border border-gold/15 bg-charcoal/80 rounded-sm overflow-hidden shadow-2xl relative z-10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src="/hero_showcase.png"
              alt="Luxury Jewelry layout"
              className="w-full h-full object-cover opacity-80"
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[9px] uppercase tracking-[0.3em] text-gold font-medium">Autumn Collection</p>
              <h4 className="font-display text-lg text-ivory mt-0.5">The Modern Alchemist</h4>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Style Concierge Interactive Section */}
      <section className="bg-charcoal/30 border-t border-b border-gold/5 py-24 px-6 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-wine/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-gold" />
              <span className="text-xs uppercase tracking-widest text-gold font-medium">Gift Finder</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-ivory font-normal leading-tight">
              Bespoke Styling <br />
              <span className="text-gold italic font-light">At Your Fingertips</span>
            </h2>
            <Divider className="my-1 justify-start w-24" />
            <p className="text-ivory/70 font-light leading-relaxed text-sm sm:text-base">
              Selecting the ideal jewelry design can be challenging. Whether you're shopping for yourself or searching for an unforgettable gift, our interactive Concierge filters options to recommend the perfect fit.
            </p>
            <div className="space-y-3.5 text-xs text-ivory/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>3 Quick Styling Preferences</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>Immediate Curated Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>Seamless Quick-Bag Checkout</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GiftFinder />
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-gold" />
            <span className="text-xs uppercase tracking-widest text-gold font-medium">Curated</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ivory font-normal">Featured Pieces</h2>
          <Divider className="w-24 mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featured.map((p, index) => (
            <ProductCard key={p.id} product={p} index={index} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/shop">
            <motion.span
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-gold-bright transition-colors cursor-pointer font-medium py-2 relative group"
              whileHover={{ x: 2 }}
            >
              Explore Full Collection
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </motion.span>
          </Link>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-charcoal/20 border-t border-gold/5 py-20 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs uppercase tracking-widest text-gold font-medium">Testimonials</span>
          </div>
          <h2 className="font-display text-3xl text-ivory font-normal uppercase tracking-wider">
            Client Voices
          </h2>
          <Divider className="w-16 mt-3" />

          {/* Testimonial slider component */}
          <div className="mt-8 w-full">
            <Reviews />
          </div>
        </div>
      </section>
    </div>
  )
}