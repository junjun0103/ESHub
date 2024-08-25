import type React from "react"

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
  return (
    <>
      {/* Favorite Position */}
      <div className="flex items-center justify-between relative">
        <span className="cursor-pointer">Preferences Active Status</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isPreferencesActive || false}
            onChange={() => setIsPreferencesActive(!isPreferencesActive)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
        </label>
      </div>
      {isPreferencesActive && (
        <>
          <div className="bg-gray-800 p-2 rounded-lg">
            <label
              htmlFor="favoritePosition"
              className="block text-md font-medium text-gray-300 ml-1"
            >
              Position: I love the{" "}
              <span className="font-bold text-accent-gold">
                {favoritePosition || "____"}
              </span>{" "}
              position.
            </label>
            <select
              id="favoritePosition"
              value={
                [
                  "The back",
                  "Missionary",
                  "Cowgirl",
                  "Spooning",
                  "Standing",
                ].includes(favoritePosition)
                  ? favoritePosition
                  : "other"
              }
              onChange={e => {
                const value = e.target.value
                if (value === "other") {
                  setFavoritePosition("") // Clear out if "Other" is selected for new input
                } else {
                  setFavoritePosition(value)
                }
              }}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
            >
              <option value="The back">The back</option>
              <option value="Missionary">Missionary</option>
              <option value="Cowgirl">Cowgirl</option>
              <option value="Spooning">Spooning</option>
              <option value="Standing">Standing</option>
              <option value="other">Other (Please specify)</option>
            </select>
            {(favoritePosition === "" ||
              ![
                "The back",
                "Missionary",
                "Cowgirl",
                "Spooning",
                "Standing",
              ].includes(favoritePosition)) && (
              <input
                type="text"
                value={favoritePosition}
                placeholder="Specify your favorite position"
                className="mt-2 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                onChange={e => setFavoritePosition(e.target.value)}
              />
            )}
          </div>

          {/* Oral Preference */}
          <div className="bg-gray-800 p-2 rounded-lg">
            <label
              htmlFor="oralPreference"
              className="block text-md font-medium text-gray-300 ml-1"
            >
              Oral:{" "}
              <span className="font-bold text-accent-gold">
                {oralPreference || "____"}
              </span>{" "}
              is my favorite.
            </label>
            <select
              id="oralPreference"
              value={
                [
                  "Giving oral",
                  "Receiving oral",
                  "Both giving and receiving oral",
                  "Not a fan of oral",
                ].includes(oralPreference)
                  ? oralPreference
                  : "other"
              }
              onChange={e => {
                const value = e.target.value
                if (value === "other") {
                  setOralPreference("") // Clear out if "Other" is selected for new input
                } else {
                  setOralPreference(value)
                }
              }}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
            >
              <option value="Giving oral">Giving oral</option>
              <option value="Receiving oral">Receiving oral</option>
              <option value="Both giving and receiving oral">
                Both giving and receiving oral
              </option>
              <option value="Not a fan of oral">Not a fan of oral</option>
              <option value="other">Other (Please specify)</option>
            </select>
            {(oralPreference === "" ||
              ![
                "Giving oral",
                "Receiving oral",
                "Both giving and receiving oral",
                "Not a fan of oral",
              ].includes(oralPreference)) && (
              <input
                type="text"
                value={oralPreference}
                placeholder="Specify your preference"
                className="mt-2 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                onChange={e => setOralPreference(e.target.value)}
              />
            )}
          </div>

          {/* Experience Pace */}
          <div className="bg-gray-800 p-2 rounded-lg">
            <label
              htmlFor="experiencePace"
              className="block text-md font-medium text-gray-300 ml-1"
            >
              Pace: I love it when things are{" "}
              <span className="font-bold text-accent-gold">
                {experiencePace || "____"}
              </span>
              .
            </label>
            <select
              id="experiencePace"
              value={
                [
                  "Slow and sensual",
                  "Intense and passionate",
                  "A mix of slow and intense",
                  "Playful and teasing",
                ].includes(experiencePace)
                  ? experiencePace
                  : "other"
              }
              onChange={e => {
                const value = e.target.value
                if (value === "other") {
                  setExperiencePace("") // Clear out if "Other" is selected for new input
                } else {
                  setExperiencePace(value)
                }
              }}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
            >
              <option value="Slow and sensual">Slow and sensual</option>
              <option value="Intense and passionate">
                Intense and passionate
              </option>
              <option value="A mix of slow and intense">
                A mix of slow and intense
              </option>
              <option value="Playful and teasing">Playful and teasing</option>
              <option value="other">Other (Please specify)</option>
            </select>
            {(experiencePace === "" ||
              ![
                "Slow and sensual",
                "Intense and passionate",
                "A mix of slow and intense",
                "Playful and teasing",
              ].includes(experiencePace)) && (
              <input
                type="text"
                value={experiencePace}
                placeholder="Specify your preferred pace"
                className="mt-2 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                onChange={e => setExperiencePace(e.target.value)}
              />
            )}
          </div>

          {/* Touch Preference */}
          <div className="bg-gray-800 p-2 rounded-lg">
            <label
              htmlFor="touchPreference"
              className="block text-md font-medium text-gray-300 ml-1"
            >
              Touch: I love being touched{" "}
              <span className="font-bold text-accent-gold">
                {touchPreference || "____"}
              </span>
              .
            </label>
            <select
              id="touchPreference"
              value={
                [
                  "Gently all over",
                  "Firmly and passionately",
                  "Light and teasing",
                  "Sensually and slowly",
                ].includes(touchPreference)
                  ? touchPreference
                  : "other"
              }
              onChange={e => {
                const value = e.target.value
                if (value === "other") {
                  setTouchPreference("") // Clear out if "Other" is selected for new input
                } else {
                  setTouchPreference(value)
                }
              }}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
            >
              <option value="Gently all over">Gently all over</option>
              <option value="Firmly and passionately">
                Firmly and passionately
              </option>
              <option value="Light and teasing">Light and teasing</option>
              <option value="Sensually and slowly">Sensually and slowly</option>
              <option value="other">Other (Please specify)</option>
            </select>
            {(touchPreference === "" ||
              ![
                "Gently all over",
                "Firmly and passionately",
                "Light and teasing",
                "Sensually and slowly",
              ].includes(touchPreference)) && (
              <input
                type="text"
                value={touchPreference}
                placeholder="Specify your touch preference"
                className="mt-2 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                onChange={e => setTouchPreference(e.target.value)}
              />
            )}
          </div>

          {/* Roleplay Preference */}
          <div className="bg-gray-800 p-2 rounded-lg">
            <label
              htmlFor="roleplayPreference"
              className="block text-md font-medium text-gray-300 ml-1"
            >
              Roleplay: I enjoy{" "}
              <span className="font-bold text-accent-gold">
                {roleplayPreference || "____"}
              </span>{" "}
              role-play.
            </label>
            <select
              id="roleplayPreference"
              value={
                [
                  "Dominant",
                  "Submissive",
                  "Romantic",
                  "Adventurous",
                  "Playful",
                ].includes(roleplayPreference)
                  ? roleplayPreference
                  : "other"
              }
              onChange={e => {
                const value = e.target.value
                if (value === "other") {
                  setRoleplayPreference("") // Clear out if "Other" is selected for new input
                } else {
                  setRoleplayPreference(value)
                }
              }}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
            >
              <option value="Dominant">Dominant</option>
              <option value="Submissive">Submissive</option>
              <option value="Romantic">Romantic</option>
              <option value="Adventurous">Adventurous</option>
              <option value="Playful">Playful</option>
              <option value="other">Other (Please specify)</option>
            </select>
            {(roleplayPreference === "" ||
              ![
                "Dominant",
                "Submissive",
                "Romantic",
                "Adventurous",
                "Playful",
              ].includes(roleplayPreference)) && (
              <input
                type="text"
                value={roleplayPreference}
                placeholder="Specify your roleplay preference"
                className="mt-2 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                onChange={e => setRoleplayPreference(e.target.value)}
              />
            )}
          </div>
        </>
      )}
    </>
  )
}

export default PreferencesSection
