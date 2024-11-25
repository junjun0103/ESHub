import type React from "react"
import { useState } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import type { Escort } from "../../types"

interface Props {
  escort: Escort
}

const DetailPhotoGallerySection: React.FC<Props> = ({ escort }) => {
  const [galleryView, setGalleryView] = useState<"small" | "big">("small")

  const renderMobileGallery = () => {
    if (galleryView === "small") {
      return (
        <div className="grid grid-cols-2 gap-2">
          {escort.detailPhotos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${escort.name} detail ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          ))}
        </div>
      )
    } else {
      return (
        <div className="space-y-2">
          {escort.detailPhotos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${escort.name} detail ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          ))}
        </div>
      )
    }
  }

  const renderDesktopGallery = () => (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="10px">
        {escort.detailPhotos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`${escort.name} detail ${index + 1}`}
            style={{ width: "100%", display: "block", borderRadius: "4px" }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )

  return (
    <section id="photos" className="mb-20">
      <h2 className="vogue-heading text-4xl mb-8">Photo Gallery</h2>

      {/* Mobile view with tabs */}
      <div className="md:hidden mb-4">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-2 px-4 text-center ${galleryView === "small" ? "bg-primary text-secondary" : "bg-secondary text-primary"}`}
            onClick={() => setGalleryView("small")}
          >
            Small Gallery
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${galleryView === "big" ? "bg-primary text-secondary" : "bg-secondary text-primary"}`}
            onClick={() => setGalleryView("big")}
          >
            Big Gallery
          </button>
        </div>
        {renderMobileGallery()}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">{renderDesktopGallery()}</div>
    </section>
  )
}

export default DetailPhotoGallerySection
