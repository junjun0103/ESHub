import type React from "react"
import { useState, useEffect } from "react"
import {
  type Escort,
  type Language,
  type Contact,
  type TimeTable,
  locationOptions,
  type Address,
  ethinicityOptions,
  escortTypeOptions,
  escourtServiceOptions,
} from "../../../types"
import PreferencesSection from "./components/PreferencesSection"
import LanguagesAndSmoking from "./components/LanguagesAndSmoking"
import AboutMeSection from "./components/AboutMeSection"
import AvailabilitySection from "./components/AvailabilitySection"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import AddressAutofillComponent from "./components/AddressAutoFillComponent"
import InputText from "./components/InputText"
import InputNumber from "./components/InputNumber"
import InputSelector from "./components/InputSelector"
import { Switch } from "antd"

interface InformationManagementProps {
  profile: Escort | null
  onUpdate: (updatedData: Partial<Escort>) => void
}

const InformationManagement: React.FC<InformationManagementProps> = ({
  profile,
  onUpdate,
}) => {
  // State for all fields
  console.log("JUN HEREHERE profile", profile)

  const [greeting, setGreeting] = useState(profile?.greeting || "")
  const [name, setName] = useState(profile?.name || "")
  const [age, setAge] = useState(profile?.age?.toString() || "")
  const [address, setAddress] = useState<Address>(profile?.address || {})
  const [location, setLocation] = useState(profile?.location || "")
  const [ethnicity, setEthnicity] = useState(profile?.ethnicity || "")
  const [height, setHeight] = useState(profile?.height || "")
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

  // timeTable is an array of objects
  const [timeTable, setTimeTable] = useState<TimeTable[]>(
    profile?.timeTable || [
      { day: "Monday", from: "", until: "", status: false },
      { day: "Tuesday", from: "", until: "", status: false },
      { day: "Wednesday", from: "", until: "", status: false },
      { day: "Thursday", from: "", until: "", status: false },
      { day: "Friday", from: "", until: "", status: false },
      { day: "Saturday", from: "", until: "", status: false },
      { day: "Sunday", from: "", until: "", status: false },
    ],
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
    profile?.preferences?.favoritePosition || "",
  )
  const [oralPreference, setOralPreference] = useState(
    profile?.preferences?.oralPreference || "",
  )
  const [experiencePace, setExperiencePace] = useState(
    profile?.preferences?.experiencePace || "",
  )
  const [touchPreference, setTouchPreference] = useState(
    profile?.preferences?.touchPreference || "",
  )
  const [roleplayPreference, setRoleplayPreference] = useState(
    profile?.preferences?.roleplayPreference || "",
  )
  const [isPreferencesActive, setIsPreferencesActive] = useState(
    profile?.isPreferencesActive || false,
  )

  const [openSections, setOpenSections] = useState({
    greeting: true,
    personalInfo: false,
    physicalAttributes: false,
    languagesAndSmoking: false,
    professionalInfo: false,
    preferences: false,
    specialEvent: false,
    aboutMe: false,
    availability: false,
  })

  useEffect(() => {
    if (profile) {
      setGreeting(profile.greeting || "")
      setName(profile.name || "")
      setAge(profile.age?.toString() || "")
      setAddress(profile.address || {})
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
      setFavoritePosition(profile?.preferences?.favoritePosition || "")
      setOralPreference(profile?.preferences?.oralPreference || "")
      setExperiencePace(profile?.preferences?.experiencePace || "")
      setTouchPreference(profile?.preferences?.touchPreference || "")
      setRoleplayPreference(profile?.preferences?.roleplayPreference || "")
    }
  }, [profile])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({
      greeting,
      name,
      age: isNaN(parseInt(age)) ? 0 : parseInt(age),
      address: {
        ...address,
      },
      availability,
      timeTable: {
        ...timeTable,
      },
      location,
      ethnicity,
      height,
      weight: isNaN(parseInt(weight)) ? 0 : parseInt(weight),
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
      preferences: {
        favoritePosition,
        oralPreference,
        experiencePace,
        touchPreference,
        roleplayPreference,
      },
    })
  }

  const handleSetAddress = (newAddress: Address) => {
    setAddress(newAddress)
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }
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

  const updateTimeTableStatus = (index: number, status: boolean) => {
    // Reset the time for the selected index
    console.log("JUN HERE updateTimeTableStatus", index, status)

    const updatedTimeTable = Object.values(timeTable)
    updatedTimeTable[index] = {
      ...updatedTimeTable[index],
      status: status,
    }
    setTimeTable(updatedTimeTable)
  }

  const updateTimeTable = (
    index: number,
    field: "day" | "from" | "until",
    value: string,
  ) => {
    const updatedTimeTable = Object.values(timeTable)
    updatedTimeTable[index] = {
      ...updatedTimeTable[index],
      [field]: value,
    }
    setTimeTable(updatedTimeTable)
  }

  const renderSection = (
    title: string,
    sectionKey: keyof typeof openSections,
    content: React.ReactNode,
  ) => (
    <div className="bg-white shadow rounded-lg mb-4">
      <button
        className="w-full px-4 py-3 flex justify-between items-center text-left bg-gray-200"
        onClick={() => toggleSection(sectionKey)}
      >
        <h3 className="vogue-subheading">{title}</h3>
        {openSections[sectionKey] ? (
          <ChevronUpIcon className="h-5 w-5" />
        ) : (
          <ChevronDownIcon className="h-5 w-5" />
        )}
      </button>
      {openSections[sectionKey] && (
        <div className="px-4 py-3 border-t bg-gray-100">{content}</div>
      )}
    </div>
  )

  return (
    <div className="vogue-container">
      <h2 className="vogue-heading text-2xl mb-6">Personal Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderSection(
          "*Greeting",
          "greeting",
          <div className="space-y-4">
            <InputText
              label="Greeting"
              value={greeting}
              onChange={setGreeting}
              placeholder="Greeting message: ex) Hi,"
              maxLength={10}
            />
            <InputText
              label="Name"
              value={name}
              onChange={setName}
              placeholder="Name"
              maxLength={10}
            />
            <InputNumber
              label="Age"
              value={age}
              onChange={setAge}
              placeholder="Age"
              maxLength={2}
            />
            <InputSelector
              label="Location"
              value={location}
              onChange={setLocation}
              options={locationOptions}
              placeholder="Select location"
            />
            <AddressAutofillComponent
              address={address}
              onSetAddress={handleSetAddress}
            />
          </div>,
        )}

        {renderSection(
          "*About Me",
          "aboutMe",
          <AboutMeSection
            aboutMe={aboutMe}
            setAboutMe={setAboutMe}
            contacts={contacts}
            addContact={addContact}
            updateContact={updateContact}
            removeContact={removeContact}
          />,
        )}

        {renderSection(
          "Availability",
          "availability",
          <AvailabilitySection
            availability={availability}
            setAvailability={setAvailability}
            timeTable={timeTable}
            updateTimeTable={updateTimeTable}
            updateTimeTableStatus={updateTimeTableStatus}
          />,
        )}

        {renderSection(
          "*Professional Information",
          "professionalInfo",
          <div className="space-y-4">
            <InputSelector
              label="Escort Type"
              value={escortType}
              onChange={setEscortType}
              options={escortTypeOptions}
              placeholder="Select escort type"
            />
            <InputSelector
              label="Service Type"
              value={serviceType}
              onChange={setServiceType}
              options={escourtServiceOptions}
              placeholder="Select service type"
            />
          </div>,
        )}

        {renderSection(
          "Special Event",
          "specialEvent",
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="vogue-body mb-2">Active Status</h3>
              <Switch
                checked={isSpecialEventActive}
                onChange={() => setIsSpecialEventActive(!isSpecialEventActive)}
              />
            </div>
            {isSpecialEventActive && (
              <textarea
                value={eventDescription}
                onChange={e => setEventDescription(e.target.value)}
                className="vogue-input w-full"
                placeholder="Event Description"
                rows={4}
              />
            )}
          </div>,
        )}

        {renderSection(
          "Personal Information",
          "personalInfo",
          <div className="space-y-4">
            <InputSelector
              label="Enthicity"
              value={ethnicity}
              onChange={setEthnicity}
              options={ethinicityOptions}
              placeholder="Select Ethnicity"
            />
            <InputText
              label="Occupation"
              value={occupation}
              onChange={setOccupation}
              placeholder="Occupation"
              maxLength={20}
            />
          </div>,
        )}

        {renderSection(
          "Physical Attributes",
          "physicalAttributes",
          <div className="space-y-4">
            <InputText
              label="Height"
              value={height}
              onChange={setHeight}
              placeholder="Height"
              maxLength={8}
            />
            <InputText
              label="Weight"
              value={weight}
              onChange={setWeight}
              placeholder="Weight"
              maxLength={3}
            />
            <InputText
              label="Hair Color"
              value={hairColor}
              onChange={setHairColor}
              placeholder="Hair Color"
              maxLength={10}
            />
            <InputText
              label="Hair Length"
              value={hairLength}
              onChange={setHairLength}
              placeholder="Hair Length"
              maxLength={10}
            />
            <InputText
              label="Bust Size"
              value={bustSize}
              onChange={setBustSize}
              placeholder="Bust Size"
              maxLength={10}
            />
            <InputText
              label="Body Type"
              value={bodyType}
              onChange={setBodyType}
              placeholder="Body Type"
              maxLength={10}
            />
          </div>,
        )}

        {renderSection(
          "Languages and Smoking",
          "languagesAndSmoking",
          <LanguagesAndSmoking
            languages={languages}
            smoker={smoker}
            updateLanguage={updateLanguage}
            removeLanguage={removeLanguage}
            addLanguage={addLanguage}
            setSmoker={setSmoker}
          />,
        )}

        {renderSection(
          "Preferences",
          "preferences",
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
          />,
        )}

        <button type="submit" className="vogue-button w-full sm:w-auto">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default InformationManagement
