import type React from "react"
import { useState } from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectUser } from "../../../features/user/userSlice"
import { addStory, deleteStory } from "../../../features/stories/storiesAPI"
import { uploadFile } from "../../../utils/firebase"
import type { Story, Escort, StoryEntry } from "../../../types"
import {
  checkMandatoryFields,
  areMandatoryFieldsComplete,
} from "../../../utils/profileHelper"
import {
  PlusIcon,
  TrashIcon,
  EyeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"

interface StoriesSectionProps {
  profile: Escort
  story: Story | null
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ profile, story }) => {
  const user = useAppSelector(selectUser)
  const [newStoryImages, setNewStoryImages] = useState<File[]>([])
  const [newStoryDescription, setNewStoryDescription] = useState("")
  const [uploading, setUploading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 3) // Limit to 5 files
      setNewStoryImages(filesArray)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newStoryImages.length === 0 || !user) return

    if (
      profile?.paymentPlan?.tier !== "Premium" &&
      profile?.paymentPlan?.tier !== "Diamond"
    ) {
      alert("Only premium and diamond members can upload stories.")
      return
    }
  }

  const handleDeleteStory = (storyId: string) => {
    deleteStory(storyId)
  }

  const getTimeLeft = (expiresAt: number): string => {
    const timeLeft = expiresAt - Date.now()
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))

    if (hoursLeft > 0) {
      return `${hoursLeft} hour${hoursLeft > 1 ? "s" : ""} left`
    } else {
      const minutesLeft = Math.floor(timeLeft / (1000 * 60))
      return minutesLeft > 0
        ? `${minutesLeft} minute${minutesLeft > 1 ? "s" : ""} left`
        : "Expiring soon"
    }
  }

  const getWordCount = (str: string) => {
    const trimmedStr = str.trim()
    return trimmedStr === "" ? 0 : trimmedStr.length
  }

  return (
    <div className="vogue-container">
      <h2 className="vogue-heading text-2xl mb-6">Stories</h2>
      <p className="text-center text-gray-500 mb-4 text-sm">
        You can upload up to 3 stories per day. Stories will be removed after 24
        hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="vogue-button w-full flex items-center justify-center cursor-pointer">
            <PlusIcon className="h-5 w-5 mr-2" />
            Upload Images (Max 3)
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {newStoryImages.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {newStoryImages.length} image(s) selected
            </p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="vogue-subheading block mb-2">
            Story Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              value={newStoryDescription}
              onChange={e => {
                if (getWordCount(e.target.value) <= 100) {
                  setNewStoryDescription(e.target.value)
                }
              }}
              maxLength={100}
              rows={3}
              className="vogue-input w-full pr-16"
              placeholder="Describe your story (max 100 characters)"
            />
            <div className="absolute right-2 bottom-2 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
              {getWordCount(newStoryDescription)}/100
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={newStoryImages.length === 0 || uploading}
          className="vogue-button w-full"
        >
          {uploading ? "Uploading..." : "Add Story"}
        </button>
      </form>

      <div className="space-y-4">
        {Object.values(story?.storyEntries || {}).map((entry: StoryEntry) => (
          <div
            key={entry.id}
            className="bg-gray-100 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={entry.imageUrls[0]}
              alt="Story"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm mb-2">{entry.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {getTimeLeft(entry.expiresAt)}
                </span>
                <span className="flex items-center">
                  <EyeIcon className="h-4 w-4 mr-1" />
                  {entry.views} views
                </span>
              </div>
              <button
                onClick={() => handleDeleteStory(entry.id)}
                className="vogue-button-secondary w-full mt-2 flex items-center justify-center"
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete Story
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StoriesSection
