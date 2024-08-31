import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { fetchEscortById } from "../features/escorts/escortsAPI"
import { selectUser } from "../features/user/userSlice"
import type { Escort, Story } from "../types"
import Layout from "../components/common/Layout"
import IntroductionSection from "../components/escortDetail/IntroductionSection"
import StoriesSection from "../components/escortDetail/StoriesSection"
import ProfileGallerySection from "../components/escortDetail/ProfileGallerySection"
import ServiceSection from "../components/escortDetail/ServiceSection"
import RateSection from "../components/escortDetail/RateSection"
import ContactInfoSection from "../components/escortDetail/ContactInfoSection"
import DetailInfoSection from "../components/escortDetail/DetailInfoSection"
import DetailPhotoGallerySection from "../components/escortDetail/DetailPhotoGallerySection"
import QnASection from "../components/escortDetail/QnASection"
import SpecialEventSection from "../components/escortDetail/SpecialEventSection"
import AboutMeSection from "../components/escortDetail/AboutMeSection"
import ReviewSection from "../components/escortDetail/ReviewSection"
import MyVideosSection from "../components/escortDetail/MyVideosSection"
import PreferenceSection from "../components/escortDetail/PreferenceSection"

const EscortDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [escort, setEscort] = useState<Escort | null>(null)
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    const fetchEscortData = async () => {
      setLoading(true)
      try {
        const mockData = true
        const escortData = await fetchEscortById(id!, mockData)
        setEscort(escortData)
        const dummyStories: Story[] = [
          {
            id: "1",
            userId: "escort-001",
            imageUrls: [
              "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
              "https://sample-il.com/wp-content/uploads/2023/08/EmptyName-3.jpg",
            ],
            description: "Enjoying my day!",
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
            suburb: "Forrest Hill",
            location: "Auckland",
            latitude: 0,
            longitude: 0,
            views: 0,
          },
          // Add more dummy stories as needed
        ]
        setStories(dummyStories)
      } catch (err) {
        setError("Failed to load escort details")
      } finally {
        setLoading(false)
      }
    }

    fetchEscortData()
  }, [id])

  if (loading) return <div className="text-center py-20">Loading...</div>
  if (error) return <div className="text-center py-20 text-accent">{error}</div>
  if (!escort) return <div className="text-center py-20">Escort not found</div>
  return (
    <Layout>
      <IntroductionSection escort={escort} />
      <div className="bg-secondary text-primary">
        <div className="vogue-container py-16">
          <StoriesSection stories={stories} />
          {/* About Me */}
          <AboutMeSection escort={escort} />
          {/* Gallery */}
          <ProfileGallerySection escort={escort} />
          {/* Detailed Information */}
          <DetailInfoSection escort={escort} />
          {/* Services */}
          <ServiceSection escort={escort} />
          {/* Rates */}
          <RateSection escort={escort} />
          {/* Contact Info */}
          <ContactInfoSection escort={escort} />
          {/* Special Event */}
          <SpecialEventSection escort={escort} />
          {/* Detail Photo Gallery */}
          <DetailPhotoGallerySection escort={escort} />
          {/* My Videos section */}
          <MyVideosSection videos={escort.videos || []} />
          {/* Preference Section */}
          <PreferenceSection escort={escort} />
          {/* Q&A Section */}
          <QnASection escortId={escort.id} escortUserId={escort.userId} />
          {/* Review Section */}
          <ReviewSection escortId={escort.id} escortUserId={escort.userId} />
        </div>
      </div>
    </Layout>
  )
}

export default EscortDetail
