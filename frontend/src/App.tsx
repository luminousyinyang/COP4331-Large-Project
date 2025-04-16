import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}

export default App
