import type React from "react"
import { useState, useEffect } from "react"
import type { Story } from "../../types"
import StoryModal from "./StoryModal"
import { truncateDescription } from "./Helper"

interface StoriesSectionProps {
  stories: Story[]
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ stories }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null,
  )
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    stories.map(() => 0),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes(prevIndexes =>
        prevIndexes.map(
          (currentIndex, storyIndex) =>
            (currentIndex + 1) % stories[storyIndex].imageUrls.length,
        ),
      )
    }, 1000) // Change image every 1 second

    return () => clearInterval(interval)
  }, [stories])

  const openStory = (index: number) => {
    setSelectedStoryIndex(index)
  }

  const closeStory = () => {
    setSelectedStoryIndex(null)
  }

  return (
    <section className="py-8">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => openStory(index)}
            className="flex-shrink-0 focus:outline-none"
          >
            <img
              src={story.imageUrls[currentImageIndexes[index]]}
              alt={`Story ${index + 1}`}
              className="w-24 h-24 rounded-full object-cover border-2 border-accent"
            />
            <p className="text-sm overflow-hidden">
              {truncateDescription(story.description, 10)}
            </p>
          </button>
        ))}
      </div>
      {selectedStoryIndex !== null && (
        <StoryModal
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
          onClose={closeStory}
        />
      )}
    </section>
  )
}

export default StoriesSection
