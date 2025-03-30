import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import type { Escort } from "../../types"

interface EscortCardProps {
  escort: Escort
  premium: boolean
}

const EscortCard: React.FC<EscortCardProps> = ({ escort, premium }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    if (premium) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex(
          prevIndex => (prevIndex + 1) % escort.profilePhotos.length,
        )
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [premium, escort.profilePhotos.length])

  return (
    <Link to={`/escort/${escort.id}`} className="block">
      <div
        className={`bg-white shadow-md rounded-sm overflow-hidden ${premium ? "w-64 flex-shrink-0" : "w-full"}`}
      >
        <div className="relative pb-[133%]">
          <img
            src={escort.profilePhotos[currentPhotoIndex]}
            alt={escort.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{escort.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {escort.age} years • {escort.suburb}
          </p>
          <p className="text-sm font-semibold">
            ${escort.ratesTable?.[0]?.incall}/hr
          </p>
        </div>
      </div>
    </Link>
  )
}

export default EscortCard
