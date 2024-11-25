import type React from "react"
import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import {
  selectUser,
  selectUserEscortProfile,
  selectUserStatusProfile,
  setUserEscortProfile,
  setStatusUserProfile,
  setUserStories,
  setStatusSaveUserProfile,
  selectUserStories,
  setStatusUserStories,
  selectUserStoriesStatus,
} from "../../../features/user/userSlice"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Dashboard from "./Dashboard"
import InformationManagement from "./InformationManagement"
import MediaSection from "./MediaSection"
import RatesTable from "./RatesTable"
import ServiceSection from "./ServiceSection"
import StoriesSection from "./StoriesSection"
import PaymentPlans from "./PaymentPlans"
import VerificationSection from "./VerificationSection"
import type { Story, Escort } from "../../../types"
import { db, auth, functions } from "../../../firebase/config"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { httpsCallable } from "firebase/functions"
import { Message } from "../../common/Message"

const EscortProfileContent: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const escortProfile = useAppSelector(selectUserEscortProfile)
  const statusUserProfile = useAppSelector(selectUserStatusProfile)
  const stories = useAppSelector(selectUserStories)
  const statusStories = useAppSelector(selectUserStoriesStatus)

  const [activeSection, setActiveSection] = useState("dashboard")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.userType === "advertiser") {
        dispatch(setStatusUserProfile("loading"))
        try {
          const fetchedEscortProfileById = httpsCallable(
            functions,
            "escortProfile-getEscortProfileByUserId",
          )
          const result = await fetchedEscortProfileById({ escortId: user.id })
          if (result.data) {
            dispatch(setUserEscortProfile(result.data as Escort))
          }
        } catch (error) {
          console.error("Failed to fetch escort profile:", error)
          dispatch(setStatusUserProfile("failed"))
        }
      }
    }

    const fetchStories = async () => {
      if (user && user.userType === "advertiser" && !stories) {
        dispatch(setStatusUserStories("loading"))
        try {
          const fetchedStories = await getDoc(doc(db, "stories", user.id))
          if (!fetchedStories.exists()) {
            const emptyStory: Story = {
              id: user.id,
            }
            try {
              await setDoc(doc(db, "stories", user.id), emptyStory)
              dispatch(setUserStories(emptyStory))
            } catch (error) {
              console.error("Failed to create a new profile:", error)
              dispatch(setStatusUserStories("failed"))
            }
          } else {
            dispatch(setUserStories(fetchedStories.data() as Story))
          }
        } catch (error) {
          console.error("Failed to fetch escort stories:", error)
          dispatch(setStatusUserStories("failed"))
        }
      }
    }

    fetchProfile()
    fetchStories()
  }, [user])

  const handleUpdateProfile = async (
    updatedData: Partial<typeof escortProfile>,
  ) => {
    setStatusSaveUserProfile("loading")
    if (user && user.userType === "advertiser") {
      const saveEscortProfile = httpsCallable(
        functions,
        "escortProfile-saveEscortProfile",
      )
      const result = await saveEscortProfile({ updatedData })
      const data = result.data
      if (data) {
        dispatch(setUserEscortProfile(data as Escort))
        // Show success message
      } else {
        // Show error message
      }
    }
    setStatusSaveUserProfile("idle")
  }

  const navigationItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "information", label: "Information" },
    { id: "stories", label: "Stories" },
    { id: "media", label: "Media" },
    { id: "rates", label: "Rates" },
    { id: "services", label: "Services" },
    { id: "verification", label: "Verification" },
    { id: "payment", label: "Payment" },
  ]

  const renderContent = () => {
    if (statusUserProfile === "loading") {
      return <div className="p-4 text-gray-500">Loading profile...</div>
    }

    if (statusUserProfile === "failed") {
      return (
        <div className="p-4 text-red-500">
          Failed to load profile. Please try again later.
        </div>
      )
    }

    if (!escortProfile) {
      return <div className="p-4 text-gray-500">No profile data available.</div>
    }

    switch (activeSection) {
      case "dashboard":
        return (
          <Dashboard
            stories={stories}
            profile={escortProfile}
            onUpdate={handleUpdateProfile}
          />
        )
      case "information":
        return (
          <InformationManagement
            profile={escortProfile}
            onUpdate={handleUpdateProfile}
          />
        )
      case "media":
        return (
          <MediaSection
            profile={escortProfile}
            onUpdate={handleUpdateProfile}
          />
        )
      case "rates":
        return (
          <RatesTable profile={escortProfile} onUpdate={handleUpdateProfile} />
        )
      case "services":
        return (
          <ServiceSection
            profile={escortProfile}
            onUpdate={handleUpdateProfile}
          />
        )
      case "stories":
        return <StoriesSection story={stories} profile={escortProfile} />
      case "verification":
        return (
          <VerificationSection
            profile={escortProfile}
            onUpdate={handleUpdateProfile}
          />
        )
      case "payment":
        return (
          <PaymentPlans
            profile={escortProfile}
            onUpdate={handleUpdateProfile}
          />
        )
      default:
        return <div className="p-4 text-gray-500">Select a section</div>
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-serif font-bold">Profile</h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Navigation */}
        <nav
          className={`md:w-1/4 lg:w-1/5 border-r border-gray-200 ${isMenuOpen ? "block" : "hidden md:block"}`}
        >
          <ul className="py-4">
            {navigationItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    activeSection === item.id
                      ? "font-bold"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Area */}
        <main className="flex-1 py-4">{renderContent()}</main>
      </div>
    </div>
  )
}

export default EscortProfileContent
