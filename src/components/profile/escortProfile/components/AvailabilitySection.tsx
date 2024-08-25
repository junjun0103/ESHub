import type React from "react"
import type { TimeTable } from "../../../../types"

interface AvailabilitySectionProps {
  availability: string
  setAvailability: (availability: string) => void
  timeTable: TimeTable[]
  addTimeTable: () => void
  updateTimeTable: (
    index: number,
    field: "day" | "from" | "untill",
    value: string,
  ) => void
  removeTimeTable: (index: number) => void
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  availability,
  setAvailability,
  timeTable,
  updateTimeTable,
  removeTimeTable,
  addTimeTable,
}) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-300 mt-3">
        Description
      </label>
      <textarea
        id="availability"
        value={availability}
        onChange={e => setAvailability(e.target.value)}
        placeholder="MON 7AM to 7PM"
        rows={4}
        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
      />
      <table className="w-full mb-2 text-sm mt-3">
        <thead>
          <tr>
            <th className="text-left p-2 text-gray-300">Day</th>
            <th className="text-left p-2 text-gray-300">From</th>
            <th className="text-left p-2 text-gray-300">Untill</th>
            <th className="text-left p-2 text-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {timeTable.map((con, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="py-2">
                <select
                  value={con.day}
                  onChange={e => updateTimeTable(index, "day", e.target.value)}
                  className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </td>
              <td className="py-2">
                <input
                  type="text"
                  value={con.from}
                  onChange={e => updateTimeTable(index, "from", e.target.value)}
                  className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                />
              </td>
              <td className="py-2">
                <input
                  type="text"
                  value={con.untill}
                  onChange={e =>
                    updateTimeTable(index, "untill", e.target.value)
                  }
                  className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                />
              </td>
              <td className="py-2">
                <button
                  type="button"
                  onClick={() => removeTimeTable(index)}
                  className="text-red-400 hover:text-red-300 transition-colors p-1"
                  aria-label="Remove timeTable"
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
        onClick={addTimeTable}
        className="bg-accent-gold text-gray-900 px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
        disabled={timeTable.length >= 7}
      >
        Add TimeTable
      </button>
    </>
  )
}

export default AvailabilitySection
