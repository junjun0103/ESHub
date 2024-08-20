import type React from "react"
import { useState, useEffect } from "react"
import type { Escort, Story } from "../../../types"
import ProfileCompletion from "./ProfileCompletion"
import {
  checkMandatoryFields,
  calculateCompletionPercentage,
  areMandatoryFieldsComplete,
  getIncompleteMandatorySections,
} from "../../../utils/profileHelper"

interface DashboardProps {
  stories: Story[]
  profile: Escort | null
  onUpdate: (updatedData: Partial<Escort>) => void
}

interface ProfileSection {
  name: string
  isComplete: boolean
  isMandatory: boolean
}

const Dashboard: React.FC<DashboardProps> = ({
  stories,
  profile,
  onUpdate,
}) => {
  const [hoveredOption, setHoveredOption] = useState("")
  const [profileSections, setProfileSections] = useState<ProfileSection[]>([])
  const [completionPercentage, setCompletionPercentage] = useState(0)

  useEffect(() => {
    if (profile) {
      const sections = checkMandatoryFields(stories, profile)
      setProfileSections(sections)
      setCompletionPercentage(calculateCompletionPercentage(sections))
    }
  }, [profile])

  const handleMouseEnter = (option: string) => {
    setHoveredOption(option)
  }

  const handleMouseLeave = () => {
    setHoveredOption("")
  }

  const handleToggle = (field: "isProfileActive" | "isReviewActive") => {
    if (areMandatoryFieldsComplete(profileSections)) {
      onUpdate({ [field]: !profile?.[field] })
    } else {
      alert(
        "Please complete all mandatory sections before activating your profile.",
      )
    }
  }

  const renderEncouragement = () => {
    if (completionPercentage === 100) {
      return "Congratulations! Your profile is 100% complete. You're all set to attract more clients!"
    } else if (areMandatoryFieldsComplete(profileSections)) {
      return `Your profile is ${completionPercentage}% complete. You can now activate your profile to be visible to clients. Consider completing the remaining sections to make your profile even more attractive!`
    } else {
      const incompleteSections =
        getIncompleteMandatorySections(profileSections).join(", ")
      return `Your profile is ${completionPercentage}% complete. To activate your profile, please complete the following mandatory sections: ${incompleteSections}. This will allow clients to see your profile!`
    }
  }

  return (
    <div className="space-y-8 bg-gray-900 text-white p-4 sm:p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Dashboard</h2>

      <ProfileCompletion
        profileSections={profileSections}
        completionPercentage={completionPercentage}
      />

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-bold mb-4 text-accent-gold">
          Profile Status
        </h3>
        <p className="mb-4">{renderEncouragement()}</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between relative">
            <span
              onMouseEnter={() => handleMouseEnter("isProfileActive")}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer"
            >
              Profile Active Status
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={profile?.isProfileActive || false}
                onChange={() => handleToggle("isProfileActive")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
            </label>
            {hoveredOption === "isProfileActive" && (
              <div className="absolute top-8 left-0 bg-gray-700 text-white text-sm p-2 rounded z-10">
                {profile?.isProfileActive
                  ? "Your profile is active, so customers can see it."
                  : "Your profile is inactive, so customers cannot see it."}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between relative">
            <span
              onMouseEnter={() => handleMouseEnter("isReviewActive")}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer"
            >
              Reviews Active Status
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={profile?.isReviewActive || false}
                onChange={() => handleToggle("isReviewActive")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
            </label>
            {hoveredOption === "isReviewActive" && (
              <div className="absolute top-8 left-0 bg-gray-700 text-white text-sm p-2 rounded z-10">
                {profile?.isReviewActive
                  ? "Your review section is visible."
                  : "Your review section is hidden."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
