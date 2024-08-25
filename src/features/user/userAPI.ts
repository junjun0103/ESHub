import type { Escort } from "../../types"
import { getDocuments } from "../../utils/firebase"

const mockEscorts: Escort[] = [
  {
    id: "escort-001",
    userId: "1",
    name: "Sophia",
    age: 28,
    greeting: "Hey",
    aboutMe:
      "Sophia is a charismatic and elegant companion, perfect for any occasion.",
    timeTable: [{ day: "Monday", from: "7AM", untill: "7PM" }],
    availability: "MON 7AM to 7PM\nTUE 7AM to 7PM",
    suburb: "Bondi Beach",
    location: "Sydney",
    baseServices: ["GFE", "Dinner Dates", "Overnights"],
    extraServices: ["GFE", "Dinner Dates", "Overnights"],
    profilePhotos: [
      "https://example.com/photos/sophia1.jpg",
      "https://example.com/photos/sophia2.jpg",
      "https://example.com/photos/sophia3.jpg",
    ],
    detailPhotos: [
      "https://example.com/photos/sophia1.jpg",
      "https://example.com/photos/sophia2.jpg",
      "https://example.com/photos/sophia3.jpg",
      "https://example.com/photos/sophia4.jpg",
    ],
    videos: [
      "https://example.com/videos/sophia1.mp4",
      "https://example.com/videos/sophia2.mp4",
    ],
    contacts: [
      {
        name: "SMS",
        detail: "012321029",
      },
    ],
    ethnicity: "Australian",
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
    ratesTable: [
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
    ratesDescription: "1hr:60;2hr:120",
    paymentPlan: {
      tier: "Premium",
      duration: "3 months",
      startDate: new Date("2024-08-20T18:00:00Z"),
      endDate: new Date(
        new Date("2024-08-20T18:00:00Z").getTime() + 24 * 60 * 60 * 1000,
      ),
    },
    verificationStatus: "verified",
    verifiedDate: Date.now(),
    isProfileActive: false,
    isReviewActive: true,
    isPreferencesActive: true,
    isSpecialEventActive: true,
    eventDescription: "An elegant evening at the opera",
    occupation: "Model",
    escortType: "Luxury",
    serviceType: "Full Service",
    favoritePosition: "Doggy Style",
    oralPreference: "Receive",
    experiencePace: "Slow and Sensual",
    touchPreference: "Soft",
    roleplayPreference: "Boss and Secretary",
    lastUpdate: new Date("2024-08-20T18:00:00Z"),
    LastLogin: new Date("2024-08-20T18:00:00Z"),
    createdAt: new Date("2024-08-20T18:00:00Z"),
    latitude: -33.8568,
    longitude: 151.2153,
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

export const updateFavorite = async (
  userId: string,
  escortId: string,
  isFavorite: boolean,
): Promise<void> => {
  console.log("JUN updateFavorite", userId, escortId, isFavorite)
  // Update favorite status in database
}

export const updateLike = async (
  userId: string,
  escortId: string,
  isLiked: boolean,
): Promise<void> => {
  console.log("JUN updateLike", userId, escortId, isLiked)
  // Update like status in database
}
