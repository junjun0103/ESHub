import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { selectUser } from "../features/user/userSlice"
import { fetchEscortById } from "../features/escorts/escortsAPI"
import type { Escort, Story } from "../types"
import Layout from "../components/common/Layout"
import ReportModal from "./components/ReportModal"

import FullScreenModal from "./components/FullScreenModal"
import PhotoGallery from "./components/PhotoGallery"
import InfoCard from "./components/InforCard"
import EnhancedStoriesComponent from "./components/EnhancedStoriesComponent"
import DynamicBackground from "./components/DynamicBackground"

import Profile from "./components/Profile"
import MyVideos from "./components/MyVideos"
import CollapsibleSection from "./components/CollapsibleSection"
import AboutMe from "./components/AboutMe"
import Services from "./components/Services"
import AvailabilitySection from "./components/AvailabilitySection"
import RateAndSpecialEventSection from "./components/RatesAndSpecialEventSection"
import ContactSection from "./components/ContactSection"
import QuestionAnswerSection from "./components/QuestionAnswerSection"
import ReviewsSection from "./components/ReviewsSection"
// import MyVideos from './components/MyVideos';

const EscortDetail: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState("")
  const { id } = useParams<{ id: string }>()
  const [escort, setEscort] = useState<Escort | null>(null)

  const profileRef = useRef<HTMLDivElement>(null)
  const aboutMeRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const ratesRef = useRef<HTMLDivElement>(null)
  const contactsRef = useRef<HTMLDivElement>(null)
  const availabilityRef = useRef<HTMLDivElement>(null)

  const openModal = (photo: string) => {
    setSelectedPhoto(photo)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleFavoriteToggle = (isFavorite: boolean) => {
    console.log(`Escort ${isFavorite ? "added to" : "removed from"} favorites`)
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const fetchEscortData = async () => {
      // setLoading(true);
      try {
        const isMockData = true
        const escortData = await fetchEscortById(id!, isMockData)
        setEscort(escortData)
        // Fetch stories here (assuming you have a function for this)
        // const storiesData = await fetchStoriesByEscortId(id!);
        // setStories(storiesData);
      } catch (err) {
        // setError('Failed to load escort details');
      } finally {
        // setLoading(false);
      }
    }

    fetchEscortData()
  }, [id])

  const mockStories: Story[] = [
    {
      id: "1",
      userId: "1",
      imageUrls: [
        "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
        "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
        "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
      ],
      description: "A lovely day at the beach",
      createdAt: new Date("2024-08-20T18:00:00Z"),
      expiresAt: new Date(
        new Date("2024-08-20T18:00:00Z").getTime() + 24 * 60 * 60 * 1000,
      ),
      suburb: "Foresthill",
      location: "Auckland",
      latitude: -33.8568,
      longitude: 151.2153,
      views: 120,
    },
    {
      id: "2",
      userId: "2",
      imageUrls: ["https://example.com/image3.jpg"],
      description: "Enjoying a night out",
      createdAt: new Date("2024-08-20T18:00:00Z"),
      expiresAt: new Date(
        new Date("2024-08-20T18:00:00Z").getTime() + 24 * 60 * 60 * 1000,
      ),
      suburb: "Foresthill",
      location: "Auckland",
      latitude: -33.8568,
      longitude: 151.2153,
      views: 110,
    },
    // Add more mock stories as needed
  ]

  if (!escort) return <div className="text-center">Escort not found</div>

  return (
    <Layout>
      <DynamicBackground photos={escort.profilePhotos} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white"
      >
        {/* Hero Section */}
        <section className="mb-12 flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <PhotoGallery photos={escort.detailPhotos} name={escort.name} />
          </div>
          <div className="md:w-1/3">
            <InfoCard escort={escort} />
          </div>
        </section>

        {/* Quick Navigation */}
        <nav className="sticky top-4 z-20 bg-gray-900 bg-opacity-90 p-4 rounded-lg shadow-lg mb-8">
          <ul className="flex justify-around">
            {[
              { name: "Profile", ref: profileRef },
              { name: "AboutMe", ref: aboutMeRef },
              { name: "Services", ref: servicesRef },
              { name: "Rates", ref: ratesRef },
              { name: "Contacts", ref: contactsRef },
            ].map(item => (
              <li key={item.name}>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="text-accent-gold hover:text-white transition-colors"
                  onClick={() => scrollToSection(item.ref)}
                >
                  {item.name}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Stories */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-serif mb-6 text-accent-gold">
              Stories
            </h2>
            <EnhancedStoriesComponent stories={mockStories} />
          </motion.section>
          {/* Profile */}
          <CollapsibleSection ref={profileRef} title="Profile" initiallyOpen>
            <Profile escort={escort} />
          </CollapsibleSection>
          {/* Video */}
          {escort.videos && (
            <CollapsibleSection
              ref={profileRef}
              title="My Videos"
              initiallyOpen
            >
              <MyVideos videos={escort.videos} />{" "}
            </CollapsibleSection>
          )}
          {/* AboutMe */}
          <CollapsibleSection ref={aboutMeRef} title="About Me" initiallyOpen>
            <AboutMe escort={escort} />
          </CollapsibleSection>
          <CollapsibleSection ref={servicesRef} title="Services" initiallyOpen>
            <Services escort={escort} />
          </CollapsibleSection>
          {/* When We can meet */}
          <CollapsibleSection
            ref={availabilityRef}
            title="When we can meet"
            initiallyOpen
          >
            <AvailabilitySection escort={escort} />
          </CollapsibleSection>
          {/* 4. Rates */}
          <CollapsibleSection ref={ratesRef} title="Rates" initiallyOpen>
            <RateAndSpecialEventSection escort={escort} />
          </CollapsibleSection>
          {/* 5. Contacts */}
          <CollapsibleSection ref={contactsRef} title="Contacts" initiallyOpen>
            <ContactSection escort={escort} />
          </CollapsibleSection>
          {/* Q&A */}
          <CollapsibleSection ref={contactsRef} title="Q&A" initiallyOpen>
            <QuestionAnswerSection escort={escort} />
          </CollapsibleSection>{" "}
          {/* Reviews */}
          <CollapsibleSection ref={contactsRef} title="Reviews" initiallyOpen>
            <ReviewsSection escort={escort} />
          </CollapsibleSection>{" "}
          {/* Report */}
        </div>

        {/* Contact and Booking Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-serif mb-6 text-accent-gold">
            Book Now
          </h2>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent-gold text-gray-900 px-8 py-3 rounded-full hover:bg-opacity-80 transition duration-300"
            >
              Message
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-accent-gold px-8 py-3 rounded-full hover:bg-accent-gold hover:text-gray-900 transition duration-300 border border-accent-gold"
            >
              Call
            </motion.button>
          </div>
        </motion.section>

        {/* Full Screen Modal */}
        <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
          <img
            src={selectedPhoto}
            alt={escort.name}
            className="max-w-full max-h-full object-contain"
          />
        </FullScreenModal>
      </motion.div>
    </Layout>
  )
}

export default EscortDetail
