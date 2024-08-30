import type React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import type { Escort } from "../../types"

const PremiumSection: React.FC<{ escorts: Escort[] }> = ({ escorts }) => {
  const premiumEscorts = escorts.slice(0, 8) // Show 8 premium escorts

  return (
    <section className="mb-8">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {premiumEscorts.map(escort => (
          <SwiperSlide key={escort.id}>
            <div className="bg-secondary rounded-lg overflow-hidden shadow-lg group">
              <div className="relative">
                <img
                  src={escort.profilePhotos[0]}
                  alt={escort.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="font-bold text-lg text-white">
                    {escort.name}
                  </h3>
                  <p className="text-white">{escort.location}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default PremiumSection
