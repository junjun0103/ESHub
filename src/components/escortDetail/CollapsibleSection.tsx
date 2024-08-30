import type React from "react"
import { useState, forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CollapsibleSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  children: React.ReactNode
  initiallyOpen?: boolean
}

const CollapsibleSection = forwardRef<HTMLDivElement, CollapsibleSectionProps>(
  ({ title, children, initiallyOpen = true, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(initiallyOpen)

    return (
      <div ref={ref} {...props} className="mb-8">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left text-3xl font-serif mb-4 text-accent-gold flex justify-between items-center focus:outline-none"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {title}
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-accent-gold"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto", marginTop: "1rem" },
                collapsed: { opacity: 0, height: 0, marginTop: "0" },
              }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <div className="pl-4 border-l-2 border-accent-gold">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  },
)

CollapsibleSection.displayName = "CollapsibleSection"

export default CollapsibleSection
