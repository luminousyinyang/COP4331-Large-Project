"use client"

import GridBackground from "@/components/ui/grid-bg"
import { LoginForm } from "@/components/login-form"

export default function SignupPage() {
  return (
    <GridBackground>
      <div className="flex items-center justify-center min-h-screen px-4 py-10">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </GridBackground>
  )
}
