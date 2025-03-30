import type React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white mt-auto shadow-md">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-accent-gold">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                EscortHub
              </motion.span>
            </Link>
            <p className="mt-2 text-sm text-gray-300">
              &copy; 2024 EscortHub. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <Link
    to={to}
    className="hover:text-accent-gold transition-colors duration-200"
  >
    <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {children}
    </motion.span>
  </Link>
)

export default Footer
