import type React from "react"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"

interface AboutMeSectionProps {
  aboutMe: string
  setAboutMe: (aboutMe: string) => void
  contacts: { name: string; detail: string }[]
  addContact: () => void
  updateContact: (
    index: number,
    field: "name" | "detail",
    value: string,
  ) => void
  removeContact: (index: number) => void
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({
  aboutMe,
  setAboutMe,
  contacts,
  updateContact,
  removeContact,
  addContact,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <textarea
          id="aboutMe"
          value={aboutMe}
          onChange={e => setAboutMe(e.target.value)}
          rows={4}
          className="vogue-input w-full"
          placeholder="Tell clients about yourself..."
        />
      </div>

      <div>
        <h3 className="vogue-body mb-2">Contact Information</h3>
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2"
            >
              <select
                value={contact.name}
                onChange={e => updateContact(index, "name", e.target.value)}
                className="vogue-input flex-grow"
              >
                <option value="SMS">SMS (Mobile)</option>
                <option value="Email">Email</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Telegram">Telegram</option>
                <option value="Instagram">Instagram</option>
                <option value="WeChat">WeChat</option>
                <option value="WEB">Website</option>
              </select>
              <input
                type="text"
                value={contact.detail}
                onChange={e => updateContact(index, "detail", e.target.value)}
                className="vogue-input flex-grow"
                placeholder="Contact details"
              />
              <button
                type="button"
                onClick={() => removeContact(index)}
                className="vogue-button-secondary p-2"
                aria-label="Remove contact"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addContact}
          className="vogue-button mt-4 flex items-center justify-center w-full sm:w-auto"
          disabled={contacts.length >= 5}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Contact
        </button>
      </div>
    </div>
  )
}

export default AboutMeSection
