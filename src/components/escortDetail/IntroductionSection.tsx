import type React from "react"
import { motion } from "framer-motion"
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline"
import type { Escort } from "../../types"

interface IntroductionSectionProps {
  escort: Escort
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({
  escort,
}) => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-secondary">
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <motion.img
        src={escort.profilePhotos[0]}
        alt={escort.name}
        className="absolute inset-0 w-full h-full object-cover object-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      <div className="absolute inset-0 flex items-end p-8">
        <div className="max-w-4xl mx-auto w-full text-secondary">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif font-bold mb-4 leading-none">
            {escort.name}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 font-light max-w-2xl">
            {`${escort.greeting}, I'm ${escort.age} years old, ${escort.suburb}, ${escort.location}`}
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-secondary text-primary px-6 py-3 text-sm uppercase tracking-wider hover:bg-opacity-90 transition-all">
              Favorite
            </button>
            <button className="bg-secondary text-primary px-6 py-3 text-sm uppercase tracking-wider hover:bg-opacity-90 transition-all">
              {escort.likes} Likes
            </button>
            <button className="bg-secondary text-primary px-6 py-3 text-sm uppercase tracking-wider hover:bg-opacity-90 transition-all">
              Share
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroductionSection
