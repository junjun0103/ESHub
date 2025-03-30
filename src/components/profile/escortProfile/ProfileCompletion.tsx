import type React from "react"
import type { ProfileSection } from "../../../utils/profileHelper"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid"

interface ProfileCompletionProps {
  profileSections: ProfileSection[]
  completionPercentage: number
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({
  profileSections,
  completionPercentage,
}) => {
  return (
    <div className="vogue-container">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="vogue-subheading">Progress</span>
          <span className="text-accent font-bold">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      <ul className="space-y-3">
        {profileSections.map((section, index) => (
          <li key={index} className="flex items-center">
            {section.isComplete ? (
              <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
            ) : (
              <XMarkIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
            )}
            <span
              className={`text-sm ${section.isComplete ? "text-green-500" : "text-red-500"}`}
            >
              {section.name}{" "}
              {section.isMandatory && <span className="text-accent">*</span>}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-gray-500">* Mandatory sections</p>
    </div>
  )
}

export default ProfileCompletion
