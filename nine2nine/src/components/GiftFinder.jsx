import { useState } from 'react'
import { products } from '../data/products.js'
import { useCart } from '../context/useCart.js'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, RefreshCw, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react'

export default function GiftFinder() {
  const { addItem } = useCart()
  const [step, setStep] = useState(0) // 0: Start, 1: Recipient, 2: Style, 3: Budget, 4: Results
  const [selections, setSelections] = useState({
    recipient: '',
    style: '',
    budget: '',
  })

  // Quiz Options
  const recipientOptions = [
    { label: 'A Special Partner', value: 'partner' },
    { label: 'A Close Friend or Family', value: 'friend' },
    { label: 'A Treat for Myself', value: 'self' },
  ]

  const styleOptions = [
    { label: 'Minimalist & Delicate', value: 'minimal', desc: 'Fine lines, subtle accents, everyday wear' },
    { label: 'Bold & Statement-making', value: 'bold', desc: 'Paperclips, chunky bangles, stand-out links' },
    { label: 'Organic & Modernist', value: 'organic', desc: 'Molten textures, hand-sculpted curves' },
  ]

  const budgetOptions = [
    { label: 'Everyday Luxury (Under ₹1,500)', value: 'low' },
    { label: 'Premium Statement (₹1,500 & Above)', value: 'high' },
  ]

  // Handle choice
  const selectOption = (field, value) => {
    setSelections((prev) => ({ ...prev, [field]: value }))
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => Math.max(0, prev - 1))
  }

  const handleStartOver = () => {
    setSelections({ recipient: '', style: '', budget: '' })
    setStep(1)
  }

  // Filter recommendations based on selections
  const getRecommendations = () => {
    return products.filter((p) => {
      // Budget matching
      const priceVal = p.price
      const budgetMatch = selections.budget === 'low' ? priceVal < 1500 : priceVal >= 1500

      // Style matching
      let styleMatch = false
      if (selections.style === 'minimal') {
        styleMatch = p.category === 'Necklaces' || p.category === 'Earrings'
      } else if (selections.style === 'bold') {
        styleMatch = p.category === 'Bracelets'
      } else if (selections.style === 'organic') {
        styleMatch = p.category === 'Rings'
      }

      return budgetMatch && styleMatch
    })
  }

  const recommendations = getRecommendations()

  // Transition variants
  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  }

  return (
    <div className="max-w-xl mx-auto glass-card rounded-sm p-6 sm:p-8 relative overflow-hidden bg-charcoal/50 border border-gold/15">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-wine/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6 text-center">
        <Sparkles className="w-4 h-4 text-gold" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
          Style Concierge
        </span>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <motion.div
            key="step-welcome"
            variants={slideVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="text-center space-y-6"
          >
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-ivory font-medium">
                Find Your Perfect Piece
              </h3>
              <p className="text-xs text-ivory/60 mt-2 font-light leading-relaxed max-w-sm mx-auto">
                Answer a few short styling questions, and our digital concierge will curate recommendations from the 929 jewelry catalog.
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="px-8 py-3 bg-gold text-ink font-body text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-gold-bright transition-colors"
            >
              Start Consultation
            </button>
          </motion.div>
        )}

        {/* Step 1: Recipient */}
        {step === 1 && (
          <motion.div
            key="step-recipient"
            variants={slideVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="space-y-5"
          >
            <h4 className="font-display text-xl text-ivory text-center font-medium">
              Who will be wearing this piece?
            </h4>
            <div className="flex flex-col gap-3">
              {recipientOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectOption('recipient', opt.value)}
                  className="w-full py-4 px-6 text-left border border-gold/15 bg-ink/20 hover:border-gold hover:bg-gold/5 transition-all text-xs font-medium uppercase tracking-widest text-ivory/80 rounded-sm"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] text-ivory/40 pt-4">
              <span>Step 1 of 3</span>
              <button onClick={handleBack} className="flex items-center gap-1 hover:text-gold">
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Style */}
        {step === 2 && (
          <motion.div
            key="step-style"
            variants={slideVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="space-y-5"
          >
            <h4 className="font-display text-xl text-ivory text-center font-medium">
              Choose their preferred aesthetic
            </h4>
            <div className="flex flex-col gap-3">
              {styleOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectOption('style', opt.value)}
                  className="w-full py-3.5 px-6 text-left border border-gold/15 bg-ink/20 hover:border-gold hover:bg-gold/5 transition-all rounded-sm flex flex-col gap-0.5"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-ivory/90">
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-ivory/50 font-light font-body">{opt.desc}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] text-ivory/40 pt-4">
              <span>Step 2 of 3</span>
              <button onClick={handleBack} className="flex items-center gap-1 hover:text-gold">
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <motion.div
            key="step-budget"
            variants={slideVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="space-y-5"
          >
            <h4 className="font-display text-xl text-ivory text-center font-medium">
              Select a price range
            </h4>
            <div className="flex flex-col gap-3">
              {budgetOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectOption('budget', opt.value)}
                  className="w-full py-4 px-6 text-left border border-gold/15 bg-ink/20 hover:border-gold hover:bg-gold/5 transition-all text-xs font-medium uppercase tracking-widest text-ivory/80 rounded-sm"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] text-ivory/40 pt-4">
              <span>Step 3 of 3</span>
              <button onClick={handleBack} className="flex items-center gap-1 hover:text-gold">
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <motion.div
            key="step-results"
            variants={slideVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center">
              <h4 className="font-display text-xl text-ivory font-medium">Your Recommendations</h4>
              <p className="text-[10px] uppercase text-gold tracking-widest mt-1">Curated selections</p>
            </div>

            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-gold/10 bg-black/10 rounded-sm items-center"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-sm border border-gold/5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase tracking-widest text-gold/70 font-medium">
                        {item.category}
                      </span>
                      <h5 className="font-display text-base text-ivory font-medium truncate mt-0.5">
                        {item.name}
                      </h5>
                      <p className="text-gold text-xs font-medium mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={() => addItem(item)}
                      className="p-3 bg-gold hover:bg-gold-bright text-ink rounded-sm transition-colors flex items-center justify-center flex-shrink-0"
                      aria-label="Add to bag"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-ivory/50 text-xs">
                No matching pieces found for this combination. Let's adjust parameters.
              </div>
            )}

            <div className="flex justify-center gap-4 pt-4 border-t border-gold/5">
              <button
                onClick={handleStartOver}
                className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-gold hover:text-gold-bright font-semibold py-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Start Over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
