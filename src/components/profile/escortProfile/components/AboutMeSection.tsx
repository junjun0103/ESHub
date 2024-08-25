import type React from "react"

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
    <>
      <label
        htmlFor="aboutMe"
        className="block text-sm font-medium text-gray-300"
      >
        About Me
      </label>
      <textarea
        id="aboutMe"
        value={aboutMe}
        onChange={e => setAboutMe(e.target.value)}
        rows={4}
        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
      />
      <table className="w-full mb-2 text-sm mt-3">
        <thead>
          <tr>
            <th className="text-left p-2 text-gray-300">Contact</th>
            <th className="text-left p-2 text-gray-300">Detail</th>
            <th className="text-left p-2 text-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((con, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="py-2">
                <select
                  value={con.name}
                  onChange={e => updateContact(index, "name", e.target.value)}
                  className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                >
                  <option value="SMS">SMS(Mobile)</option>
                  <option value="Email">Email</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Instagram">Instagram</option>
                  <option value="WeChat">WeChat</option>
                  <option value="WEB">WEB</option>
                </select>
              </td>
              <td className="py-2">
                <input
                  type="text"
                  value={con.detail}
                  onChange={e => updateContact(index, "detail", e.target.value)}
                  className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                />
              </td>
              <td className="py-2">
                <button
                  type="button"
                  onClick={() => removeContact(index)}
                  className="text-red-400 hover:text-red-300 transition-colors p-1"
                  aria-label="Remove contact"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={addContact}
        className="bg-accent-gold text-gray-900 px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
        disabled={contacts.length >= 5}
      >
        Add Contact
      </button>
    </>
  )
}

export default AboutMeSection
