import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectUser, setUser } from "../../features/user/userSlice"
import { logOut } from "../../utils/firebase"
import {
  HomeIcon,
  UserIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/solid"

const Header: React.FC = () => {
  const currentUser = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setIsScrolled(true)
      } else if (currentScrollY === 0) {
        setIsScrolled(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    await logOut()
    dispatch(setUser(null))
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`bg-gray-800 text-white shadow-md fixed top-0 left-0 right-0 z-50 bg-opacity-80 transition-all duration-300 ${
        isScrolled ? "py-1" : "py-3"
      }`}
    >
      <nav
        className={`px-4 flex justify-between items-center ${isScrolled ? "w-full mr-1 ml-1" : "container mx-auto"}`}
      >
        <Link
          to="/"
          className={`font-bold text-accent-gold transition-all duration-300 ${
            isScrolled ? "text-lg" : "text-2xl"
          }`}
        >
          <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            EscortHub
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {isScrolled ? (
            <>
              <NavIconLink to="/" icon={<HomeIcon className="w-5 h-5" />} />
              {currentUser ? (
                <>
                  <NavIconLink
                    to="/profile"
                    icon={<UserIcon className="w-5 h-5" />}
                  />
                  <button onClick={handleSignOut} className="nav-link">
                    <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <NavIconLink
                  to="/signin"
                  icon={<ArrowLeftEndOnRectangleIcon className="w-5 h-5" />}
                />
              )}
            </>
          ) : (
            <>
              <NavLink to="/">Home</NavLink>
              {currentUser ? (
                <>
                  <NavLink to="/profile">My Profile</NavLink>
                  <button onClick={handleSignOut} className="nav-link">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/signin">Sign In</NavLink>
                  <NavLink to="/signup">Sign Up</NavLink>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-primary md:hidden">
            <div className="flex flex-col items-center py-4 space-y-4">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
              {currentUser ? (
                <>
                  <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                    My Profile
                  </NavLink>
                  <button onClick={handleSignOut} className="nav-link">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/signin" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </NavLink>
                  <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

const NavLink: React.FC<{
  to: string
  children: React.ReactNode
  onClick?: () => void
}> = ({ to, children, onClick }) => (
  <Link to={to} className="nav-link" onClick={onClick}>
    <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {children}
    </motion.span>
  </Link>
)

const NavIconLink: React.FC<{
  to: string
  icon: React.ReactNode
  onClick?: () => void
}> = ({ to, icon, onClick }) => (
  <Link to={to} className="nav-link" onClick={onClick}>
    <motion.span whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
      {icon}
    </motion.span>
  </Link>
)

export default Header
