import type React from "react"
import CollapsibleSection from "./CollapsibleSection"
import type { Escort, TimeTable } from "../../types"
import DetailedHeader from "./DetailedHeader"

interface AvailabilitySectionProps {
  escort: Escort
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  escort,
}) => {
  const renderTimeTable = (timeTable: TimeTable[]) => (
    <table className="w-full text-left">
      <thead>
        <tr className="bg-gray-700">
          <th className="p-2">Day</th>
          <th className="p-2">From</th>
          <th className="p-2">Until</th>
        </tr>
      </thead>
      <tbody>
        {timeTable.map((entry, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}
          >
            <td className="p-2">{entry.day}</td>
            <td className="p-2">{entry.from}</td>
            <td className="p-2">{entry.untill}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <div className="space-y-6">
        <div>
          <DetailedHeader title="Time Table" />
          {escort.timeTable && escort.timeTable.length > 0 ? (
            renderTimeTable(escort.timeTable)
          ) : (
            <p className="text-gray-400">No time table available.</p>
          )}
        </div>
        <div className="bg-gray-700 p-4 rounded-md mb-4">
          <p className="text-lg leading-relaxed text-white whitespace-pre-wrap">
            {escort.availability || "Not specified"}{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AvailabilitySection
