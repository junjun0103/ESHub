import type React from "react"
import type { Escort } from "../../types"

interface Props {
  escort: Escort
}

const AboutMeSection: React.FC<Props> = ({ escort }) => {
  return (
    <section id="about" className="mb-20">
      <h2 className="vogue-heading text-4xl mb-8">About Me</h2>
      <p className="vogue-body text-lg">{escort.aboutMe}</p>
    </section>
  )
}

export default AboutMeSection
