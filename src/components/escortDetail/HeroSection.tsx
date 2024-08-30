import type React from "react"
import { motion } from "framer-motion"
import type { Escort } from "../../types"
import FavLikeShareComponent from "./FavLikeShareComponent"
import { useMemo } from "react"

interface HeroSectionProps {
  escort: Escort
}

const scrollPhrases = [
  "Dive deeper, discover more.",
  "Unveil my hidden secrets.",
  "Touch me slowly, uncover more.",
  "Feel every inch as you explore.",
  "Curiosity leads you further.",
  "Gently glide, find the warmth.",
  "Lose yourself in my depths.",
  "Every scroll teases what's next.",
  "Seek out my hidden pleasures.",
  "Explore me, one touch at a time.",
]

const HeroSection: React.FC<HeroSectionProps> = ({ escort }) => {
  const randomScrollPhrase = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * scrollPhrases.length)
    return scrollPhrases[randomIndex]
  }, [])

  return (
    <div className="relative h-screen">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      <motion.div
        className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-serif mb-4 text-white text-shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {escort.greeting}
        </motion.h2>

        <motion.h1
          className="text-5xl md:text-6xl font-serif mb-6 text-accent-gold text-shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-3xl md:text-4xl text-white">I'm </span>
          {escort.name}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-white text-shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="text-accent-gold">{escort.age}</span>
          <span> years old • </span>
          <span>
            {escort.suburb}, {escort.location}
          </span>
        </motion.p>

        <motion.div
          className="absolute bottom-10 left-0 right-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-white text-shadow-sm text-sm md:text-base">
            {randomScrollPhrase}
          </p>
          <motion.div
            className="mt-2 text-accent-gold text-2xl text-shadow-md"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓
          </motion.div>
        </motion.div>
        <FavLikeShareComponent escort={escort} />
      </motion.div>
    </div>
  )
}

export default HeroSection
