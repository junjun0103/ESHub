import type React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import EscortDetail from "./pages/EscortDetail"
import ProtectedRoute from "./components/common/ProtectedRoute"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/escort/:id" element={<EscortDetail />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute requiredRole="escort">
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
