import type React from "react"
import { useState, useEffect } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectEscorts } from "../../features/escorts/escortsSlice"
import InfiniteScroll from "react-infinite-scroll-component"

const EscortsSection: React.FC = () => {
  const allEscorts = useAppSelector(selectEscorts)
  const [displayedEscorts, setDisplayedEscorts] = useState(
    allEscorts.slice(0, 12),
  )
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreEscorts = () => {
    const currentLength = displayedEscorts.length
    const moreEscorts = allEscorts.slice(currentLength, currentLength + 12)
    if (moreEscorts.length === 0) {
      setHasMore(false)
    } else {
      setDisplayedEscorts([...displayedEscorts, ...moreEscorts])
    }
  }

  useEffect(() => {
    setDisplayedEscorts(allEscorts.slice(0, 12))
    setHasMore(allEscorts.length > 12)
  }, [allEscorts])

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">All Escorts</h2>
      <InfiniteScroll
        dataLength={displayedEscorts.length}
        next={fetchMoreEscorts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedEscorts.map(escort => (
            <div
              key={escort.id}
              className="bg-secondary rounded-lg overflow-hidden shadow-lg group"
            >
              <div className="relative">
                <img
                  src={escort.profilePhotos[0]}
                  alt={escort.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="font-bold text-lg text-white">
                    {escort.name}
                  </h3>
                  <p className="text-white">{escort.location}</p>
                  <p className="text-accent-gold">100/hour</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  )
}

export default EscortsSection
