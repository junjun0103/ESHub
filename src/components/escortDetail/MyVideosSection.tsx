import type React from "react"
import { useState } from "react"
import VideoModal from "./VideoModal"

interface MyVideosSectionProps {
  videos: string[]
}

const MyVideosSection: React.FC<MyVideosSectionProps> = ({ videos }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null,
  )

  const handleNext = () => {
    if (selectedVideoIndex !== null) {
      setSelectedVideoIndex(prevIndex =>
        prevIndex === videos.length - 1 ? 0 : prevIndex || 0 + 1,
      )
    }
  }

  const handlePrev = () => {
    if (selectedVideoIndex !== null) {
      setSelectedVideoIndex(prevIndex =>
        prevIndex === 0 ? videos.length - 1 : prevIndex || 0 - 1,
      )
    }
  }

  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <section className="mb-20">
      <h2 className="vogue-heading text-4xl mb-8">My Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="aspect-w-16 aspect-h-9 relative">
            <video
              src={video}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setSelectedVideoIndex(index)}
            />
          </div>
        ))}
      </div>
      {selectedVideoIndex !== null && (
        <VideoModal
          videoSrc={videos[selectedVideoIndex]}
          onClose={() => setSelectedVideoIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  )
}

export default MyVideosSection
