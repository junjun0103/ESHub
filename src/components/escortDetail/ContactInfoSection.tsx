import type React from "react"
import type { Escort } from "../../types"

interface Props {
  escort: Escort
}

const ContactInfoSection: React.FC<Props> = ({ escort }) => {
  return (
    <section className="mb-20">
      <h2 className="text-4xl font-serif font-bold mb-8">Contact</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {escort.contacts.map((contact, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b py-4"
          >
            <span className="font-bold">{contact.name}:</span>
            <span>{contact.detail}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ContactInfoSection
