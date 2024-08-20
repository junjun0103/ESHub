import type { Escort } from "../../types"
import { getDocuments } from "../../utils/firebase"

const mockEscorts: Escort[] = [
  {
    id: "escort-001",
    userId: "1",
    name: "Sophia",
    age: 28,
    greeting: "Hey",
    about:
      "Sophia is a charismatic and elegant companion, perfect for any occasion.",
    suburb: "Bondi Beach",
    region: "Sydney",
    services: ["GFE", "Dinner Dates", "Overnights"],
    hourlyRate: 500,
    profilePhotos: [
      "https://example.com/photos/sophia1.jpg",
      "https://example.com/photos/sophia2.jpg",
      "https://example.com/photos/sophia3.jpg",
    ],
    photos: [
      "https://example.com/photos/sophia1.jpg",
      "https://example.com/photos/sophia2.jpg",
      "https://example.com/photos/sophia3.jpg",
      "https://example.com/photos/sophia4.jpg",
    ],
    videos: [
      "https://example.com/videos/sophia1.mp4",
      "https://example.com/videos/sophia2.mp4",
    ],
    nationality: "Australian",
    height: 170,
    weight: 55,
    hairColor: "Blonde",
    hairLength: "Long",
    bustSize: "34C",
    bodyType: "Slim",
    smoker: false,
    languages: [
      { name: "English", level: "Fluent" },
      { name: "French", level: "Basic" },
    ],
    priceTable: [
      {
        duration: 60,
        incall: 500,
        outcall: 550,
        description: "1 Hour Service",
      },
      {
        duration: 120,
        incall: 900,
        outcall: 950,
        description: "2 Hour Service",
      },
    ],
    paymentPlan: {
      tier: "Premium",
      duration: "3 months",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    },
    verificationStatus: "verified",
    verifiedDate: Date.now(),
    isProfileActive: false,
    isReviewActive: true,
    eventDescription: "An elegant evening at the opera",
    occupation: "Model",
    escortType: "Luxury",
    serviceType: "Full Service",
    favoritePosition: "Doggy Style",
    oralPreference: "Receive",
    experiencePace: "Slow and Sensual",
    touchPreference: "Soft",
    roleplayPreference: "Boss and Secretary",
  },
]

export const fetchUserEscortProfile = async (
  userId: string,
  useMockData: boolean = false,
): Promise<Escort> => {
  console.log("JUN fetchUserEscortProfile", userId, useMockData)

  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const escort = mockEscorts.find(e => e.userId === userId)
    if (escort) {
      return escort
    } else {
      throw new Error("Escort profile not found")
    }
  } else {
    const escorts = (await getDocuments("escorts")) as Escort[]
    const escort = escorts.find(e => e.userId === userId)
    if (escort) {
      return escort
    } else {
      throw new Error("Escort profile not found")
    }
  }
}
