import type React from "react"
import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../app/hooks"
// import { signUp, signUpWithGoogle } from '../features/auth/authSlice';
import Layout from "../components/common/Layout"
import ReCAPTCHA from "react-google-recaptcha"

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState<"customer" | "escort" | null>(null)
  const [passwordError, setPasswordError] = useState("")
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match")
      return
    }
    if (userType && captchaValue) {
      // dispatch(signUp({ email, password, userType, captchaValue }));
    }
  }

  const handleGoogleSignup = () => {
    if (userType && captchaValue) {
      // dispatch(signUpWithGoogle({ userType, captchaValue }));
    }
  }

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value)
  }

  const renderUserTypeDescription = () => {
    if (userType === "customer") {
      return (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="text-lg font-semibold mb-2">
            Customer User Features:
          </h3>
          <ul className="list-disc list-inside">
            <li>Write and read Q&A and Reviews</li>
            <li>Favorite escort feature</li>
            <li>Able to join future events</li>
          </ul>
        </div>
      )
    } else if (userType === "escort") {
      return (
        <div className="mt-4 p-4 bg-purple-50 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Escort User Features:</h3>
          <ul className="list-disc list-inside">
            <li>Advertise using our modern and premium platform</li>
            <li>Select from different payment plans</li>
            <li>Receive support after getting a plan</li>
          </ul>
        </div>
      )
    }
    return null
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign up for an account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            {/* ... (previous input fields remain the same) ... */}

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setUserType("customer")}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    userType === "customer"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("escort")}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    userType === "escort"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Escort
                </button>
              </div>
              {renderUserTypeDescription()}
            </div>

            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="YOUR_RECAPTCHA_SITE_KEY"
                onChange={handleCaptchaChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                disabled={
                  !userType || password !== confirmPassword || !captchaValue
                }
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignup}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                disabled={!userType || !captchaValue}
              >
                <img
                  className="h-5 w-5 mr-2"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                />
                Sign up with Google
              </button>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SignupPage
