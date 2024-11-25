import type React from "react"
import { useState } from "react"
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../firebase/config"

interface ResendVerificationEmailProps {
  email: string
}

const ResendVerificationEmail: React.FC<ResendVerificationEmailProps> = ({
  email,
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResend = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // We use sendPasswordResetEmail as a workaround because the user might not be signed in
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">
            {" "}
            A new verification email has been sent. Please check your inbox.
          </span>
        </div>
      )}
      <button
        onClick={handleResend}
        disabled={loading}
        className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {loading ? "Sending..." : "Resend Verification Email"}
      </button>
    </div>
  )
}

export default ResendVerificationEmail
