import type React from "react"
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline"

interface PreferencesSectionProps {
  favoritePosition: string
  setFavoritePosition: (value: string) => void
  oralPreference: string
  setOralPreference: (value: string) => void
  experiencePace: string
  setExperiencePace: (value: string) => void
  touchPreference: string
  setTouchPreference: (value: string) => void
  roleplayPreference: string
  setRoleplayPreference: (value: string) => void
  isPreferencesActive: boolean
  setIsPreferencesActive: (value: boolean) => void
}

const HighlightedText: React.FC<{ text: string }> = ({ text }) => (
  <span className="font-bold text-primary">{text}</span>
)

const PreferencesSection: React.FC<PreferencesSectionProps> = ({
  favoritePosition,
  setFavoritePosition,
  oralPreference,
  setOralPreference,
  experiencePace,
  setExperiencePace,
  touchPreference,
  setTouchPreference,
  roleplayPreference,
  setRoleplayPreference,
  isPreferencesActive,
  setIsPreferencesActive,
}) => {
  const renderPreference = (
    label: any,
    value: string,
    setValue: (value: string) => void,
    options: string[],
    placeholder: string,
  ) => (
    <div className="bg-gray-100 p-4 rounded-lg space-y-2">
      {label}
      <select
        value={options.includes(value) ? value : "other"}
        onChange={e => {
          if (e.target.value === "other") {
            setValue("")
          } else {
            setValue(e.target.value)
          }
        }}
        className="vogue-input w-full"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        <option value="other">Other</option>
      </select>
      {(!options.includes(value) || value === "") && (
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          className="vogue-input w-full mt-2"
        />
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="vogue-body mb-2">Active Status</h3>
        <button
          onClick={() => setIsPreferencesActive(!isPreferencesActive)}
          className={`vogue-button-secondary flex items-center ${
            isPreferencesActive ? "bg-accent text-white" : "bg-gray-200"
          }`}
        >
          <ArrowsRightLeftIcon className="h-5 w-5 mr-2" />
          {isPreferencesActive ? "Active" : "Inactive"}
        </button>
      </div>

      {isPreferencesActive && (
        <div className="space-y-4">
          {renderPreference(
            <label className="block text-sm font-medium text-gray-700">
              My favorite position is{" "}
              <HighlightedText text={favoritePosition} />.
            </label>,
            favoritePosition,
            setFavoritePosition,
            ["The back", "Missionary", "Cowgirl", "Spooning", "Standing"],
            "Specify your favorite position",
          )}

          {renderPreference(
            <span className="block text-sm font-medium text-gray-700">
              When it comes to oral, I prefer{" "}
              <HighlightedText text={oralPreference} />.
            </span>,
            oralPreference,
            setOralPreference,
            [
              "Giving oral",
              "Receiving oral",
              "Both giving and receiving oral",
              "Not a fan of oral",
            ],
            "Specify your oral preference",
          )}

          {renderPreference(
            <span className="block text-sm font-medium text-gray-700">
              My ideal pace for an experience is{" "}
              <HighlightedText text={experiencePace} />.
            </span>,
            experiencePace,
            setExperiencePace,
            [
              "Slow and sensual",
              "Intense and passionate",
              "A mix of slow and intense",
              "Playful and teasing",
            ],
            "Specify your preferred pace",
          )}

          {renderPreference(
            <span className="block text-sm font-medium text-gray-700">
              I enjoy <HighlightedText text={touchPreference} /> touch.
            </span>,
            touchPreference,
            setTouchPreference,
            [
              "Gently all over",
              "Firmly and passionately",
              "Light and teasing",
              "Sensually and slowly",
            ],
            "Specify your touch preference",
          )}

          {renderPreference(
            <span className="block text-sm font-medium text-gray-700">
              When it comes to roleplay, I prefer{" "}
              <HighlightedText text={roleplayPreference} />.
            </span>,
            roleplayPreference,
            setRoleplayPreference,
            ["Dominant", "Submissive", "Romantic", "Adventurous", "Playful"],
            "Specify your roleplay preference",
          )}
        </div>
      )}
    </div>
  )
}

export default PreferencesSection
