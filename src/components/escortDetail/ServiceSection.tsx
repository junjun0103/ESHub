import type React from "react"
import type { Escort } from "../../types"

interface Props {
  escort: Escort
}

const ServiceSection: React.FC<Props> = ({ escort }) => {
  return (
    <section id="services" className="mb-20">
      <h2 className="vogue-heading text-4xl mb-8">Services</h2>
      <div className="vogue-grid">
        <div>
          <h3 className="vogue-subheading text-2xl mb-4">Base Services</h3>
          <ul className="vogue-body list-disc list-inside">
            {escort.baseServices.map((service, index) => (
              <li key={index} className="mb-2">
                {service}
              </li>
            ))}
          </ul>
        </div>
        {escort.extraServices && (
          <div>
            <h3 className="vogue-subheading text-2xl mb-4">Extra Services</h3>
            <ul className="vogue-body list-disc list-inside">
              {escort.extraServices.map((service, index) => (
                <li key={index} className="mb-2">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default ServiceSection
