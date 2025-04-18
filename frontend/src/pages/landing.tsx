"use client"

import { useState, useEffect } from 'react';
import { OptionsBar } from "@/components/options-bar";
import { ItemContainer } from "@/components/items-container";
import { ProfileBar } from "@/components/profileBar";
import SyncLoader from "react-spinners/SyncLoader";

function LandingPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const color = "black";

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  
  return (
    <div className='flex justify-center items-center w-full min-h-screen bg-[var(--bg-sandpaper)]'>
        {
          loading ? 

          <div className='flex flex-col justify-center items-center'>
            <SyncLoader
              color={color}
              loading={loading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
              className=''
            />
            <h2 className="text-xl py-10">Please wait a few seconds</h2>
          </div>
          :
          <div className="flex flex-row justify-between overflow-visible w-full min-h-screen bg-[var(--bg-sandpaper)]" >
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
        }
    </div>
  )
}

export default LandingPage;