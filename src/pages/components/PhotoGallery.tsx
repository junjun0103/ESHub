import type React from "react"
import { useState } from "react"

interface PhotoGalleryProps {
  photos: string[]
  name: string
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, name }) => {
  const [mainPhoto, setMainPhoto] = useState(photos[0])

  return (
    <div>
      <img
        src={mainPhoto}
        alt={name}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <div className="grid grid-cols-5 gap-2">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`${name} ${index + 1}`}
            className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
            onClick={() => setMainPhoto(photo)}
          />
        ))}
      </div>
    </div>
  )
}

export default PhotoGallery
