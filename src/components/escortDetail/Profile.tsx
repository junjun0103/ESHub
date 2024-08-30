import React from "react"
import type { Escort, Language } from "../../types"
import DetailPhotoGallery from "./DetailPhotoGallery"
import DetailedHeader from "./DetailedHeader"

interface ProfileProps {
  escort: Escort
}

const Profile: React.FC<ProfileProps> = ({ escort }) => {
  const renderInfoItem = (label: string, value: string | number | boolean) => (
    <div className="mb-4 bg-gray-800 bg-opacity-90 p-3 sm:p-4 rounded-lg">
      <p className="text-xs sm:text-sm text-gray-300 mb-1">{label}</p>
      <p className="text-base sm:text-lg text-accent-gold">{value}</p>
    </div>
  )

  const renderLanguageItem = (lang: Language) => (
    <div className="bg-gray-800 bg-opacity-90 p-3 sm:p-4 rounded-lg text-center">
      <p className="text-base sm:text-lg text-accent-gold">{lang.name}</p>
      <p className="text-xs sm:text-sm text-gray-300">{lang.level}</p>
    </div>
  )

  return (
    <div className="space-y-6 sm:space-y-8 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
      <section className="bg-gray-900 bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-lg">
        <DetailedHeader title="Personal Information" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
          {renderInfoItem("Escort Type", escort.escortType || "N/A")}
          {renderInfoItem("Service Type", escort.serviceType || "N/A")}
          {renderInfoItem("Age", escort.age)}
          {renderInfoItem("Location", `${escort.suburb}, ${escort.location}`)}
          {renderInfoItem("Ethnicity", escort.ethnicity || "N/A")}
          {renderInfoItem("Height", `${escort.height} cm`)}
          {renderInfoItem("Weight", `${escort.weight} kg`)}
          {renderInfoItem("Hair", `${escort.hairColor}, ${escort.hairLength}`)}
          {renderInfoItem("Bust Size", escort.bustSize || "N/A")}
          {renderInfoItem("Body Type", escort.bodyType || "N/A")}
          {renderInfoItem("Smoker", escort.smoker ? "Yes" : "No")}
          {renderInfoItem("Occupation", escort.occupation || "N/A")}
        </div>
      </section>

      <section className="bg-gray-900 bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-lg">
        <DetailedHeader title="Languages" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
          {escort.languages?.map((lang: Language, index: number) => (
            <React.Fragment key={index}>
              {renderLanguageItem(lang)}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section>
        <DetailedHeader title="Photo Gallery" />
        <div className="mt-3 sm:mt-4">
          <DetailPhotoGallery photos={escort.detailPhotos} />
        </div>
      </section>
    </div>
  )
}

export default Profile
