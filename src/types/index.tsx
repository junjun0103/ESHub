// User
export interface User {
  id: string
  email: string
  userType: "escort" | "customer"
  name: string
  vipMembership?: VIPMembership
}

export interface VIPMembership {
  startDate: string
  endDate: string
}

// Stories
export interface Story {
  id: string
  userId: string
  imageUrls: string[]
  description: string
  createdAt: number
  expiresAt: number // 24 hours after createdAt
  suburb: string
  region: string
  views: number
}

// Escort
export interface Escort {
  id: string
  userId: string
  name: string
  age: number
  greeting?: string
  about: string
  suburb: string
  region: string
  services: string[]
  hourlyRate: number
  profilePhotos: string[] // Maximum 3 photos
  photos: string[] // Maximum 10 photos
  videos?: string[] // Maximum 3 videos
  nationality?: string
  height: number
  weight: number
  hairColor?: string
  hairLength?: string
  bustSize?: string
  bodyType?: string
  smoker?: boolean
  languages?: Array<Language>
  priceTable?: PriceEntry[]
  paymentPlan?: {
    tier: "Standard" | "Premium" | "Diamond"
    duration: string
    startDate: string
    endDate: string
  }
  isProfileActive?: boolean
  isReviewActive?: boolean
  verificationStatus?: "unverified" | "pending" | "verified"
  verifiedDate?: number
  specialEvent?: boolean
  eventDescription?: string
  occupation?: string
  escortType?: string
  serviceType?: string
  favoritePosition?: string
  oralPreference?: string
  experiencePace?: string
  touchPreference?: string
  roleplayPreference?: string
}

// PriceTable
export interface PriceEntry {
  duration: number
  incall: number
  outcall: number
  description: string
}

// Information
export interface Language {
  name: string
  level: string
}
