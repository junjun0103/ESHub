import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../app/hooks"
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase/config"
import Layout from "../components/common/Layout"
import type { User } from "../types"
import { setUser, setStatus, setError } from "../features/user/userSlice"

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"client" | "advertiser" | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setErrorState] = useState<string | null>(null)
  const [verificationSent, setVerificationSent] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (userType) {
      setLoading(true)
      setError(null)
      dispatch(setStatus("loading"))
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        )
        const user = userCredential.user

        // Send verification email
        await sendEmailVerification(user)
        setVerificationSent(true)

        // Save user data to Firestore
        const userData: User = {
          id: user.uid,
          email: user.email!,
          name: name,
          userType: userType,
        }
        await setDoc(doc(db, "users", user.uid), userData)

        // Update Redux store
        dispatch(setStatus("idle"))
      } catch (error) {
        if (error instanceof Error) {
          setErrorState(error.message)
          dispatch(setError(error.message))
        } else {
          setErrorState("An unknown error occurred")
          dispatch(setError("An unknown error occurred"))
        }
      } finally {
        setLoading(false)
      }
    }
  }

  const handleGoogleSignup = async () => {
    if (userType) {
      setLoading(true)
      setError(null)
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        // Here you would typically save the user type to your database
        // Save user data to Firestore
        const userData: User = {
          id: user.uid,
          email: user.email!,
          name: name,
          userType: userType,
        }
        await setDoc(doc(db, "users", user.uid), userData)
        // Update Redux store
        dispatch(setUser(userData))
        dispatch(setStatus("idle"))
      } catch (error) {
        if (error instanceof Error) {
          setErrorState(error.message)
          dispatch(setError(error.message))
        } else {
          setErrorState("An unknown error occurred")
          dispatch(setError("An unknown error occurred"))
        }
      } finally {
        setLoading(false)
      }
    }
  }

  const renderUserTypeDescription = () => {
    if (userType === "client") {
      return (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Client User Features:</h3>
          <ul className="list-disc list-inside">
            <li>Write and read Q&A and Reviews</li>
            <li>Favorite escort feature</li>
            <li>Able to join future events</li>
          </ul>
        </div>
      )
    } else if (userType === "advertiser") {
      return (
        <div className="mt-4 p-4 bg-purple-50 rounded-md">
          <h3 className="text-lg font-semibold mb-2">
            Advertiser User Features:
          </h3>
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
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          {verificationSent && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">
                {" "}
                A verification email has been sent to your email address. Please
                verify your email before logging in.
              </span>
            </div>
          )}
          {!verificationSent && (
            <form className="mt-8 space-y-6" onSubmit={handleSignup}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setUserType("client")}
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                      userType === "client"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("advertiser")}
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                      userType === "advertiser"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Advertiser
                  </button>
                </div>
                {renderUserTypeDescription()}
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={!userType || loading}
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </div>
            </form>
          )}
          {/* ... Google sign-up button ... */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!userType || loading}
          >
            <img
              className="h-5 w-5 mr-2"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
            />
            {loading ? "Signing up..." : "Sign up with Google"}
          </button>
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
          </div>{" "}
        </div>
      </div>
    </Layout>
  )
}

export default SignupPage
