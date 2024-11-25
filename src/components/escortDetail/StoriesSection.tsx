import type React from "react"
import { useState, useEffect } from "react"
import type { Story, StoryEntry } from "../../types"
import StoryModal from "./StoryModal"
import { truncateDescription } from "./Helper"

interface StoriesSectionProps {
  stories: Story
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ stories }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null,
  )

  const storyEntriesArray: StoryEntry[] = Object.values(
    stories.storyEntries || {},
  )

  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    storyEntriesArray.map(() => 0),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes(prevIndexes =>
        prevIndexes.map(
          (currentIndex, storyIndex) =>
            (currentIndex + 1) % storyEntriesArray[storyIndex].imageUrls.length,
        ),
      )
    }, 1000) // Change image every 1 second

    return () => clearInterval(interval)
  }, [storyEntriesArray])

  const openStory = (index: number) => {
    setSelectedStoryIndex(index)
  }

  const closeStory = () => {
    setSelectedStoryIndex(null)
  }

  return (
    <section className="py-8">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {storyEntriesArray.map((storyEntry, index) => (
          <button
            key={storyEntry.id}
            onClick={() => openStory(index)}
            className="flex-shrink-0 focus:outline-none"
          >
            <img
              src={storyEntry.imageUrls[currentImageIndexes[index]]}
              alt={`Story ${index + 1}`}
              className="w-24 h-24 rounded-full object-cover border-2 border-accent"
            />
            <p className="text-sm overflow-hidden">
              {truncateDescription(storyEntry.description, 10)}
            </p>
          </button>
        ))}
      </div>
      {selectedStoryIndex !== null && (
        <StoryModal
          stories={storyEntriesArray}
          initialStoryIndex={selectedStoryIndex}
          onClose={closeStory}
        />
      )}
    </section>
  )
}

export default StoriesSection
