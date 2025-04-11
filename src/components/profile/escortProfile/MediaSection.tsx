import type React from "react"
import { useState } from "react"
import type { Escort } from "../../../types"
import type {
  MediaTypes,
  uploadEscortMediaInput,
} from "../../../types/functionTypes"
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { message } from "antd"
import { httpsCallable } from "firebase/functions"
import { functions } from "../../../firebase/config"

interface MediaSectionProps {
  profile: Escort | null
  onUpdate: (input: uploadEscortMediaInput) => Promise<any> 
}

const MediaSection: React.FC<MediaSectionProps> = ({ profile, onUpdate }) => {
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState<MediaTypes>("profilePhotos")

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: MediaTypes,
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const uploadInput: uploadEscortMediaInput = {
        files: Array.from(files),
        mediaType: type
      };
      
      await onUpdate(uploadInput);
      message.success(`${type} uploaded successfully`);
    } catch (error) {
      console.error("Error uploading files:", error)
      message.error("Failed to upload files");
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveMedia = async (url: string, type: MediaTypes) => {
    setUploading(true)
    try {
      // Extract the file path from the URL
      // The URL format should be: https://storage.googleapis.com/BUCKET_NAME/escorts/YEAR/ESCORT_ID/mediaType/MONTH/FILENAME
      const urlObj = new URL(url)
      const pathName = urlObj.pathname
      // Remove the leading slash and the bucket name part
      const filePath = pathName.substring(pathName.indexOf("/", 1) + 1)

      // Call the Firebase function to delete the media
      const deleteMedia = httpsCallable(functions, "escortMedia-deleteMedia")
      const result = await deleteMedia({
        filePath: filePath,
        mediaType: type,
      })

      const data = result.data as {
        success: boolean
        updatedUrls: string[]
      }

      if (data.success) {
        // The Firebase function has already updated the database
        message.success("Media deleted successfully")
      } else {
        message.error("Failed to delete media")
      }
    } catch (error) {
      console.error("Error removing media:", error)
      message.error("Failed to remove media file")
    } finally {
      setUploading(false)
    }
  }

  const renderUploadButton = (type: MediaTypes) => (
    <label className="vogue-button flex items-center justify-center w-full py-3 mb-4">
      <CameraIcon className="w-5 h-5 mr-2" />
      {type === "videos" ? "Upload Video" : `Upload ${type} Photo`}
      <input
        type="file"
        onChange={e => handleFileUpload(e, type)}
        accept={type === "videos" ? "video/*" : "image/*"}
        multiple
        className="hidden"
        disabled={uploading}
      />
    </label>
  )

  const renderMediaGrid = (mediaList: string[], type: MediaTypes) => (
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
            disabled={uploading}
          >
            <XMarkIcon className="w-4 h-4 text-secondary" />
          </button>
        </div>
      ))}
    </div>
  )

  const tabs: Array<MediaTypes> = [
    "profilePhotos",
    "detailPhotos",
    "selfiePhotos",
    "videos",
  ]

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
              disabled={uploading}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {renderUploadButton(activeTab)}
        {renderMediaGrid(
          (profile?.[activeTab] as string[]) || [],
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