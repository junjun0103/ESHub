import { motion } from "framer-motion"
import type React from "react"

const HeaderEscortDetailNav: React.FC = () => {
  return (
    <div>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mt-2"
      >
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="#about" className="hover:text-accent">
              About
            </a>
          </li>
          <li>
            <a href="#gallery" className="hover:text-accent">
              Gallery
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-accent">
              Services
            </a>
          </li>
          <li>
            <a href="#rates" className="hover:text-accent">
              Rates
            </a>
          </li>
        </ul>
      </motion.nav>
    </div>
  )
}

export default HeaderEscortDetailNav
