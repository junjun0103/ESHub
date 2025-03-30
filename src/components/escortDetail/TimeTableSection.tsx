import type React from "react"
import type { Escort, TimeTable } from "../../types"

interface TimeTableSectionProps {
  escort: Escort
}

const TimeTableSection: React.FC<TimeTableSectionProps> = ({ escort }) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  const getAvailabilityForDay = (day: string) => {
    const entry = escort?.timeTable?.find(
      t => t.day.toLowerCase() === day.toLowerCase(),
    )
    if (entry) {
      return `${entry.from} - ${entry.until}`
    }
    return "Unavailable"
  }

  return (
    <section id="time" className="mb-20">
      <h2 className="vogue-heading text-4xl mb-8">Availability</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Day
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Hours
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {daysOfWeek.map(day => (
              <tr key={day} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {day}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getAvailabilityForDay(day)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="vogue-body text-lg">{escort?.availability}</p>
    </section>
  )
}

export default TimeTableSection
