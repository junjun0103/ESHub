import type React from "react"
import type { Escort } from "../../types"

interface Props {
  escort: Escort
}

const SpecialEventSection: React.FC<Props> = ({ escort }) => {
  return (
    <div>
      {escort.isSpecialEventActive && (
        <section className="mb-20">
          <h2 className="text-4xl font-serif font-bold mb-8">Special Event</h2>
          <p className="text-lg leading-relaxed">{escort.eventDescription}</p>
        </section>
      )}{" "}
    </div>
  )
}

export default SpecialEventSection
