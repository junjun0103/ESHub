import { getDocuments } from '../../utils/firebase';
import type { Escort } from '../../types';

// Mock data
const mockEscorts: Escort[] = [
  {
    id: "escort-001",
    userId: '1',
    name: "Sophia",
    age: 28,
    about: "Sophia is a charismatic and elegant companion, perfect for any occasion.",
    suburb: "Bondi Beach",
    region: "Sydney",
    services: ["GFE", "Dinner Dates", "Overnights"],
    hourlyRate: 500,
    profilePhotos: [
      "https://example.com/photos/sophia1.jpg",
      "https://example.com/photos/sophia2.jpg",
      "https://example.com/photos/sophia3.jpg"
    ],
    photos: [
      "https://example.com/photos/sophia1.jpg",
      "https://example.com/photos/sophia2.jpg",
      "https://example.com/photos/sophia3.jpg",
      "https://example.com/photos/sophia4.jpg"
    ],
    videos: [
      "https://example.com/videos/sophia1.mp4",
      "https://example.com/videos/sophia2.mp4"
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
      { name: "French", level: "Basic" }
    ],
    priceTable: [
      { duration: 60, incall: 500, outcall: 550, description: "1 Hour Service" },
      { duration: 120, incall: 900, outcall: 950, description: "2 Hour Service" }
    ],
    paymentPlan: {
      tier: "Premium",
      duration: "3 months",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    },
    verificationStatus: 'verified',
    verifiedDate: Date.now(),
    isProfileActive: true,
    isReviewActive: true,

    // New properties
    eventDescription: "An elegant evening at the opera",
    occupation: "Model",
    escortType: "Luxury",
    serviceType: "Full Service",
    favoritePosition: "Doggy Style",
    oralPreference: "Receive",
    experiencePace: "Slow and Sensual",
    touchPreference: "Soft",
    roleplayPreference: "Boss and Secretary"
  },
  {
    id: "escort-002",
    userId: '2',
    name: "Mia",
    age: 25,
    about: "Mia brings youthful energy and sophistication to every engagement.",
    suburb: "Melbourne CBD",
    region: "Melbourne",
    services: ["Massage", "Couples"],
    hourlyRate: 450,
    profilePhotos: [
      "https://example.com/photos/mia1.jpg",
      "https://example.com/photos/mia2.jpg"
    ],
    photos: [
      "https://example.com/photos/mia1.jpg",
      "https://example.com/photos/mia2.jpg",
      "https://example.com/photos/mia3.jpg"
    ],
    videos: [
      "https://example.com/videos/mia1.mp4"
    ],
    nationality: "British",
    height: 165,
    weight: 52,
    hairColor: "Brunette",
    hairLength: "Medium",
    bustSize: "32B",
    bodyType: "Athletic",
    smoker: false,
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Spanish", level: "Conversational" }
    ],
    priceTable: [
      { duration: 60, incall: 450, outcall: 500, description: "1 Hour Service" },
      { duration: 180, incall: 1200, outcall: 1250, description: "3 Hour Service" }
    ],
    paymentPlan: {
      tier: "Standard",
      duration: "1 month",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    },
    verificationStatus: 'pending',
    verifiedDate: Date.now(),
    isProfileActive: true,
    isReviewActive: false,

    // New properties
    eventDescription: "A romantic dinner in the city",
    occupation: "Student",
    escortType: "Girlfriend Experience",
    serviceType: "Massage",
    favoritePosition: "Missionary",
    oralPreference: "Give",
    experiencePace: "Passionate",
    touchPreference: "Firm",
    roleplayPreference: "Teacher and Student"
  },
  {
    id: "escort-003",
    userId: '3',
    name: "Emily",
    age: 30,
    about: "Emily is an experienced and charming companion, always ready to impress.",
    suburb: "Surfers Paradise",
    region: "Gold Coast",
    services: ["GFE", "Fetishes"],
    hourlyRate: 600,
    profilePhotos: [
      "https://example.com/photos/emily1.jpg",
      "https://example.com/photos/emily2.jpg",
      "https://example.com/photos/emily3.jpg"
    ],
    photos: [
      "https://example.com/photos/emily1.jpg",
      "https://example.com/photos/emily2.jpg",
      "https://example.com/photos/emily3.jpg",
      "https://example.com/photos/emily4.jpg",
      "https://example.com/photos/emily5.jpg"
    ],
    videos: [
      "https://example.com/videos/emily1.mp4",
      "https://example.com/videos/emily2.mp4"
    ],
    nationality: "American",
    height: 168,
    weight: 57,
    hairColor: "Black",
    hairLength: "Short",
    bustSize: "36D",
    bodyType: "Curvy",
    smoker: true,
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Italian", level: "Basic" }
    ],
    priceTable: [
      { duration: 60, incall: 600, outcall: 650, description: "1 Hour Service" },
      { duration: 240, incall: 2000, outcall: 2100, description: "4 Hour Service" }
    ],
    paymentPlan: {
      tier: "Diamond",
      duration: "6 months",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    },
    verificationStatus: 'verified',
    verifiedDate: Date.now(),
    isProfileActive: true,
    isReviewActive: true,

    // New properties
    eventDescription: "A wild night out in the city",
    occupation: "Actress",
    escortType: "Fetish",
    serviceType: "Specialized",
    favoritePosition: "Cowgirl",
    oralPreference: "Receive",
    experiencePace: "Fast",
    touchPreference: "Soft and Gentle",
    roleplayPreference: "Doctor and Patient"
  },
  // Add more mock data as needed
];



export const fetchEscorts = async (useMockData: boolean = false): Promise<Escort[]> => {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockEscorts;
  } else {
    // Fetch real data from Firebase
    return await getDocuments('escorts') as Escort[];
  }
};