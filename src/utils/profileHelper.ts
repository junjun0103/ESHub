import type { Escort, Story } from "../types"

export interface ProfileSection {
  name: string
  isComplete: boolean
  isMandatory: boolean
}

export function checkMandatoryFields(
  stories?: Story[],
  profile?: Escort | null,
): ProfileSection[] {
  if (!profile) return []

  return [
    {
      name: "Information",
      isComplete:
        !!profile.greeting &&
        !!profile.occupation &&
        (profile.aboutMe?.length || 0) >= 1 &&
        (profile.contacts?.length || 0) >= 1,
      isMandatory: true,
    },
    {
      name: "Media",
      isComplete:
        (profile.profilePhotos?.length || 0) >= 1 &&
        (profile.photos?.length || 0) >= 1,
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
      isComplete: (profile.priceTable?.length || 0) >= 1,
      isMandatory: true,
    },
    {
      name: "Services",
      isComplete: (profile.services?.length || 0) >= 1,
      isMandatory: true,
    },
    {
      name: "Stories",
      isComplete: (stories?.length || 0) >= 1,
      isMandatory: false,
    },
    {
      name: "Verification",
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
