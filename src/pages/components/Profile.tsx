import type React from "react"
import type { Escort, Language } from "../../types"
import DetailPhotoGallery from "./DetailPhotoGallery"
import DetailedHeader from "./DetailedHeader"

interface ProfileProps {
  escort: Escort
}

const Profile: React.FC<ProfileProps> = ({ escort }) => {
  const renderInfoItem = (label: string, value: string | number | boolean) => (
    <div className="mb-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl  text-accent-gold">{value}</p>
    </div>
  )

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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

        <div className="mt-8">
          <DetailedHeader title="Languages" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {escort.languages?.map((lang: Language, index: number) => (
              <div key={index} className="text-center">
                <p className="text-lg font-semibold">{lang.name}</p>
                <p className="text-sm text-gray-400">{lang.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DetailPhotoGallery photos={escort.detailPhotos} />
    </>
  )
}

export default Profile
