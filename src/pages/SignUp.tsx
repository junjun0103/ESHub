import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../app/hooks"
import { setUser, setStatus, setError } from "../features/user/userSlice"
import { signUp } from "../utils/firebase"
import Layout from "../components/common/Layout"

const SignUp: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [userType, setUserType] = useState<"escort" | "customer">("escort")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setStatus("loading"))
    try {
      const userCredential = await signUp(email, password)
      // Here you would typically also save additional user info to your database
      dispatch(
        setUser({
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          name,
          userType,
        }),
      )
      navigate("/")
    } catch (error) {
      dispatch(setError((error as Error).message))
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password Confirm" className="block mb-1">
              Password Confrim
            </label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-accent-gold focus:ring-accent-gold h-5 w-5"
                name="userType"
                value="escort"
                checked={userType === "escort"}
                onChange={() => setUserType("escort")}
              />
              <span className="ml-2 text-gray-700">Customer</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-accent-gold focus:ring-accent-gold h-5 w-5"
                name="userType"
                value="customer"
                checked={userType === "customer"}
                onChange={() => setUserType("customer")}
              />
              <span className="ml-2 text-gray-700">Escort</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-accent-gold text-white p-2 rounded hover:bg-opacity-80"
          >
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default SignUp
