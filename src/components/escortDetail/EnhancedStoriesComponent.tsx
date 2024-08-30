import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Story } from "../../types"

interface EnhancedStoriesComponentProps {
  stories: Story[]
}

const EnhancedStoriesComponent: React.FC<EnhancedStoriesComponentProps> = ({
  stories,
}) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)

  return (
    <div className="mb-8">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-20 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedStory(story)}
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent-gold">
              <img
                src={story.imageUrls[0]}
                alt={story.description}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center mt-2 text-sm truncate">
              {story.description}
            </p>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={() => setSelectedStory(null)}
          >
            <div className="bg-gray-800 p-4 rounded-lg max-w-lg w-full">
              <img
                src={selectedStory.imageUrls[0]}
                alt={selectedStory.description}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-white">{selectedStory.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EnhancedStoriesComponent
