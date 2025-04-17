"use client"

import { OptionsBar } from "@/components/options-bar";
import { ItemContainer } from "@/components/items-container";
import { ProfileBar } from "@/components/profileBar";

function LandingPage() {
  // return (
  //   <div  className="w-full min-h-screen grid bg-[var(--bg-sandpaper)]"
  //         style={{ 
  //           gridTemplateColumns: "2.5fr 1fr",
  //           gridTemplateRows: "1fr 5fr",
  //           gridTemplateAreas: `
  //             "optionsBar profile"
  //             "itemContainer profile"
  //         ` }}>
  //       <OptionsBar style={{ gridArea: "optionsBar" }} className="mt-12 ml-20"/>
  //       <ItemContainer style={{ gridArea: "itemContainer" }} className="ml-20"/>
  //       <ProfileBar style={{ gridArea: "profile" }}/>
  //   </div>
  // )

  return (
    <div  className="flex flex-row justify-between overflow-visible w-full min-h-screen bg-[var(--bg-sandpaper)]" >
        <div className="flex flex-col gap-5">
          <OptionsBar  className="pt-10 ml-25"/>
          <ItemContainer  className="ml-25"/>
        </div>
        <ProfileBar className="h-screen sticky top-0 right-0"/>
    </div>
  )
}

export default LandingPage;