import type React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectUser, setUser } from "../../features/user/userSlice"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/config"
import HeaderEscortDetailNav from "./HeaderEscortDetailNav"

const Header: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { scrollY } = useScroll()

  const user = useAppSelector(selectUser)

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

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(setUser(null))
      navigate("/")
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

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
              {user ? (
                <>
                  <li>
                    <Link to="/profile" className="hover:text-accent">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:text-accent"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </nav>
        </div>
        {isEscortDetailPage && isExpanded && <HeaderEscortDetailNav />}
      </div>
    </motion.header>
  )
}

export default Header
