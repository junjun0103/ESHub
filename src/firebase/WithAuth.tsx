import type React from "react"
import { useEffect } from "react"
import { auth, db } from "../firebase/config"
import { doc, getDoc } from "firebase/firestore"
import { useAppDispatch } from "../app/hooks"
import { setError, setStatus, setUser } from "../features/user/userSlice"
import type { User } from "../types"
import { useNavigate } from "react-router-dom"

interface WithAuthProps {
  children: React.ReactNode
}

const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user && user.emailVerified) {
        // User is signed in, handle the authenticated state
        console.log("JUN User is signed in:", user)
        const userFromDB = await getDoc(doc(db, "users", user.uid))
        if (userFromDB.exists()) {
          dispatch(setUser(userFromDB.data() as User))
          dispatch(setStatus("idle"))
        } else {
          setError("User not found")
          dispatch(setStatus("failed"))
        }
      } else {
        // User is signed out, handle the unauthenticated state
        console.log("JUN User is signed out")
        dispatch(setUser(null))
        dispatch(setStatus("idle"))
        navigate("/Login")
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return <>{children}</>
}

export default WithAuth
