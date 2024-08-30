import { motion } from "framer-motion"
import type React from "react"
import type { Escort } from "../../types"

interface BookNowProps {
  escort: Escort
}

const BookNow: React.FC<BookNowProps> = ({ escort }) => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-serif mb-6 text-accent-gold">Book Now</h2>
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent-gold text-gray-900 px-8 py-3 rounded-full hover:bg-opacity-80 transition duration-300"
          >
            Message
          </motion.button>
        </div>
      </motion.section>
    </>
  )
}

export default BookNow
