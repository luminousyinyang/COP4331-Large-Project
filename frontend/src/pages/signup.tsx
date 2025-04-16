"use client"

import GridBackground from "@/components/ui/grid-bg"
import { RegForm } from "@/components/reg-form"

export default function LoginPage() {
  return (
    <GridBackground>
      <div className="flex items-center justify-center min-h-screen px-4 py-10">
        <div className="w-full max-w-md">
          <RegForm />
        </div>
      </div>
    </GridBackground>
  )
}