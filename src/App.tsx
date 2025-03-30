import type React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import EscortDetail from "./pages/EscortDetail"
import ForgotPassword from "./pages/ForgotPassword"
import WithAuth from "./firebase/WithAuth"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WithAuth children={<Home />} />} />
        <Route path="/profile" element={<WithAuth children={<Profile />} />} />
        <Route
          path="/escort/:id"
          element={<WithAuth children={<EscortDetail />} />}
        />
        <Route path="/login" element={<WithAuth children={<SignIn />} />} />
        <Route path="/signup" element={<WithAuth children={<SignUp />} />} />
        <Route
          path="/forgot-password"
          element={<WithAuth children={<ForgotPassword />} />}
        />
      </Routes>
    </Router>
  )
}

export default App
