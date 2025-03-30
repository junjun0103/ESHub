import type React from "react"
import type { TimeTable } from "../../../../types"
import { TimePicker, Switch } from "antd"
import dayjs from "dayjs"

interface AvailabilitySectionProps {
  availability: string
  setAvailability: (availability: string) => void
  timeTable: TimeTable[]
  updateTimeTable: (
    index: number,
    field: "day" | "from" | "until",
    value: string,
    status?: boolean,
  ) => void
  updateTimeTableStatus: (index: number, status: boolean) => void
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  availability,
  setAvailability,
  timeTable,
  updateTimeTable,
  updateTimeTableStatus,
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
            <div className="flex">
              <span className="w-32">{slot}</span>
              <Switch
                className="w-10"
                checked={timeTable[index]?.status}
                onChange={status => {
                  updateTimeTableStatus(index, status)
                }}
              />
            </div>
            {timeTable[index]?.status && (
              <div className="flex space-x-2">
                <TimePicker
                  onChange={(_time, timeString) => {
                    updateTimeTable(index, "from", timeString.toString())
                  }}
                  defaultOpenValue={dayjs(
                    timeTable[index]?.from || "00:00",
                    "HH:mm",
                  )}
                  value={dayjs(timeTable[index]?.from || "00:00", "HH:mm")}
                  format="HH:mm"
                />
                <span className="flex items-center">to</span>
                <TimePicker
                  onChange={(_time, timeString) => {
                    updateTimeTable(index, "until", timeString.toString())
                  }}
                  defaultOpenValue={dayjs(
                    timeTable[index]?.until || "00:00",
                    "HH:mm",
                  )}
                  value={dayjs(timeTable[index]?.until || "00:00", "HH:mm")}
                  format="HH:mm"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvailabilitySection
