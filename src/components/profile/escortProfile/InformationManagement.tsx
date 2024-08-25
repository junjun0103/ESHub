import type React from "react"
import { useState, useEffect } from "react"
import Select from "react-select"
import type { Escort, Language, Contact, TimeTable } from "../../../types"
import PreferencesSection from "./components/PreferencesSection" // adjust the path as necessary
import LanguagesAndSmoking from "./components/LanguagesAndSmoking"
import AboutMe from "../../../pages/components/AboutMe"
import AboutMeSection from "./components/AboutMeSection"
import AvailabilitySection from "./components/AvailabilitySection"

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
  const [location, setLocation] = useState(profile?.location || "")
  const [ethnicity, setEthnicity] = useState(profile?.ethnicity || "")
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
  const [contacts, setContacts] = useState<Contact[]>(profile?.contacts || [])
  const [aboutMe, setAboutMe] = useState(profile?.aboutMe || "")
  const [availability, setAvailability] = useState(profile?.availability || "")
  const [timeTable, setTimeTable] = useState<TimeTable[]>(
    profile?.timeTable || [],
  )

  const [isSpecialEventActive, setIsSpecialEventActive] = useState(
    profile?.isSpecialEventActive || false,
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
  const [isPreferencesActive, setIsPreferencesActive] = useState(
    profile?.isPreferencesActive || false,
  )

  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    greeting: false,
    personalInfo: false,
    physicalAttributes: false,
    languagesAndSmoking: false,
    professionalInfo: false,
    preferences: false,
    specialEvent: false,
    aboutMe: false,
    availability: false,
  })

  const suburbOptions = [
    { value: "Bondi Beach", label: "Bondi Beach" },
    { value: "Surry Hills", label: "Surry Hills" },
    { value: "Paddington", label: "Paddington" },
    // Add more options as needed
  ]

  const locationOptions = [
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
      setLocation(profile.location || "")
      setEthnicity(profile.ethnicity || "")
      setHeight(profile.height?.toString() || "")
      setWeight(profile.weight?.toString() || "")
      setHairColor(profile.hairColor || "")
      setHairLength(profile.hairLength || "")
      setBustSize(profile.bustSize || "")
      setBodyType(profile.bodyType || "")
      setSmoker(profile.smoker || false)
      setLanguages(profile.languages || [])
      setContacts(profile.contacts || [])
      setAboutMe(profile.aboutMe || "")
      setAvailability(profile.availability || "")
      setIsSpecialEventActive(profile.isSpecialEventActive || false)
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
      location,
      ethnicity,
      height: parseInt(height),
      weight: parseInt(weight),
      hairColor,
      hairLength,
      bustSize,
      bodyType,
      smoker,
      languages,
      contacts,
      aboutMe,
      isSpecialEventActive,
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
    | "aboutMe"
    | "availability"

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

  const addContact = () => {
    setContacts([...contacts, { name: "", detail: "" }])
  }

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index))
  }

  const updateContact = (
    index: number,
    field: "name" | "detail",
    value: string,
  ) => {
    const updatedContacts = [...contacts]
    updatedContacts[index][field] = value
    setContacts(updatedContacts)
  }

  const addTimeTable = () => {
    setTimeTable([...timeTable, { day: "Monday", from: "", untill: "" }])
  }

  const removeTimeTable = (index: number) => {
    setTimeTable(timeTable.filter((_, i) => i !== index))
  }

  const updateTimeTable = (
    index: number,
    field: "day" | "from" | "untill",
    value: string,
  ) => {
    const updatedTimeTable = [...timeTable]
    updatedTimeTable[index][field] = value
    setTimeTable(updatedTimeTable)
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
              {/* Location Selector with Search */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-300"
                >
                  Location
                </label>
                <Select
                  id="location"
                  value={locationOptions.find(
                    option => option.value === location,
                  )}
                  onChange={option => setLocation(option?.value || "")}
                  options={locationOptions}
                  className="mt-1 text-gray-700"
                  classNamePrefix="react-select"
                />
              </div>
            </div>
          )}
        </div>

        {/* aboutMe Section */}
        <div>
          <h3
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => toggleSection("aboutMe")}
          >
            about Me and Contacts* {openSections.aboutMe ? "▼" : "▶"}
          </h3>
          {openSections.aboutMe && (
            <div className="space-y-4">
              <AboutMeSection
                aboutMe={aboutMe}
                setAboutMe={setAboutMe}
                contacts={contacts}
                addContact={addContact}
                updateContact={updateContact}
                removeContact={removeContact}
              />
            </div>
          )}
        </div>

        {/* Availability Section */}
        <div>
          <h3
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => toggleSection("availability")}
          >
            Availability* {openSections.availability ? "▼" : "▶"}
          </h3>
          {openSections.availability && (
            <div className="space-y-4">
              <AvailabilitySection
                availability={availability}
                setAvailability={setAvailability}
                timeTable={timeTable}
                addTimeTable={addTimeTable}
                updateTimeTable={updateTimeTable}
                removeTimeTable={removeTimeTable}
              />
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
              <div className="flex items-center justify-between relative">
                <span className="cursor-pointer">
                  Special Event Active Status
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isSpecialEventActive || false}
                    onChange={() =>
                      setIsSpecialEventActive(!isSpecialEventActive)
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
                </label>
              </div>

              {isSpecialEventActive && (
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
              {renderField("Ethnicity", ethnicity, setEthnicity)}
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
              <LanguagesAndSmoking
                languages={languages}
                smoker={smoker}
                updateLanguage={updateLanguage}
                removeLanguage={removeLanguage}
                addLanguage={addLanguage}
                setSmoker={setSmoker}
              />
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
                isPreferencesActive={isPreferencesActive}
                setIsPreferencesActive={setIsPreferencesActive}
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
