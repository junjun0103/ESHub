//status
export type Status = "idle" | "loading" | "failed"

// User
export interface User {
  id: string
  email: string
  userType: "advertiser" | "client" | "superAdmin"
  name: string
  // vipMembership?: VIPMembership // for client only
  favorites?: []
  likes?: []
  createdAt?: number // Unix timestamp
  lastLogin?: number // Unix timestamp
  isActive?: boolean
}

// export interface VIPMembership {
//   tier: "Standard" | "Premium" | "Diamond"
//   startDate: number // Unix timestamp
//   endDate: number // Unix timestamp
// }

// Stories
export interface Story {
  id: string
  suburb?: string
  location?: string
  latitude?: number
  longitude?: number
  lastUpdate?: number
  storyEntries?: Record<string, StoryEntry>
}

export interface StoryEntry {
  id: string
  imageUrls: string[]
  description: string
  views: number
  createdAt: number
  expiresAt: number
}

export interface StoryIndex {
  id: string
  userId: string
  imageUrls: string[]
  description: string
  views: number
  createdAt: number
  expiresAt: number
}

// escort
export interface Escort {
  id: string
  name?: string // Make this required
  age?: number // Make this required
  greeting?: string
  aboutMe?: string
  occupation?: string
  escortType?: string
  serviceType?: string
  height?: string
  weight?: number
  hairColor?: string
  hairLength?: string
  bustSize?: string
  bodyType?: string
  smoker?: boolean
  timeTable?: TimeTable[] // Make this required
  availability?: string // Make this required
  baseServices?: string[] // Make this required
  extraServices?: string[]
  profilePhotos?: string[] // Maximum 3 photos
  detailPhotos?: string[] // Maximum 10 photos
  selfiePhotos?: string[] // Maximum 10 photos
  videos?: string[] // Maximum 3 videos
  ethnicity?: string
  contacts?: Contact[] // Make this required
  languages?: Language[] // Make this required
  ratesTable?: RatesEntry[] // Make this required
  ratesDescription?: string
  paymentPlan?: PaymentPlan
  isProfileActive?: boolean // Make this required
  isReviewActive?: boolean // Make this required
  isPreferencesActive?: boolean // Make this required
  verificationStatus?: VerificationStatus // Use enum
  verifiedDate?: number // Use timestamp
  isSpecialEventActive?: boolean // Make this required
  eventDescription?: string
  preferences?: EscortPreferences
  location?: string // Make this required
  address?: Address
  likes?: number // Make this required
  createdAt?: number // Use timestamp
  lastUpdate?: number // Use timestamp
  lastLogin?: number // Use timestamp
}

export interface Address {
  address?: string
  apartment?: string
  city?: string
  state?: string
  postcode?: string
  longitude?: number
  latitude?: number
}

export interface EscortPreferences {
  favoritePosition?: string
  oralPreference?: string
  experiencePace?: string
  touchPreference?: string
  roleplayPreference?: string
}

export interface PaymentPlan {
  tier: "Standard" | "Premium" | "Diamond"
  duration: string
  startDate: number // Use timestamp
  endDate: number // Use timestamp
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
  until: string
  status?: boolean
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
    createdAt: string
  }
  isPrivate?: boolean
  createdAt: string
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
    createdAt: string
  }
  rating: ReviewRating[]
  isPrivate?: boolean
  createdAt: string
}

export interface ReviewRating {
  name: string
  rating: number
}

export enum VerificationStatus {
  Unverified = "unverified",
  Pending = "pending",
  Verified = "verified",
}

