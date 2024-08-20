import type React from "react"
import type { ProfileSection } from "../../../utils/profileHelper"

interface ProfileCompletionProps {
  profileSections: ProfileSection[]
  completionPercentage: number
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({
  profileSections,
  completionPercentage,
}) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Profile Completion</h2>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span>Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-accent-gold h-2.5 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      <ul className="space-y-2">
        {profileSections.map((section, index) => (
          <li key={index} className="flex items-center">
            {section.isComplete ? (
              <svg
                className="w-5 h-5 text-green-500 mr-2"
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
            ) : (
              <svg
                className="w-5 h-5 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            )}
            <span
              className={section.isComplete ? "text-green-500" : "text-red-500"}
            >
              {section.name} {section.isMandatory ? "*" : ""}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-gray-400">* Mandatory sections</p>
    </div>
  )
}

export default ProfileCompletion
