import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"
import LandingPage from "./pages/landing"
// import LoggedIn from "./pages/loggedIn"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<LandingPage />} />
    </Routes>
  )
}

export default App
