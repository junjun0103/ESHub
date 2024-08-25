import type React from "react"
import type { Escort } from "../../types"
import DetailPhotoGallery from "./DetailPhotoGallery"

interface AboutMeProps {
  escort: Escort
}

const AboutMe: React.FC<AboutMeProps> = ({ escort }) => {
  const renderPreferences = () => {
    let sentence = "I'm all about creating unforgettable experiences. "

    if (escort.favoritePosition) {
      sentence += `The <span class="text-accent-gold font-semibold">${escort.favoritePosition}</span> position really gets me going. `
    }

    if (escort.oralPreference) {
      sentence += `When it comes to oral, I'm all about <span class="text-accent-gold font-semibold">${escort.oralPreference}</span>. `
    }

    if (escort.experiencePace) {
      sentence += `I love keeping things <span class="text-accent-gold font-semibold">${escort.experiencePace}</span>. `
    }

    if (escort.touchPreference) {
      sentence += `Nothing beats being touched <span class="text-accent-gold font-semibold">${escort.touchPreference}</span>. `
    }

    if (escort.roleplayPreference) {
      sentence += `Oh, and roleplay? <span class="text-accent-gold font-semibold">${escort.roleplayPreference}</span> is my jam. `
    }

    sentence += "Let's make some magic together."

    return sentence
  }

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="bg-gray-700 p-4 rounded-md mb-4">
          <p className="text-lg leading-relaxed text-white whitespace-pre-wrap">
            {escort.aboutMe}
          </p>
        </div>
        {/* Preferences */}
        {escort?.isPreferencesActive && (
          <div className="bg-gray-700 p-4 rounded-md">
            <div className="space-y-4">
              <p
                className="text-lg leading-relaxed text-white"
                dangerouslySetInnerHTML={{ __html: renderPreferences() }}
              />
            </div>
          </div>
        )}
      </div>
      {/* Selfie gallery */}
      {escort?.selfiePhotos && (
        <DetailPhotoGallery photos={escort?.selfiePhotos} />
      )}
    </>
  )
}

export default AboutMe
