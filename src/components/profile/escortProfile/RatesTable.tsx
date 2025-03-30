import type React from "react"
import { useState, useEffect } from "react"
import type { Escort } from "../../../types"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"

interface RatesTableProps {
  profile: Escort
  onUpdate: (updatedData: Partial<Escort>) => void
}

interface RatesEntry {
  duration: number
  incall: number
  outcall: number
  description: string
}

const RatesTable: React.FC<RatesTableProps> = ({ profile, onUpdate }) => {
  const [ratesTable, setRatesTable] = useState<RatesEntry[]>(
    profile?.ratesTable || [
      { duration: 60, incall: 0, outcall: 0, description: "" },
    ],
  )
  const [ratesDescription, setRatesDescription] = useState(
    profile?.ratesDescription || "",
  )

  useEffect(() => {
    if (profile?.ratesTable) {
      setRatesTable(profile.ratesTable)
    }
  }, [profile])

  const handleRatesChange = (
    index: number,
    field: keyof RatesEntry,
    value: string | number,
  ) => {
    const updatedTable = [...ratesTable]
    if (field === "duration" || field === "incall" || field === "outcall") {
      const numValue = Number(String(value).replace(/^0+/, ""))
      updatedTable[index][field] = numValue
    } else {
      updatedTable[index][field] = value as string
    }
    setRatesTable(updatedTable)
  }

  const addNewEntry = () => {
    setRatesTable([
      ...ratesTable,
      { duration: 0, incall: 0, outcall: 0, description: "" },
    ])
  }

  const removeEntry = (index: number) => {
    if (index === 0) {
      alert("You cannot remove the first entry as it is mandatory.")
      return
    }
    const updatedTable = ratesTable.filter((_, i) => i !== index)
    setRatesTable(updatedTable)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({ ratesTable, ratesDescription })
  }

  const getWordCount = (str: string) => {
    const trimmedStr = str.trim()
    return trimmedStr === "" ? 0 : trimmedStr.length
  }

  return (
    <div className="vogue-container">
      <h2 className="vogue-heading text-2xl mb-6">Your Rates</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {ratesTable.map((entry, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="vogue-subheading">Duration (minutes)</span>
              <input
                type="number"
                value={entry.duration}
                onChange={e =>
                  handleRatesChange(index, "duration", e.target.value)
                }
                className="vogue-input w-24 text-right"
                min="10"
                step="10"
                readOnly={index === 0}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="vogue-subheading">Incall</span>
              <input
                type="number"
                value={entry.incall}
                onChange={e =>
                  handleRatesChange(index, "incall", e.target.value)
                }
                className="vogue-input w-24 text-right"
                min="0"
                step="10"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="vogue-subheading">Outcall</span>
              <input
                type="number"
                value={entry.outcall}
                onChange={e =>
                  handleRatesChange(index, "outcall", e.target.value)
                }
                className="vogue-input w-24 text-right"
                min="0"
                step="10"
              />
            </div>
            <div>
              <span className="vogue-subheading">Description</span>
              <div className="relative mt-1">
                <input
                  type="text"
                  value={entry.description}
                  onChange={e => {
                    if (getWordCount(e.target.value) <= 15) {
                      handleRatesChange(index, "description", e.target.value)
                    }
                  }}
                  className="vogue-input w-full pr-16"
                  placeholder="Max 15 words"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
                  {getWordCount(entry.description)}/15
                </div>
              </div>
            </div>
            {index !== 0 && (
              <button
                type="button"
                onClick={() => removeEntry(index)}
                className="vogue-button-secondary w-full flex items-center justify-center"
                aria-label="Remove rates"
              >
                <TrashIcon className="h-5 w-5 mr-2" />
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addNewEntry}
          className="vogue-button w-full flex items-center justify-center"
          disabled={ratesTable.length >= 10}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Entry
        </button>
        <div>
          <label
            htmlFor="ratesDescription"
            className="vogue-subheading block mb-2"
          >
            Description
          </label>
          <textarea
            id="ratesDescription"
            value={ratesDescription}
            onChange={e => setRatesDescription(e.target.value)}
            rows={4}
            className="vogue-input w-full"
          />
        </div>
        <button type="submit" className="vogue-button w-full">
          Save Rates
        </button>
      </form>
    </div>
  )
}

export default RatesTable
