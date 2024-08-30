import type React from "react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Layout from "../components/common/Layout"
import PremiumSection from "../components/home/PremiumSection"
import EscortsSection from "../components/home/EscortsSection"
import {
  selectEscortsStatus,
  setEscorts,
  setStatus,
} from "../features/escorts/escortsSlice"
import { setStories } from "../features/stories/storiesSlice"
import { fetchEscorts } from "../features/escorts/escortsAPI"
import { fetchStories } from "../features/stories/storiesAPI"
import NavFilterSection from "../components/home/NavFilterSection"
import EnhancedStoriesComponent from "../components/escortDetail/EnhancedStoriesComponent"

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectEscortsStatus)
  const escorts = useAppSelector(state => state.escorts.escorts)
  const stories = useAppSelector(state => state.stories.items)

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

  return (
    <Layout>
      <div className="space-y-8">
        <section className="mb-8 mt-11">
          <EnhancedStoriesComponent stories={stories} />
        </section>
        <section className="mb-8 mt-11">
          <PremiumSection escorts={escorts} />
        </section>
        <NavFilterSection />
        <section className="mb-8 mt-11">
          {status === "loading" && <p>Loading escorts...</p>}
          {status === "failed" && (
            <p>Failed to load escorts. Please try again later.</p>
          )}
          {status === "idle" && <EscortsSection />}
        </section>
      </div>
    </Layout>
  )
}

export default Home
