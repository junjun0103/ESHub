import type React from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  selectUser,
  setStatusUserProfile,
  setStatusUserStories,
  setUserEscortProfile,
  setUserStories,
} from "../features/user/userSlice"
import Layout from "../components/common/Layout"
import EscortProfileContent from "../components/profile/escortProfile/EscortProfileContent"
import CustomerProfileContent from "../components/profile/customerProfile/CustomerProfileContent"
import { useEffect } from "react"
import { httpsCallable } from "firebase/functions"
import type { Escort, Story } from "../types"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db, functions } from "../firebase/config"

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user || user.userType !== "advertiser") return

    const fetchInitialData = async () => {
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

      // Fetch stories
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

    fetchInitialData()
  }, [])

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mb-8">
        {user.userType === "advertiser" ? (
          <EscortProfileContent />
        ) : (
          <CustomerProfileContent />
        )}
      </div>
    </Layout>
  )
}

export default Profile
