import type React from "react"
import CollapsibleSection from "./CollapsibleSection"
import type { Escort } from "../../types"
import DetailedHeader from "./DetailedHeader"

interface ServicesProps {
  escort: Escort
}

const Services: React.FC<ServicesProps> = ({ escort }) => {
  const renderServiceList = (services: string[], title: string) => (
    <div className="bg-gray-700 p-4 rounded-md mb-4">
      <DetailedHeader title={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-700 p-4 rounded-md mb-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span className="text-white">{service}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const baseServices = escort.baseServices
  const extraServices = escort?.extraServices

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      {renderServiceList(baseServices, "Base Services")}

      {
        // Extra services
        extraServices && extraServices.length > 0 && (
          <>{renderServiceList(extraServices, "Extra Services")}</>
        )
      }
    </div>
  )
}

export default Services
