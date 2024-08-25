// User
export interface User {
  id: string
  email: string
  userType: "escort" | "customer" | "superAdmin"
  name: string
  vipMembership?: VIPMembership // for customer only
  favorites?: []
  likes?: []
  createdAt?: Date
}

export interface VIPMembership {
  tier: "Standard" | "Premium" | "Diamond"
  startDate: Date
  endDate: Date
}

// Stories
export interface Story {
  id: string
  userId: string
  imageUrls: string[]
  description: string
  createdAt: Date
  expiresAt: Date // 24 hours after createdAt
  suburb: string
  location: string
  latitude: number
  longitude: number
  views: number
}

// Escort
export interface Escort {
  id: string
  userId: string
  name: string
  age: number
  greeting?: string
  aboutMe: string
  timeTable: TimeTable[]
  availability: string
  suburb: string
  location: string
  latitude: number
  longitude: number
  baseServices: string[]
  extraServices?: string[]
  profilePhotos: string[] // Maximum 3 photos
  detailPhotos: string[] // Maximum 10 photos
  selfiePhotos?: string[] // Maximum 10 photos
  videos?: string[] // Maximum 3 videos
  ethnicity?: string
  contacts: Contact[]
  height: number
  weight: number
  hairColor?: string
  hairLength?: string
  bustSize?: string
  bodyType?: string
  smoker?: boolean
  languages?: Array<Language>
  ratesTable?: RatesEntry[]
  ratesDescription?: string
  paymentPlan?: {
    tier: "Standard" | "Premium" | "Diamond"
    duration: string
    startDate: Date
    endDate: Date
  }
  isProfileActive?: boolean
  isReviewActive?: boolean
  isPreferencesActive?: boolean
  verificationStatus?: "unverified" | "pending" | "verified"
  verifiedDate?: number
  isSpecialEventActive?: boolean
  eventDescription?: string
  occupation?: string
  escortType?: string
  serviceType?: string
  favoritePosition?: string
  oralPreference?: string
  experiencePace?: string
  touchPreference?: string
  roleplayPreference?: string
  likes?: number
  createdAt: Date
  lastUpdate: Date
  LastLogin: Date
}

// PriceTable
export interface RatesEntry {
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

export interface Contact {
  name: string
  detail: string
}

export interface TimeTable {
  day: string
  from: string
  untill: string
}

// QuestionAnswer
export interface QuestionAnswer {
  id: string
  writerUserId: string
  escortUserId: string
  escortId: string
  question: string
  answer?: {
    text: string
    isPrivate?: boolean
    createdAt: Date
  }
  isPrivate?: boolean
  createdAt: Date
}

// Review
export interface Review {
  id: string
  writerUserId: string
  escortUserId: string
  escortId: string
  review: string
  answer?: {
    text: string
    isPrivate?: boolean
    createdAt: Date
  }
  rating: ReviewRating[]
  isPrivate?: boolean
  createdAt: Date
}

export interface ReviewRating {
  id: string
  name: string
  rating: number
}
