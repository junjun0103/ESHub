import type { Escort } from "."

export type SaveEscortProfileResponse = {
  success: boolean
  profileId: string
  isNewProfile: boolean
  data: Escort
}

export type uploadEscortMediaInput = {
  files: File[]
  mediaType: MediaTypes
}

export type MediaTypes =
  | "profilePhotos"
  | "detailPhotos"
  | "selfiePhotos"
  | "videos"
