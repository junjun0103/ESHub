import type React from "react"
import type { Escort } from "../../types"

interface props {
  escort: Escort
}

const RateSection: React.FC<props> = ({ escort }) => {
  return (
    <section id="rates" className="mb-20">
      <h2 className="vogue-heading text-4xl mb-8">Rates</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="vogue-subheading pb-4 text-lg">Duration</th>
              <th className="vogue-subheading pb-4 text-lg">Incall</th>
              <th className="vogue-subheading pb-4 text-lg">Outcall</th>
            </tr>
          </thead>
          <tbody>
            {escort.ratesTable?.map((rate, index) => (
              <tr key={index} className="border-b">
                <td className="vogue-body py-4">{rate.duration} min</td>
                <td className="vogue-body py-4">${rate.incall}</td>
                <td className="vogue-body py-4">${rate.outcall}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="vogue-body text-lg">{escort.ratesDescription}</p>
    </section>
  )
}

export default RateSection
