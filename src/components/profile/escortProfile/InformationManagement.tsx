import type React from "react"
import { useState, useEffect } from "react"
import Select from "react-select"
import type { Escort, Language } from "../../../types"
import PreferencesSection from "./components/PreferencesSection" // adjust the path as necessary

interface InformationManagementProps {
  profile: Escort | null
  onUpdate: (updatedData: Partial<Escort>) => void
}

const InformationManagement: React.FC<InformationManagementProps> = ({
  profile,
  onUpdate,
}) => {
  // State for all fields
  const [greeting, setGreeting] = useState(profile?.greeting || "")
  const [name, setName] = useState(profile?.name || "")
  const [age, setAge] = useState(profile?.age?.toString() || "")
  const [suburb, setSuburb] = useState(profile?.suburb || "")
  const [region, setRegion] = useState(profile?.region || "")
  const [nationality, setNationality] = useState(profile?.nationality || "")
  const [height, setHeight] = useState(profile?.height?.toString() || "")
  const [weight, setWeight] = useState(profile?.weight?.toString() || "")
  const [hairColor, setHairColor] = useState(profile?.hairColor || "")
  const [hairLength, setHairLength] = useState(profile?.hairLength || "")
  const [bustSize, setBustSize] = useState(profile?.bustSize || "")
  const [bodyType, setBodyType] = useState(profile?.bodyType || "")
  const [smoker, setSmoker] = useState(profile?.smoker || false)
  const [languages, setLanguages] = useState<Language[]>(
    profile?.languages || [],
  )
  const [about, setAbout] = useState(profile?.about || "")
  const [specialEvent, setSpecialEvent] = useState(
    profile?.specialEvent || false,
  )
  const [eventDescription, setEventDescription] = useState(
    profile?.eventDescription || "",
  )
  const [occupation, setOccupation] = useState(profile?.occupation || "")
  const [escortType, setEscortType] = useState(profile?.escortType || "")
  const [serviceType, setServiceType] = useState(profile?.serviceType || "")
  const [favoritePosition, setFavoritePosition] = useState(
    profile?.favoritePosition || "",
  )
  const [oralPreference, setOralPreference] = useState(
    profile?.oralPreference || "",
  )
  const [experiencePace, setExperiencePace] = useState(
    profile?.experiencePace || "",
  )
  const [touchPreference, setTouchPreference] = useState(
    profile?.touchPreference || "",
  )
  const [roleplayPreference, setRoleplayPreference] = useState(
    profile?.roleplayPreference || "",
  )

  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    greeting: true,
    personalInfo: false,
    physicalAttributes: false,
    languagesAndSmoking: false,
    professionalInfo: false,
    preferences: false,
    specialEvent: false,
    about: false,
  })

  const suburbOptions = [
    { value: "Bondi Beach", label: "Bondi Beach" },
    { value: "Surry Hills", label: "Surry Hills" },
    { value: "Paddington", label: "Paddington" },
    // Add more options as needed
  ]

  const regionOptions = [
    { value: "Sydney", label: "Sydney" },
    { value: "Melbourne", label: "Melbourne" },
    { value: "Brisbane", label: "Brisbane" },
    // Add more options as needed
  ]

  useEffect(() => {
    if (profile) {
      setGreeting(profile.greeting || "")
      setName(profile.name || "")
      setAge(profile.age?.toString() || "")
      setSuburb(profile.suburb || "")
      setRegion(profile.region || "")
      setNationality(profile.nationality || "")
      setHeight(profile.height?.toString() || "")
      setWeight(profile.weight?.toString() || "")
      setHairColor(profile.hairColor || "")
      setHairLength(profile.hairLength || "")
      setBustSize(profile.bustSize || "")
      setBodyType(profile.bodyType || "")
      setSmoker(profile.smoker || false)
      setLanguages(profile.languages || [])
      setAbout(profile.about || "")
      setSpecialEvent(profile.specialEvent || false)
      setEventDescription(profile.eventDescription || "")
      setOccupation(profile.occupation || "")
      setEscortType(profile.escortType || "")
      setServiceType(profile.serviceType || "")
      setFavoritePosition(profile.favoritePosition || "")
      setOralPreference(profile.oralPreference || "")
      setExperiencePace(profile.experiencePace || "")
      setTouchPreference(profile.touchPreference || "")
      setRoleplayPreference(profile.roleplayPreference || "")
    }
  }, [profile])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({
      greeting,
      name,
      age: parseInt(age),
      suburb,
      region,
      nationality,
      height: parseInt(height),
      weight: parseInt(weight),
      hairColor,
      hairLength,
      bustSize,
      bodyType,
      smoker,
      languages,
      about,
      specialEvent,
      eventDescription,
      occupation,
      escortType,
      serviceType,
      favoritePosition,
      oralPreference,
      experiencePace,
      touchPreference,
      roleplayPreference,
    })
  }

  type SectionKey =
    | "greeting"
    | "personalInfo"
    | "physicalAttributes"
    | "languagesAndSmoking"
    | "professionalInfo"
    | "preferences"
    | "specialEvent"
    | "about"

  const toggleSection = (section: SectionKey) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  // Table Handler
  const addLanguage = () => {
    setLanguages([...languages, { name: "", level: "Basic" }])
  }

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index))
  }

  const updateLanguage = (
    index: number,
    field: "name" | "level",
    value: string,
  ) => {
    const updatedLanguages = [...languages]
    updatedLanguages[index][field] = value
    setLanguages(updatedLanguages)
  }

  // Helper function to render form fields
  const renderField = (
    label: string,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    type: string = "text",
  ) => (
    <div>
      <label
        htmlFor={label.toLowerCase()}
        className="block text-sm font-medium text-gray-300"
      >
        {label}
      </label>
      <input
        type={type}
        id={label.toLowerCase()}
        value={value}
        onChange={e => setter(e.target.value)}
        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
        maxLength={label === "Greeting" ? 10 : undefined}
        placeholder={label === "Greeting" ? "(max 10)Hey or Hello etc" : ""}
      />
    </div>
  )

  return (
    <div className="space-y-8 bg-gray-900 text-white p-4 sm:p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">
        Personal Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Greeting Section */}
        <div>
          <h3
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => toggleSection("greeting")}
          >
            Greeting* {openSections.greeting ? "▼" : "▶"}
          </h3>
          {openSections.greeting && (
            <div className="space-y-4">
              {renderField("Greeting", greeting, setGreeting)}
              {renderField("Name", name, setName)}
              {renderField("Age", age, setAge, "number")}
              {/* Suburb Selector with Search */}
              <div>
                <label
                  htmlFor="suburb"
                  className="block text-sm font-medium text-gray-300"
                >
                  Suburb
                </label>
                <Select
                  id="suburb"
                  value={suburbOptions.find(option => option.value === suburb)}
                  onChange={option => setSuburb(option?.value || "")}
                  options={suburbOptions}
                  className="mt-1 text-gray-700"
                  classNamePrefix="react-select"
                />
              </div>
              {/* Region Selector with Search */}
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-300"
                >
                  Region
                </label>
                <Select
                  id="region"
                  value={regionOptions.find(option => option.value === region)}
                  onChange={option => setRegion(option?.value || "")}
                  options={regionOptions}
                  className="mt-1 text-gray-700"
                  classNamePrefix="react-select"
                />
              </div>
            </div>
          )}
        </div>

        {/* Personal Information Section */}
        <div>
          <h3
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => toggleSection("personalInfo")}
          >
            Personal Information {openSections.personalInfo ? "▼" : "▶"}
          </h3>
          {openSections.personalInfo && (
            <div className="space-y-4">
              {renderField("Nationality", nationality, setNationality)}
              {renderField("Occupation", occupation, setOccupation)}
            </div>
          )}
        </div>

        {/* Physical Attributes Section */}
        <div>
          <h3
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => toggleSection("physicalAttributes")}
          >
            Physical Attributes {openSections.physicalAttributes ? "▼" : "▶"}
          </h3>
          {openSections.physicalAttributes && (
            <div className="space-y-4">
              {renderField("Height (cm)", height, setHeight, "number")}
              {renderField("Weight (kg)", weight, setWeight, "number")}
              {renderField("Hair Color", hairColor, setHairColor)}
              {renderField("Hair Length", hairLength, setHairLength)}
              {renderField("Bust Size", bustSize, setBustSize)}
              {renderField("Body Type", bodyType, setBodyType)}
            </div>
          )}
        </div>

        {/* Languages and Smoking Section */}
        <div>
          <h3
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => toggleSection("languagesAndSmoking")}
          >
            Languages and Smoking{" "}
            {openSections.languagesAndSmoking ? "▼" : "▶"}
          </h3>
          {openSections.languagesAndSmoking && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Languages
                </label>
                <table className="w-full mb-2 text-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-gray-300">Language</th>
                      <th className="text-left p-2 text-gray-300">
                        Proficiency
                      </th>
                      <th className="text-left p-2 text-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {languages.map((lang, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-2">
                          <input
                            type="text"
                            value={lang.name}
                            onChange={e =>
                              updateLanguage(index, "name", e.target.value)
                            }
                            className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                          />
                        </td>
                        <td className="py-2">
                          <select
                            value={lang.level}
                            onChange={e =>
                              updateLanguage(index, "level", e.target.value)
                            }
                            className="w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                          >
                            <option value="Basic">Basic</option>
                            <option value="Conversational">
                              Conversational
                            </option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native">Native</option>
                          </select>
                        </td>
                        <td className="py-2">
                          <button
                            type="button"
                            onClick={() => removeLanguage(index)}
                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                            aria-label="Remove language"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="bg-accent-gold text-gray-900 px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
                  disabled={languages.length >= 5}
                >
                  Add Language
                </button>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={smoker}
                    onChange={e => setSmoker(e.target.checked)}
                    className="rounded border-gray-700 text-accent-gold focus:ring-accent-gold h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-300">Smoker</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Professional Information Section */}
        <div>
          <h3
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => toggleSection("professionalInfo")}
          >
            Professional Information*{" "}
            {openSections.professionalInfo ? "▼" : "▶"}
          </h3>
          {openSections.professionalInfo && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="escortType"
                  className="block text-sm font-medium text-gray-300"
                >
                  Type of Escort
                </label>
                <select
                  id="escortType"
                  value={escortType}
                  onChange={e => setEscortType(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                >
                  <option value="Agency">Agency</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="serviceType"
                  className="block text-sm font-medium text-gray-300"
                >
                  Type of Service
                </label>
                <select
                  id="serviceType"
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                >
                  <option value="Full service">Full service</option>
                  <option value="Massage">Sensual Massage</option>
                  <option value="Pure Massage">Pure Massage</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Preferences Section */}
        <div>
          <h3
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => toggleSection("preferences")}
          >
            Preferences {openSections.preferences ? "▼" : "▶"}
          </h3>
          {openSections.preferences && (
            <div className="space-y-4">
              <PreferencesSection
                favoritePosition={favoritePosition}
                setFavoritePosition={setFavoritePosition}
                oralPreference={oralPreference}
                setOralPreference={setOralPreference}
                experiencePace={experiencePace}
                setExperiencePace={setExperiencePace}
                touchPreference={touchPreference}
                setTouchPreference={setTouchPreference}
                roleplayPreference={roleplayPreference}
                setRoleplayPreference={setRoleplayPreference}
              />
            </div>
          )}
        </div>

        {/* Special Event Section */}
        <div>
          <h3
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => toggleSection("specialEvent")}
          >
            Special Event {openSections.specialEvent ? "▼" : "▶"}
          </h3>
          {openSections.specialEvent && (
            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={specialEvent}
                    onChange={e => setSpecialEvent(e.target.checked)}
                    className="rounded border-gray-700 text-accent-gold focus:ring-accent-gold h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    Special Event
                  </span>
                </label>
              </div>
              {specialEvent && (
                <div>
                  <label
                    htmlFor="eventDescription"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Event Description
                  </label>
                  <textarea
                    id="eventDescription"
                    value={eventDescription}
                    onChange={e => setEventDescription(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* About Section */}
        <div>
          <h3
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => toggleSection("about")}
          >
            About Me* {openSections.about ? "▼" : "▶"}
          </h3>
          {openSections.about && (
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-300"
              >
                About Me
              </label>
              <textarea
                id="about"
                value={about}
                onChange={e => setAbout(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-accent-gold focus:ring-accent-gold"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-accent-gold text-gray-900 px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors font-bold"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default InformationManagement
