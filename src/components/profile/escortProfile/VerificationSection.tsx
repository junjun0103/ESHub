import type React from "react"
import { useState } from "react"
import type { Escort } from "../../../types"
import {
  checkMandatoryFields,
  areMandatoryFieldsComplete,
} from "../../../utils/profileHelper"
import {
  ShieldCheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"

interface VerificationSectionProps {
  profile: Escort | null
  onUpdate: (updatedData: Partial<Escort>) => void
}

const VerificationSection: React.FC<VerificationSectionProps> = ({
  profile,
  onUpdate,
}) => {
  const [requestSent, setRequestSent] = useState(false)

  const handleRequestVerification = () => {
    const section = checkMandatoryFields(null, profile)
    if (areMandatoryFieldsComplete(section)) {
      setRequestSent(true)
      // onUpdate({ verificationStatus: "pending" })
    } else {
      alert(
        "Please complete all mandatory sections before requesting verification.",
      )
    }
  }

  const isVerificationExpired = (verifiedDate: number) => {
    const oneYearInMs = 365 * 24 * 60 * 60 * 1000
    return Date.now() - verifiedDate > oneYearInMs
  }

  const getVerificationStatus = () => {
    if (
      !profile?.verificationStatus ||
      profile.verificationStatus === "unverified"
    ) {
      return "unverified"
    }
    if (profile.verificationStatus === "pending") {
      return "pending"
    }
    if (profile.verificationStatus === "verified" && profile.verifiedDate) {
      return isVerificationExpired(profile.verifiedDate)
        ? "expired"
        : "verified"
    }
    return "unknown"
  }

  const verificationStatus = getVerificationStatus()

  const renderStatusMessage = () => {
    switch (verificationStatus) {
      case "verified":
        return (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-start">
            <ShieldCheckIcon className="h-6 w-6 mr-2 flex-shrink-0" />
            <div>
              <p className="font-bold">Your account is verified! ✅</p>
              <p>
                Verified on:{" "}
                {new Date(profile!.verifiedDate!).toLocaleDateString()}
              </p>
              <p>
                Expires on:{" "}
                {new Date(
                  profile!.verifiedDate! + 365 * 24 * 60 * 60 * 1000,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        )
      case "pending":
        return (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md flex items-center">
            <ClockIcon className="h-6 w-6 mr-2 flex-shrink-0" />
            <p>Your verification is pending. We'll review your request soon.</p>
          </div>
        )
      case "unverified":
      case "expired":
        return (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center">
            <ExclamationTriangleIcon className="h-6 w-6 mr-2 flex-shrink-0" />
            <p>
              {verificationStatus === "expired"
                ? "Your verification has expired."
                : "Your account is not verified."}
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="vogue-container">
      <h2 className="vogue-heading text-2xl mb-6">Verification</h2>

      <div className="space-y-6">
        <p className="text-sm">
          Verify your account to gain trust from potential clients and increase
          your visibility on our platform. Verification is valid for one year.
        </p>

        {renderStatusMessage()}

        {(verificationStatus === "unverified" ||
          verificationStatus === "expired") && (
          <>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="vogue-subheading mb-2">
                To get verified, you'll need to:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Provide a government-issued ID</li>
                <li>Take a selfie holding your ID</li>
                <li>Agree to our terms of service</li>
              </ul>
            </div>

            <button
              onClick={handleRequestVerification}
              disabled={requestSent}
              className="vogue-button w-full flex items-center justify-center"
            >
              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
              {requestSent ? "Request Sent" : "Request Verification"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default VerificationSection
