import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"
import LandingPage from "./pages/landing"
// import LoggedIn from "./pages/loggedIn"
import ItemPage from "./pages/items"
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/user/:username" element={<LandingPage />} />
      <Route path="/item/:id" element={<ItemPage />} />
    </Routes>
  )
}

export default App
