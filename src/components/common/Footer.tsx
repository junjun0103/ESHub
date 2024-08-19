import type React from "react"
import { Link } from "react-router-dom"

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <p>&copy; 2024 EscortHub. All rights reserved.</p>
          <div className="space-x-4">
            <Link to="/privacy" className="hover:text-accent-gold">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent-gold">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
