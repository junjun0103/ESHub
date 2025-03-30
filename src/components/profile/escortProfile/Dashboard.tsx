import type React from "react"
import { useState, useEffect } from "react"
import type { Escort, Story } from "../../../types"
import ProfileCompletion from "./ProfileCompletion"
import {
  ArrowsUpDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline"
import type { ProfileSection } from "../../../utils/profileHelper"
import {
  checkMandatoryFields,
  calculateCompletionPercentage,
  areMandatoryFieldsComplete,
  getIncompleteMandatorySections,
} from "../../../utils/profileHelper"
import { Switch } from "antd"

interface DashboardProps {
  stories: Story | null
  profile: Escort | null
  onUpdate: (updatedData: Partial<Escort>) => void
}

const Dashboard: React.FC<DashboardProps> = ({
  stories,
  profile,
  onUpdate,
}) => {
  const [profileSections, setProfileSections] = useState<ProfileSection[]>([])
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [isProfileActive, setIsProfileActive] = useState(
    profile?.isProfileActive || false,
  )
  const [isReviewActive, setIsReviewActive] = useState(
    profile?.isReviewActive || false,
  )

  useEffect(() => {
    if (profile) {
      const sections = checkMandatoryFields(stories, profile)
      setProfileSections(sections)
      setCompletionPercentage(calculateCompletionPercentage(sections))
    }
  }, [profile, stories])

  const handleToggle = (field: "isProfileActive" | "isReviewActive") => {
    if (areMandatoryFieldsComplete(profileSections)) {
      onUpdate({ [field]: !profile?.[field] })
      if (field === "isProfileActive") {
        setIsProfileActive(!isProfileActive)
      } else {
        setIsReviewActive(!isReviewActive)
      }
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
    <div className="vogue-container">
      <h2 className="vogue-heading text-2xl mb-6">Dashboard</h2>

      <ProfileCompletion
        profileSections={profileSections}
        completionPercentage={completionPercentage}
      />

      <div className="mt-8 space-y-6">
        <div>
          <h3 className="vogue-subheading mb-2">Profile Status</h3>
          <p className="text-sm mb-4">{renderEncouragement()}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">Profile Active Status</span>
              <InformationCircleIcon
                className="h-5 w-5 text-gray-400 cursor-help"
                title={
                  isProfileActive
                    ? "Your profile is active, so customers can see it."
                    : "Your profile is inactive, so customers cannot see it."
                }
              />
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <Switch
                checked={isProfileActive}
                onChange={() => handleToggle("isProfileActive")}
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">Reviews Active Status</span>
              <InformationCircleIcon
                className="h-5 w-5 text-gray-400 cursor-help"
                title={
                  isReviewActive
                    ? "Your review section is visible."
                    : "Your review section is hidden."
                }
              />
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <Switch
                checked={isReviewActive}
                onChange={() => handleToggle("isReviewActive")}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
