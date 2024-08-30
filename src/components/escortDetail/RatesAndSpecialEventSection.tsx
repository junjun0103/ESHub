import type React from "react"
import type { Escort, RatesEntry } from "../../types"
import DetailedHeader from "./DetailedHeader"

interface RateAndSpecialEventSectionProps {
  escort: Escort
}

const RateAndSpecialEventSection: React.FC<RateAndSpecialEventSectionProps> = ({
  escort,
}) => {
  const renderRatesTable = (ratesTable: RatesEntry[]) => (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">Duration</th>
            <th className="p-2">Incall</th>
            <th className="p-2">Outcall</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {ratesTable.map((entry, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}
            >
              <td className="p-2">{entry.duration} min</td>
              <td className="p-2">${entry.incall}</td>
              <td className="p-2">${entry.outcall}</td>
              <td className="p-2">{entry.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <DetailedHeader title="Rates" />
      <div className="space-y-6">
        <div>
          {escort.ratesTable && escort.ratesTable.length > 0 ? (
            renderRatesTable(escort.ratesTable)
          ) : (
            <p className="text-gray-400">No rate table available.</p>
          )}
        </div>
        {escort?.ratesDescription && (
          <div>
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-white whitespace-pre-wrap">
                {escort.ratesDescription}
              </p>
            </div>
          </div>
        )}

        {escort.isSpecialEventActive && (
          <div>
            <DetailedHeader title="Special Event" />
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-white whitespace-pre-wrap">
                {escort.eventDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RateAndSpecialEventSection
