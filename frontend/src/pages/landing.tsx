"use client"

import { OptionsBar } from "@/components/options-bar";
import { ItemContainer } from "@/components/items-container";
import { ProfileBar } from "@/components/profileBar";

function LandingPage() {
  
  return (
    <div  className="flex flex-row justify-between overflow-visible w-full min-h-screen bg-[var(--bg-sandpaper)]" >
        <div className="flex flex-col gap-5">
          <OptionsBar  className="pt-10 ml-25"/>
          <ItemContainer  className="ml-25"/>
        </div>
        <ProfileBar 
          image={"Image"}
          imgDesc={"Profile Picture"}
          firstName={"First"} 
          lastName={"Last"}
          about={"Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry ..."}
          instaLink={""} 
          spotifyLink={""} 
          twitterLink={""}
          className="h-screen sticky top-0 right-0" 
        />
    </div>
  )
}

export default LandingPage;