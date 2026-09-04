import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products.js'
import { useCart } from '../context/useCart.js'
import Divider from '../components/Divider.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingBag, CheckCircle, Sparkles, Shield, RefreshCw } from 'lucide-react'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  const { addItem } = useCart()
  const [showToast, setShowToast] = useState(false)
  const [activeTab, setActiveTab] = useState('details')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-ivory/60">This piece isn't in the collection.</p>
        <Link to="/shop" className="text-gold underline mt-4 inline-block font-medium">
          Back to Shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen relative">
      {/* Return to shop button */}
      <div className="mb-8">
        <Link to="/shop">
          <motion.span
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-gold-bright transition-colors cursor-pointer"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Collection Overview</span>
          </motion.span>
        </Link>
      </div>

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-12 items-start"
      >
        {/* Product Image Panel with Zoom Effect */}
        <motion.div
          variants={textVariants}
          className="group aspect-[4/5] bg-charcoal border border-gold/15 rounded-sm overflow-hidden relative shadow-2xl"
        >
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={1000}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent pointer-events-none" />
        </motion.div>

        {/* Product Information Panel */}
        <div className="flex flex-col gap-6">
          <motion.div variants={textVariants}>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80 font-medium">
              {product.category}
            </span>
            <h1 className="font-display text-4xl text-ivory mt-1.5 font-normal tracking-wide leading-tight">
              {product.name}
            </h1>
            <p className="text-gold text-2xl font-body mt-3 font-medium">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </motion.div>

          <motion.div variants={textVariants}>
            <Divider className="my-1 justify-start w-24" />
            <p className="text-ivory/70 font-light mt-4 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </motion.div>

          {/* Luxury Specifications Tabs */}
          <motion.div variants={textVariants} className="mt-2">
            <div className="flex border-b border-gold/10 gap-6 text-xs uppercase tracking-widest pb-2 mb-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`font-semibold transition-colors ${
                  activeTab === 'details' ? 'text-gold' : 'text-ivory/50 hover:text-ivory'
                }`}
              >
                Materials
              </button>
              <button
                onClick={() => setActiveTab('sizing')}
                className={`font-semibold transition-colors ${
                  activeTab === 'sizing' ? 'text-gold' : 'text-ivory/50 hover:text-ivory'
                }`}
              >
                Sizing & Fit
              </button>
            </div>

            <div className="text-xs text-ivory/60 leading-relaxed font-light min-h-[50px]">
              {activeTab === 'details' ? (
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>Thick 18k gold vermeil coating (2.5 microns) on recycled sterling silver.</li>
                  <li>Nickel-free and hypoallergenic for sensitive skin.</li>
                  <li>Meticulously hand-finished with signature high-gloss polish.</li>
                </ul>
              ) : (
                <p>
                  Fits comfortably for everyday wear. Standard sizing options. Easy slide-on closure
                  where applicable. If you are between sizes, we recommend selecting the smaller size
                  for a snug fit.
                </p>
              )}
            </div>
          </motion.div>

          {/* Brand highlights info */}
          <motion.div
            variants={textVariants}
            className="grid grid-cols-3 gap-2 bg-charcoal/20 border border-gold/5 p-4 rounded-sm"
          >
            <div className="flex flex-col items-center text-center gap-1.5">
              <Shield className="w-4 h-4 text-gold/80" />
              <span className="text-[8px] uppercase tracking-widest text-ivory/50 leading-tight">
                2-Year Warranty
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold/80" />
              <span className="text-[8px] uppercase tracking-widest text-ivory/50 leading-tight">
                Premium Box
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-gold/80" />
              <span className="text-[8px] uppercase tracking-widest text-ivory/50 leading-tight">
                Easy Returns
              </span>
            </div>
          </motion.div>

          {/* Interactive Add to Cart CTA with Quantity selector */}
          <motion.div variants={textVariants} className="mt-4 flex gap-3 items-center">
            <div className="flex items-center border border-gold/30 rounded-sm overflow-hidden bg-charcoal/40 h-12">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 text-gold hover:bg-gold/10 transition-colors h-full flex items-center justify-center font-bold text-sm"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-3 text-xs font-semibold text-ivory min-w-[28px] text-center select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 text-gold hover:bg-gold/10 transition-colors h-full flex items-center justify-center font-bold text-sm"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <motion.button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 relative flex items-center justify-center gap-3 px-6 h-12 bg-transparent border border-gold text-gold font-body text-xs font-semibold uppercase tracking-widest overflow-hidden rounded-sm hover:bg-gold hover:text-ink transition-colors duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag className="w-4 h-4 stroke-[2]" />
              <span>Add to Cart Collection</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Success Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 flex items-center gap-3 bg-wine border border-gold/30 px-6 py-4 rounded-sm shadow-2xl min-w-[320px]"
          >
            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Added to Bag</p>
              <p className="text-[11px] text-ivory/80 mt-0.5">{quantity}x {product.name} added successfully.</p>
            </div>
            <Link to="/cart" className="text-[10px] uppercase font-semibold text-gold underline tracking-wider ml-4">
              View Bag
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}