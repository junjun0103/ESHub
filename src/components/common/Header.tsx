import type React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"

const Header: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()
  const { scrollY } = useScroll()

  const isEscortDetailPage = location.pathname.startsWith("/escort/")

  const headerHeight = useTransform(
    scrollY,
    [0, 100],
    [isExpanded ? "120px" : "80px", "80px"],
  )

  const logoSize = useTransform(
    scrollY,
    [0, 100],
    [isExpanded ? "48px" : "36px", "36px"],
  )

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setIsExpanded(false)
      } else {
        setIsExpanded(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <motion.header
      style={{ height: headerHeight }}
      className="fixed top-0 left-0 right-0 bg-secondary text-primary z-50 transition-all duration-300"
    >
      <div className="vogue-container h-full flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <motion.div
            style={{ fontSize: logoSize }}
            className="font-serif font-bold"
          >
            <Link to="/">VOGUE</Link>
          </motion.div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/login" className="hover:text-accent">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-accent">
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {isEscortDetailPage && isExpanded && (
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
        )}
      </div>
    </motion.header>
  )
}

export default Header
