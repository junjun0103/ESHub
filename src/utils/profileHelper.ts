import type { Escort, Story } from "../types"

export interface ProfileSection {
  name: string
  isComplete: boolean
  isMandatory: boolean
}

export function checkMandatoryFields(
  story?: Story | null,
  profile?: Escort | null,
): ProfileSection[] {
  if (!profile) return []

  console.log("JUN profile", profile)
  console.log("JUN story", story)

  return [
    {
      name: "Information",
      isComplete:
        !!profile?.greeting &&
        !!profile?.name &&
        !!profile?.age &&
        !!profile?.location &&
        !!profile?.address?.address &&
        !!profile?.aboutMe &&
        !!profile?.occupation &&
        (profile?.aboutMe?.length || 0) >= 1 &&
        (profile?.contacts?.length || 0) >= 1,
      isMandatory: true,
    },
    {
      name: "Media",
      isComplete:
        (profile.profilePhotos?.length || 0) >= 1 &&
        (profile.detailPhotos?.length || 0) >= 1,
      isMandatory: true,
    },
    {
      name: "Payment Plan",
      isComplete:
        !!profile.paymentPlan &&
        new Date(profile.paymentPlan.endDate) > new Date(),
      isMandatory: true,
    },
    {
      name: "Price Table",
      isComplete: (profile.ratesTable?.length || 0) >= 1,
      isMandatory: true,
    },
    {
      name: "Services",
      isComplete: (profile.baseServices?.length || 0) >= 1,
      isMandatory: true,
    },
    {
      name: "Stories (optional)",
      isComplete: (Object(story?.storyEntries).length || 0) >= 1,
      isMandatory: false,
    },
    {
      name: "Verification (optional)",
      isComplete: profile.verificationStatus === "verified",
      isMandatory: false,
    },
  ]
}

export function calculateCompletionPercentage(
  sections: ProfileSection[],
): number {
  const completedSections = sections.filter(
    section => section.isComplete,
  ).length
  return Math.round((completedSections / sections.length) * 100)
}

export function areMandatoryFieldsComplete(
  sections: ProfileSection[],
): boolean {
  return sections
    .filter(section => section.isMandatory)
    .every(section => section.isComplete)
}

export function getIncompleteMandatorySections(
  sections: ProfileSection[],
): string[] {
  return sections
    .filter(section => section.isMandatory && !section.isComplete)
    .map(section => section.name)
}
