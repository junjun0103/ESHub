import type React from "react"
import type { Escort, Language } from "../../types"

interface DetailInfoSectionProps {
  escort: Escort
}

const DetailInfoSection: React.FC<DetailInfoSectionProps> = ({ escort }) => {
  const formatLanguages = (languages: Language[] | undefined) => {
    return languages?.map(lang => `${lang.name} (${lang.level})`).join(", ")
  }

  const formatVerificationStatus = (
    status: string | undefined,
    date: number | undefined,
  ) => {
    if (status === "verified" && date) {
      return `Verified (${new Date(date).toLocaleDateString()})`
    }
    return status ?? "N/A"
  }

  return (
    <section className="mb-20">
      <h2 className="vogue-heading text-4xl mb-8">Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem label="Age" value={escort.age} />
        <InfoItem label="Suburb" value={escort.suburb} />
        <InfoItem label="Location" value={escort.location} />
        <InfoItem label="Ethnicity" value={escort.ethnicity} />
        <InfoItem label="Height" value={`${escort.height} cm`} />
        <InfoItem label="Weight" value={`${escort.weight} kg`} />
        <InfoItem label="Hair Color" value={escort.hairColor} />
        <InfoItem label="Hair Length" value={escort.hairLength} />
        <InfoItem label="Bust Size" value={escort.bustSize} />
        <InfoItem label="Body Type" value={escort.bodyType} />
        <InfoItem label="Smoker" value={escort.smoker ? "Yes" : "No"} />
        <InfoItem label="Languages" value={formatLanguages(escort.languages)} />
        <InfoItem
          label="Verification Status"
          value={formatVerificationStatus(
            escort.verificationStatus,
            escort.verifiedDate,
          )}
        />
        <InfoItem label="Occupation" value={escort.occupation} />
        <InfoItem label="Escort Type" value={escort.escortType} />
        <InfoItem label="Service Type" value={escort.serviceType} />
      </div>
    </section>
  )
}

const InfoItem: React.FC<{
  label: string
  value: string | number | undefined
}> = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-200 py-2">
    <span className="font-semibold">{label}:</span>
    <span>{value ?? "N/A"}</span>
  </div>
)

export default DetailInfoSection
