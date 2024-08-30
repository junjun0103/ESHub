import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const DynamicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
      "linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%)",
    ],
  )

  const patternOpacity = useTransform(scrollYProgress, [0, 1], [0.03, 0.08])

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[-1]"
      style={{ background: backgroundColor }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ opacity: patternOpacity }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern
              id="subtle-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="#000" fillOpacity="0.2" />
              <circle cx="0" cy="0" r="1" fill="#000" fillOpacity="0.2" />
              <circle cx="40" cy="0" r="1" fill="#000" fillOpacity="0.2" />
              <circle cx="0" cy="40" r="1" fill="#000" fillOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#subtle-pattern)" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default DynamicBackground
