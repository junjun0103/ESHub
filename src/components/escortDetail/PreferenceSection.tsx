import type React from "react"
import type { Escort } from "../../types"

interface PreferenceSectionProps {
  escort: Escort
}

const PreferenceSection: React.FC<PreferenceSectionProps> = ({ escort }) => {
  if (!escort.isPreferencesActive) {
    return null
  }

  const HighlightedText: React.FC<{ text: string }> = ({ text }) => (
    <span className="font-bold text-primary">{text}</span>
  )

  return (
    <section className="mb-20">
      <h2 className="vogue-heading text-4xl mb-8">My Preferences</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <ul className="space-y-4">
          {escort?.preferences?.favoritePosition && (
            <li className="flex items-center">
              <span className="mr-2 text-2xl">🌟</span>
              <span>
                My favorite position is{" "}
                <HighlightedText text={escort?.preferences?.favoritePosition} />
                .
              </span>
            </li>
          )}
          {escort?.preferences?.oralPreference && (
            <li className="flex items-center">
              <span className="mr-2 text-2xl">👄</span>
              <span>
                When it comes to oral, I prefer{" "}
                <HighlightedText text={escort?.preferences?.oralPreference} />.
              </span>
            </li>
          )}
          {escort?.preferences?.experiencePace && (
            <li className="flex items-center">
              <span className="mr-2 text-2xl">⏱️</span>
              <span>
                My ideal pace for an experience is{" "}
                <HighlightedText text={escort?.preferences?.experiencePace} />.
              </span>
            </li>
          )}
          {escort?.preferences?.touchPreference && (
            <li className="flex items-center">
              <span className="mr-2 text-2xl">🤗</span>
              <span>
                I enjoy{" "}
                <HighlightedText text={escort?.preferences?.touchPreference} />{" "}
                touch.
              </span>
            </li>
          )}
          {escort?.preferences?.roleplayPreference && (
            <li className="flex items-center">
              <span className="mr-2 text-2xl">🎭</span>
              <span>
                When it comes to roleplay, I prefer{" "}
                <HighlightedText
                  text={escort?.preferences?.roleplayPreference}
                />
                .
              </span>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}

export default PreferenceSection
