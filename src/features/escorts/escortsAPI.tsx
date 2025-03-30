import { getDocuments, getDocument } from "../../utils/firebase"
import type { Escort } from "../../types"

// Mock data
const escortIds = [
  { id: "1", name: "Sophia" },
  { id: "2", name: "Emma" },
  { id: "3", name: "Olivia" },
  { id: "4", name: "Ava" },
  { id: "5", name: "Isabella" },
  { id: "6", name: "Mia" },
  { id: "7", name: "Zoe" },
  { id: "8", name: "Lily" },
  { id: "9", name: "Emily" },
  { id: "10", name: "Madison" },
  { id: "11", name: "Avery" },
  { id: "12", name: "Ella" },
  { id: "13", name: "Scarlett" },
  { id: "14", name: "Grace" },
  { id: "15", name: "Chloe" },
  { id: "16", name: "Victoria" },
  { id: "17", name: "Riley" },
  { id: "18", name: "Aria" },
  { id: "19", name: "Layla" },
  { id: "20", name: "Brooklyn" },
]
const mockEscorts: Escort[] = escortIds.map(item => ({
  id: `escort-00${item.id}`,
  userId: item.id,
  greeting: "Hey",
  name: "Sophia",
  age: 28,
  aboutMe:
    "Sophia is a charismatic and elegant companion, perfect for any occasion.",
  timeTable: [{ day: "Monday", from: "7AM", until: "7PM" }],
  availability: "MON 7AM to 7PM\nTUE 7AM to 7PM",
  suburb: "Bondi Beach",
  location: "Sydney",
  baseServices: [
    "GFE",
    "Dinner Dates",
    "Overnights",
    "Travel",
    "PSE",
    "CIM",
    "COB",
    "COF",
    "DFK",
    "DT",
    "BBBJ",
    "MSOG",
    "Multiple Positions",
    "Mutual Oral",
    "Mutual Masturbation",
    "Sexy Lingerie",
    "Striptease",
    "Foot Fetish",
    "Light Bondage",
    "Role Play",
    "Spanking",
    "Golden Showers",
  ],
  extraServices: [
    "Couples",
    "Travel Companion",
    "Role Play",
    "Fetish",
    "Duo",
    "Bi Double",
    "Swingers",
    "Party Bookings",
    "BDSM",
    "PSE",
    "GFE",
    "Dinner Dates",
    "Overnights",
    "Travel",
    "CIM",
    "COB",
    "COF",
    "DFK",
    "DT",
    "BBBJ",
    "MSOG",
    "Multiple Positions",
    "Mutual Oral",
    "Mutual Masturbation",
    "Sexy Lingerie",
    "Striptease",
    "Foot Fetish",
    "Light Bondage",
    "Role Play",
    "Spanking",
    "Golden Showers",
  ],
  profilePhotos: [
    "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
    "https://media.istockphoto.com/id/1384332905/photo/beautiful-woman.jpg?s=1024x1024&w=is&k=20&c=aLHzETGK25Y5P-4HnH08Ur1j4qGGTnmVCLDU4swyNJc=",
    "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
  ],
  detailPhotos: [
    "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
    "https://sample-il.com/wp-content/uploads/2023/08/EmptyName-3.jpg",
    "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
    "https://media.istockphoto.com/id/1384332905/photo/beautiful-woman.jpg?s=1024x1024&w=is&k=20&c=aLHzETGK25Y5P-4HnH08Ur1j4qGGTnmVCLDU4swyNJc=",
    "https://media.istockphoto.com/id/1384332905/photo/beautiful-woman.jpg?s=1024x1024&w=is&k=20&c=aLHzETGK25Y5P-4HnH08Ur1j4qGGTnmVCLDU4swyNJc=",
    "https://sample-il.com/wp-content/uploads/2023/08/EmptyName-3.jpg",
    "https://media.istockphoto.com/id/1384332905/photo/beautiful-woman.jpg?s=1024x1024&w=is&k=20&c=aLHzETGK25Y5P-4HnH08Ur1j4qGGTnmVCLDU4swyNJc=",
  ],
  selfiePhotos: [
    "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
    "https://sample-il.com/wp-content/uploads/2023/08/EmptyName-3.jpg",
    "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
    "https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=1024x1024&w=is&k=20&c=rsMEfrDiYh3Y2CbJ8OQYRfJZ2kOGBneREKETBn0vyjU=",
    "https://media.istockphoto.com/id/1384332905/photo/beautiful-woman.jpg?s=1024x1024&w=is&k=20&c=aLHzETGK25Y5P-4HnH08Ur1j4qGGTnmVCLDU4swyNJc=",
    "https://media.istockphoto.com/id/1384332905/photo/beautiful-woman.jpg?s=1024x1024&w=is&k=20&c=aLHzETGK25Y5P-4HnH08Ur1j4qGGTnmVCLDU4swyNJc=",
    "https://sample-il.com/wp-content/uploads/2023/08/EmptyName-3.jpg",
    "https://media.istockphoto.com/id/1384332905/photo/beautiful-woman.jpg?s=1024x1024&w=is&k=20&c=aLHzETGK25Y5P-4HnH08Ur1j4qGGTnmVCLDU4swyNJc=",
    "https://media.istockphoto.com/id/1384332905/photo/beautiful-woman.jpg?s=1024x1024&w=is&k=20&c=aLHzETGK25Y5P-4HnH08Ur1j4qGGTnmVCLDU4swyNJc=",
    "https://sample-il.com/wp-content/uploads/2023/08/EmptyName-3.jpg",
  ],
  videos: [
    "https://www.quintic.com/software/sample_videos/One%20Point%20Export/Cricket%20Bowl.avi",
    "https://www.quintic.com/software/sample_videos/One%20Point%20Export/Cricket%20Batting%20-%201%20Point.avi",
  ],
  contacts: [
    {
      name: "SMS",
      detail: "012321029",
    },
    {
      name: "Email",
      detail: "test@gmail.com",
    },
    {
      name: "WhatsApp",
      detail: "012321029",
    },
    {
      name: "Telegram",
      detail: "012321029",
    },
    {
      name: "Instagram",
      detail: "012321029",
    },
    {
      name: "WeChat",
      detail: "012321029",
    },
    {
      name: "WEB",
      detail: "www.example.com",
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
  ratesDescription: "Rates are non-negotiable.",
  paymentPlan: {
    tier: "Premium",
    duration: "3 months",
    startDate: new Date("2024-08-20T18:00:00Z").toISOString(),
    endDate: new Date(
      new Date("2024-08-20T18:00:00Z").getTime() + 24 * 60 * 60 * 1000,
    ).toISOString(),
  },
  verificationStatus: "verified",
  verifiedDate: new Date("2024-08-20T18:00:00Z").toISOString(),
  isProfileActive: true,
  isReviewActive: true,
  isPreferencesActive: true,

  // New properties
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
  lastUpdate: new Date("2024-08-20T18:00:00Z").toISOString(),
  LastLogin: new Date("2024-08-20T18:00:00Z").toISOString(),
  createdAt: new Date("2024-08-20T18:00:00Z").toISOString(),
  latitude: -33.8568,
  longitude: 151.2153,
}))

export const fetchEscorts = async (
  useMockData: boolean = false,
): Promise<Escort[]> => {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockEscorts
  } else {
    // Fetch real data from Firebase
    return (await getDocuments("escorts")) as Escort[]
  }
}

export const fetchEscortById = async (
  id: string,
  useMockData: boolean = false,
): Promise<Escort | null> => {
  console.log("JUN", id, useMockData)

  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockEscorts.find(escort => escort.id === id) || null
  } else {
    const escort = (await getDocument("escort", id)) as Escort
    return escort
  }
}
