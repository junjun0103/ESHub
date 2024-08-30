import type React from "react"
import type { Story } from "../../types"

interface StoriesComponentProps {
  stories: Story[]
}

const StoriesComponent: React.FC<StoriesComponentProps> = ({ stories }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {stories?.map((story, index) => (
        <div key={index} className="flex-shrink-0 w-20">
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
        </div>
      ))}
    </div>
  )
}

export default StoriesComponent
