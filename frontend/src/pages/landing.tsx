"use client"

import { OptionsBar } from "@/components/options-bar";

function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-[var(--bg-sandpaper)] flex justify-start items-top">
        <OptionsBar className="mt-10 ml-10"/>
    </div>
  )
}

export default LandingPage;