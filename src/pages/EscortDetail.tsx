import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { fetchEscortById } from "../features/escorts/escortsAPI"
import { selectUser } from "../features/user/userSlice"
import type { Escort, Story } from "../types"
import Layout from "../components/common/Layout"
import IntroductionSection from "../components/escortDetail/IntroductionSection"
import StoriesSection from "../components/escortDetail/StoriesSection"
import ProfileGallerySection from "../components/escortDetail/ProfileGallerySection"

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
          <section id="about" className="mb-20">
            <h2 className="vogue-heading text-4xl mb-8">About Me</h2>
            <p className="vogue-body text-lg">{escort.aboutMe}</p>
          </section>
          {/* Gallery */}
          <ProfileGallerySection escort={escort} />
          {/* Services */}
          <section id="services" className="mb-20">
            <h2 className="vogue-heading text-4xl mb-8">Services</h2>
            <div className="vogue-grid">
              <div>
                <h3 className="vogue-subheading text-2xl mb-4">
                  Base Services
                </h3>
                <ul className="vogue-body list-disc list-inside">
                  {escort.baseServices.map((service, index) => (
                    <li key={index} className="mb-2">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              {escort.extraServices && (
                <div>
                  <h3 className="vogue-subheading text-2xl mb-4">
                    Extra Services
                  </h3>
                  <ul className="vogue-body list-disc list-inside">
                    {escort.extraServices.map((service, index) => (
                      <li key={index} className="mb-2">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
          {/* Rates */}
          <section id="rates" className="mb-20">
            <h2 className="vogue-heading text-4xl mb-8">Rates</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="vogue-subheading pb-4 text-lg">Duration</th>
                    <th className="vogue-subheading pb-4 text-lg">Incall</th>
                    <th className="vogue-subheading pb-4 text-lg">Outcall</th>
                  </tr>
                </thead>
                <tbody>
                  {escort.ratesTable?.map((rate, index) => (
                    <tr key={index} className="border-b">
                      <td className="vogue-body py-4">{rate.duration} min</td>
                      <td className="vogue-body py-4">${rate.incall}</td>
                      <td className="vogue-body py-4">${rate.outcall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          {/* Contact Info */}
          <section className="mb-20">
            <h2 className="text-4xl font-serif font-bold mb-8">Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {escort.contacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-4"
                >
                  <span className="font-bold">{contact.name}:</span>
                  <span>{contact.detail}</span>
                </div>
              ))}
            </div>
          </section>
          {/* Special Event */}
          {escort.isSpecialEventActive && (
            <section className="mb-20">
              <h2 className="text-4xl font-serif font-bold mb-8">
                Special Event
              </h2>
              <p className="text-lg leading-relaxed">
                {escort.eventDescription}
              </p>
            </section>
          )}{" "}
        </div>
      </div>
    </Layout>
  )
}

export default EscortDetail
