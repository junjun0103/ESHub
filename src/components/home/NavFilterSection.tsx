import type React from "react"
import { motion } from "framer-motion"

const NavFilterSection: React.FC = () => {
  return (
    <nav className="sticky top-4 z-20 bg-gray-900 bg-opacity-90 p-4 rounded-lg shadow-lg mb-8">
      <ul className="flex justify-around">
        <li key={"location"}>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="text-accent-gold hover:text-white transition-colors cursor-pointer"
          >
            {"Location"}
          </motion.button>
        </li>
        <li key={"service"}>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="text-accent-gold hover:text-white transition-colors cursor-pointer"
          >
            {"Service Type"}
          </motion.button>
        </li>
        <li key={"sort"}>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="text-accent-gold hover:text-white transition-colors cursor-pointer"
          >
            {"Sort"}
          </motion.button>
        </li>
      </ul>
    </nav>
  )
}

export default NavFilterSection
