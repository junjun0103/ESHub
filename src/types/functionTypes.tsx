import type { Escort } from "."

export type SaveEscortProfileResponse = {
  success: boolean
  profileId: string
  isNewProfile: boolean
  data: Escort
}

export type updateEscortMediaInput = {
  file: File
  mediaType: string
}

export type mediaTypes = "profile" | "detail" | "selfie" | "videos"
