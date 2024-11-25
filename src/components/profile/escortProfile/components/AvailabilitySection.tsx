import type React from "react"
import { TrashIcon } from "@heroicons/react/24/outline"
import type { TimeTable } from "../../../../types"

interface AvailabilitySectionProps {
  availability: string
  setAvailability: (availability: string) => void
  timeTable: TimeTable[]
  updateTimeTable: (
    index: number,
    field: "day" | "from" | "until",
    value: string,
  ) => void
  resetTime: (index: number) => void
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  availability,
  setAvailability,
  timeTable,
  updateTimeTable,
  resetTime,
}) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  return (
    <div className="space-y-6">
      <div>
        <textarea
          id="availability"
          value={availability}
          onChange={e => setAvailability(e.target.value)}
          placeholder="e.g., MON 7AM to 7PM"
          rows={4}
          className="vogue-input w-full"
        />
      </div>

      <div>
        <h3 className="vogue-body mb-1">Time Table</h3>
        {days.map((slot, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span>{slot}</span>
              <button
                type="button"
                onClick={() => resetTime(index)}
                className="vogue-button-secondary p-2 ml-2"
                aria-label="Reset time"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex space-x-2">
              <input
                type="time"
                value={timeTable[index]?.from}
                onChange={e => updateTimeTable(index, "from", e.target.value)}
                className="vogue-input flex-grow"
                step={600}
              />
              <span className="flex items-center">to</span>
              <input
                type="time"
                value={timeTable[index]?.until}
                onChange={e => updateTimeTable(index, "until", e.target.value)}
                className="vogue-input flex-grow"
                step={600}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvailabilitySection
