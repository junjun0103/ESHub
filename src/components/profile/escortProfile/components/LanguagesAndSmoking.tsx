import type React from "react"
import type { Language } from "../../../../types"

interface PreferencesSectionProps {
  languages: Language[]
  updateLanguage: (
    index: number,
    field: "name" | "level",
    value: string,
  ) => void
  removeLanguage: (index: number) => void
  addLanguage: () => void
  smoker: boolean
  setSmoker: (smoker: boolean) => void
}

const LanguagesAndSmoking: React.FC<PreferencesSectionProps> = ({
  languages,
  smoker,
  updateLanguage,
  removeLanguage,
  addLanguage,
  setSmoker,
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Languages
        </label>
        <table className="w-full mb-2 text-sm">
          <thead>
            <tr>
              <th className="text-left p-2 text-gray-300">Language</th>
              <th className="text-left p-2 text-gray-300">Proficiency</th>
              <th className="text-left p-2 text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-2">
                  <input
                    type="text"
                    value={lang.name}
                    onChange={e =>
                      updateLanguage(index, "name", e.target.value)
                    }
                    className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                  />
                </td>
                <td className="py-2">
                  <select
                    value={lang.level}
                    onChange={e =>
                      updateLanguage(index, "level", e.target.value)
                    }
                    className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </select>
                </td>
                <td className="py-2">
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                    aria-label="Remove language"
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
          onClick={addLanguage}
          className="bg-accent-gold text-gray-900 px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
          disabled={languages.length >= 5}
        >
          Add Language
        </button>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={smoker}
            onChange={e => setSmoker(e.target.checked)}
            className="rounded border-gray-700 text-accent-gold focus:ring-accent-gold h-4 w-4"
          />
          <span className="ml-2 text-sm text-gray-300">Smoker</span>
        </label>
      </div>
    </>
  )
}

export default LanguagesAndSmoking