export const locationOptions = [
  { value: "Auckland", label: "Auckland" },
  { value: "Whangārei", label: "Whangārei" },
  { value: "Kerikeri", label: "Kerikeri" },
  { value: "Dargaville", label: "Dargaville" },
  { value: "Hamilton", label: "Hamilton" },
  { value: "Cambridge", label: "Cambridge" },
  { value: "Te Awamutu", label: "Te Awamutu" },
  { value: "Matamata", label: "Matamata" },
  { value: "Tauranga", label: "Tauranga" },
  { value: "Rotorua", label: "Rotorua" },
  { value: "Whakatāne", label: "Whakatāne" },
  { value: "Taupō", label: "Taupō" },
  { value: "Gisborne", label: "Gisborne" },
  { value: "Wainui", label: "Wainui" },
  { value: "Napier", label: "Napier" },
  { value: "Hastings", label: "Hastings" },
  { value: "New Plymouth", label: "New Plymouth" },
  { value: "Stratford", label: "Stratford" },
  { value: "Hawera", label: "Hawera" },
  { value: "Palmerston North", label: "Palmerston North" },
  { value: "Whanganui", label: "Whanganui" },
  { value: "Feilding", label: "Feilding" },
  { value: "Wellington", label: "Wellington" },
  { value: "Lower Hutt", label: "Lower Hutt" },
  { value: "Upper Hutt", label: "Upper Hutt" },
  { value: "Porirua", label: "Porirua" },
  { value: "Richmond", label: "Richmond" },
  { value: "Motueka", label: "Motueka" },
  { value: "Mapua", label: "Mapua" },
  { value: "Nelson", label: "Nelson" },
  { value: "Blenheim", label: "Blenheim" },
  { value: "Picton", label: "Picton" },
  { value: "Greymouth", label: "Greymouth" },
  { value: "Westport", label: "Westport" },
  { value: "Hokitika", label: "Hokitika" },
  { value: "Christchurch", label: "Christchurch" },
  { value: "Ashburton", label: "Ashburton" },
  { value: "Timaru", label: "Timaru" },
  { value: "Dunedin", label: "Dunedin" },
  { value: "Queenstown", label: "Queenstown" },
  { value: "Wanaka", label: "Wanaka" },
]

