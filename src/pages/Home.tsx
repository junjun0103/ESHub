import type React from "react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Layout from "../components/common/Layout"
import {
  selectEscortsStatus,
  setEscorts,
  setStatus,
} from "../features/escorts/escortsSlice"
import { setStories } from "../features/stories/storiesSlice"
import { fetchEscorts } from "../features/escorts/escortsAPI"
import { fetchStories } from "../features/stories/storiesAPI"
import StoriesSection from "../components/escortDetail/StoriesSection"
import EscortCard from "../components/home/EscortCard"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import Filter from "../components/home/Filter"

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectEscortsStatus)
  const escorts = useAppSelector(state => state.escorts.escorts)
  const stories = useAppSelector(state => state.stories.items)
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  useEffect(() => {
    const getEscorts = async () => {
      dispatch(setStatus("loading"))
      try {
        // Set this to true to use mock data, false to use Firebase data
        const useMockData = true
        const escorts = await fetchEscorts(useMockData)
        dispatch(setEscorts(escorts))
        dispatch(setStatus("idle"))

        const stories = await fetchStories(useMockData)
        dispatch(setStories(stories))
        dispatch(setStatus("idle"))
      } catch (error) {
        console.error("Failed to fetch escorts:", error)
        dispatch(setStatus("failed"))
      }
    }

    getEscorts()
  }, [dispatch])

  const premiumEscorts = escorts.filter(
    escort =>
      escort.paymentPlan?.tier === "Premium" ||
      escort.paymentPlan?.tier === "Diamond",
  )
  const regularEscorts = escorts.filter(
    escort => !premiumEscorts.includes(escort),
  )

  return (
    <Layout>
      <div className="bg-secondary text-primary">
        {/* Filter Section */}
        <Filter />

        {/* Banner */}
        <div className="bg-accent text-secondary py-12">
          <div className="vogue-container text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Escort Blue: Your Trusted Source for Premium Escorts.
            </h1>
            <p className="text-xl md:text-2xl">
              Mordern, secure platform for New Zealand's top escorts..
            </p>
          </div>
        </div>

        <div className="vogue-container py-16">
          {/* Stories Section */}
          <StoriesSection stories={stories} />

          {/* Premium Escorts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Premium Escorts</h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4">
                {premiumEscorts.map(escort => (
                  <EscortCard key={escort.id} escort={escort} premium={true} />
                ))}
              </div>
            </div>
          </div>

          {/* Regular Escorts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">All Escorts</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {escorts.map(escort => (
                <EscortCard key={escort.id} escort={escort} premium={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
