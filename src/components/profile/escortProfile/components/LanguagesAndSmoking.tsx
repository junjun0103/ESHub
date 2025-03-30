import type React from "react"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import type { Language } from "../../../../types"

interface LanguagesAndSmokingProps {
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

const LanguagesAndSmoking: React.FC<LanguagesAndSmokingProps> = ({
  languages,
  smoker,
  updateLanguage,
  removeLanguage,
  addLanguage,
  setSmoker,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="space-y-4">
          {languages.map((lang, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={lang.name}
                  onChange={e => updateLanguage(index, "name", e.target.value)}
                  className="vogue-input flex-grow"
                  placeholder="Language name"
                />
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="vogue-button-secondary p-2 ml-2"
                  aria-label="Remove language"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              <select
                value={lang.level}
                onChange={e => updateLanguage(index, "level", e.target.value)}
                className="vogue-input w-full"
              >
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
              </select>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addLanguage}
          className="vogue-button mt-4 flex items-center justify-center w-full sm:w-auto"
          disabled={languages.length >= 5}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Language
        </button>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="smoker"
          checked={smoker}
          onChange={e => setSmoker(e.target.checked)}
          className="vogue-checkbox"
        />
        <label htmlFor="smoker" className="ml-2 text-sm">
          Smoker
        </label>
      </div>
    </div>
  )
}

export default LanguagesAndSmoking