export const ethinicityOptions = [
  { value: "Caucasian", label: "Caucasian" },
  { value: "Asian", label: "Asian" },
  { value: "Black", label: "Black" },
  { value: "Latin", label: "Latin" },
  { value: "Middle Eastern", label: "Middle Eastern" },
  { value: "Mixed", label: "Mixed" },
  { value: "Other", label: "Other" },
  { value: "Korean", label: "Korean" },
  { value: "Japanese", label: "Japanese" },
  { value: "Chinese", label: "Chinese" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Thai", label: "Thai" },
  { value: "Filipino", label: "Filipino" },
  { value: "Indonesian", label: "Indonesian" },
  { value: "Malaysian", label: "Malaysian" },
  { value: "Indian", label: "Indian" },
  { value: "Pakistani", label: "Pakistani" },
  { value: "Bangladeshi", label: "Bangladeshi" },
  { value: "Sri Lankan", label: "Sri Lankan" },
  { value: "Nepali", label: "Nepali" },
  { value: "Iranian (Persian)", label: "Iranian (Persian)" },
  { value: "Turkish", label: "Turkish" },
  { value: "Arab", label: "Arab" },
  { value: "Kurdish", label: "Kurdish" },
  { value: "Jewish", label: "Jewish" },
  { value: "Armenian", label: "Armenian" },
  { value: "Lebanese", label: "Lebanese" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Italian", label: "Italian" },
  { value: "Spanish", label: "Spanish" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "English", label: "English" },
  { value: "Scottish", label: "Scottish" },
  { value: "Irish", label: "Irish" },
  { value: "Welsh", label: "Welsh" },
  { value: "Dutch", label: "Dutch" },
  { value: "Belgian", label: "Belgian" },
  { value: "Swiss", label: "Swiss" },
  { value: "Greek", label: "Greek" },
  { value: "Russian", label: "Russian" },
  { value: "Ukrainian", label: "Ukrainian" },
  { value: "Polish", label: "Polish" },
  { value: "Hungarian", label: "Hungarian" },
  { value: "Romanian", label: "Romanian" },
  { value: "Serbian", label: "Serbian" },
  { value: "Croatian", label: "Croatian" },
  { value: "Bulgarian", label: "Bulgarian" },
  { value: "Czech", label: "Czech" },
  { value: "Slovak", label: "Slovak" },
  { value: "Norwegian", label: "Norwegian" },
  { value: "Swedish", label: "Swedish" },
  { value: "Danish", label: "Danish" },
  { value: "Finnish", label: "Finnish" },
  { value: "Icelandic", label: "Icelandic" },
  { value: "Kazakh", label: "Kazakh" },
  { value: "Uzbek", label: "Uzbek" },
  { value: "Kyrgyz", label: "Kyrgyz" },
  { value: "Turkmen", label: "Turkmen" },
  { value: "Tajik", label: "Tajik" },
  { value: "Berber", label: "Berber" },
  { value: "Somali", label: "Somali" },
  { value: "Zulu", label: "Zulu" },
  { value: "Xhosa", label: "Xhosa" },
  { value: "Yoruba", label: "Yoruba" },
  { value: "Hausa", label: "Hausa" },
  { value: "Igbo", label: "Igbo" },
  { value: "Amhara", label: "Amhara" },
  { value: "Oromo", label: "Oromo" },
  { value: "Maasai", label: "Maasai" },
  { value: "Tutsi", label: "Tutsi" },
  { value: "Shona", label: "Shona" },
  { value: "Ashanti", label: "Ashanti" },
  { value: "Fulani", label: "Fulani" },
  { value: "Afro-Caribbean", label: "Afro-Caribbean" },
  { value: "Haitian", label: "Haitian" },
  { value: "Mexican", label: "Mexican" },
  { value: "Brazilian", label: "Brazilian" },
  { value: "Argentine", label: "Argentine" },
  { value: "Chilean", label: "Chilean" },
  { value: "Peruvian", label: "Peruvian" },
  { value: "Colombian", label: "Colombian" },
  { value: "Cuban", label: "Cuban" },
  { value: "Puerto Rican", label: "Puerto Rican" },
  { value: "Dominican", label: "Dominican" },
  { value: "Maori (New Zealand)", label: "Maori (New Zealand)" },
  { value: "Samoan", label: "Samoan" },
  { value: "Tongan", label: "Tongan" },
  { value: "Fijian", label: "Fijian" },
  { value: "Hawaiian", label: "Hawaiian" },
  { value: "Chamorro (Guam)", label: "Chamorro (Guam)" },
  { value: "Quechua (South America)", label: "Quechua (South America)" },
  { value: "Aymara (South America)", label: "Aymara (South America)" },
  { value: "Mapuche (South America)", label: "Mapuche (South America)" },
  { value: "Guarani (South America)", label: "Guarani (South America)" },
  { value: "Native American (U.S.)", label: "Native American (U.S.)" },
  { value: "First Nations (Canada)", label: "First Nations (Canada)" },
  { value: "Inuit", label: "Inuit" },
  { value: "Métis", label: "Métis" },
  { value: "Afro-American", label: "Afro-American" },
  { value: "African-American", label: "African-American" },
  { value: "Mestizo (Latin America)", label: "Mestizo (Latin America)" },
  { value: "Eurasian", label: "Eurasian" },
  { value: "Afro-Latinx", label: "Afro-Latinx" },
  { value: "Anglo-Indian", label: "Anglo-Indian" },
  { value: "San (Southern Africa)", label: "San (Southern Africa)" },
  { value: "Taiwanese", label: "Taiwanese" },
]

export const escortTypeOptions = [
  { value: "private", label: "Private" },
  { value: "agency", label: "Agency" },
]

export const escourtServiceOptions = [
  { value: "fullService", label: "Full service" },
  { value: "sensualMassage", label: "Sensual Massage" },
  { value: "pureMassage", label: "Pure Massage" },
]
