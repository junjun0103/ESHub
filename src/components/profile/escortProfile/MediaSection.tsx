import type React from "react"
import { useState } from "react"
import type { Escort } from "../../../types"
import type { mediaTypes } from "../../../types/functionTypes"
import { uploadFile } from "../../../utils/firebase"
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface MediaSectionProps {
  profile: Escort | null
  onUpdate: (updatedData: Partial<Escort>) => void
}

const MediaSection: React.FC<MediaSectionProps> = ({ profile, onUpdate }) => {
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState<mediaTypes>("profile")

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: mediaTypes,
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newMediaUrls: string[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileName = `${Date.now()}_${file.name}`
        const path = `escorts/${profile?.id}/${type}s/${fileName}`
        const url = await uploadFile(path, file)
        newMediaUrls.push(url)
      }

      switch (type) {
        case "profile":
          onUpdate({
            profilePhotos: [
              ...(profile?.profilePhotos || []),
              ...newMediaUrls,
            ].slice(0, 3),
          })
          break
        case "detail":
          onUpdate({
            detailPhotos: [
              ...(profile?.detailPhotos || []),
              ...newMediaUrls,
            ].slice(0, 10),
          })
          break
        case "selfie":
          onUpdate({
            selfiePhotos: [
              ...(profile?.selfiePhotos || []),
              ...newMediaUrls,
            ].slice(0, 10),
          })
          break
        case "videos":
          onUpdate({
            videos: [...(profile?.videos || []), ...newMediaUrls].slice(0, 3),
          })
          break
      }
    } catch (error) {
      console.error("Error uploading files:", error)
      // You might want to show an error message to the user here
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveMedia = (url: string, type: mediaTypes) => {
    switch (type) {
      case "profile":
        onUpdate({
          profilePhotos:
            profile?.profilePhotos?.filter(photo => photo !== url) || [],
        })
        break
      case "detail":
        onUpdate({
          detailPhotos:
            profile?.detailPhotos?.filter(photo => photo !== url) || [],
        })
        break
      case "selfie":
        onUpdate({
          selfiePhotos:
            profile?.selfiePhotos?.filter(photo => photo !== url) || [],
        })
        break
      case "videos":
        onUpdate({
          videos: profile?.videos?.filter(video => video !== url) || [],
        })
        break
    }
    // You might also want to delete the file from Firebase Storage here
  }

  const renderUploadButton = (type: mediaTypes) => (
    <label className="vogue-button flex items-center justify-center w-full py-3 mb-4">
      <CameraIcon className="w-5 h-5 mr-2" />
      {type === "videos" ? "Upload Video" : `Upload ${type} Photo`}
      <input
        type="file"
        onChange={e => handleFileUpload(e, type)}
        accept={type === "videos" ? "video/*" : "image/*"}
        multiple
        className="hidden"
      />
    </label>
  )

  const renderMediaGrid = (mediaList: string[], type: mediaTypes) => (
    <div className="grid grid-cols-2 gap-4">
      {mediaList.map((media, index) => (
        <div key={index} className="relative group aspect-square">
          {type === "videos" ? (
            <video
              src={media}
              className="w-full h-full object-cover"
              controls
            />
          ) : (
            <img
              src={media}
              alt={`${type} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          )}
          <button
            onClick={() => handleRemoveMedia(media, type)}
            className="absolute top-2 right-2 bg-accent p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label={`Remove ${type}`}
          >
            <XMarkIcon className="w-4 h-4 text-secondary" />
          </button>
        </div>
      ))}
    </div>
  )

  const tabs: Array<mediaTypes> = ["profile", "detail", "selfie", "videos"]

  return (
    <div className="vogue-container">
      <h2 className="vogue-heading text-2xl mb-6">Manage Media</h2>

      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 md:space-x-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm whitespace-nowrap transition-all duration-300 ${
                activeTab === tab
                  ? "vogue-button"
                  : "text-primary hover:bg-gray-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {renderUploadButton(activeTab)}
        {renderMediaGrid(
          (profile?.[`${activeTab}Photos` as keyof Escort] as string[]) || [],
          activeTab,
        )}
      </div>

      {uploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-gray-900">Uploading... Please wait.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaSection
