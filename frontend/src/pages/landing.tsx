"use client";

import { useState, useEffect } from 'react';
import { OptionsBar } from "@/components/options-bar";
import { ItemContainer } from "@/components/items-container";
import { ProfileBar } from "@/components/profileBar";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const color = "black";

  useEffect(() => {
    const checkSessionAndFetchItems = async () => {
      try {
        const resp = await fetch('/api/auth/profile', {
          credentials: 'include'
        });

        if (!resp.ok) {
          navigate('/login');
          return;
        }

        const { userId, username, firstname, lastname } = await resp.json();
        setFirstName(firstname);
        setLastName(lastname);
        setUserId(userId);

        // Fetch items for the authenticated user
        const itemsResp = await fetch(`/api/item/getitems?userId=${userId}`);
        if (!itemsResp.ok) {
          console.error('Failed to fetch items');
          return;
        }
        const itemsData = await itemsResp.json();
        setItems(itemsData.items || []);
      } catch (error) {
        console.error('Error during session check or item fetch:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkSessionAndFetchItems();
  }, [navigate]);

  return (
    <div className='flex justify-center items-center w-full min-h-screen bg-[var(--bg-sandpaper)]'>
      {loading ? (
        <div className='flex flex-col justify-center items-center'>
          <SyncLoader
            color={color}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h2 className="text-xl py-10">Please wait a few seconds</h2>
        </div>
      ) : (
        <div className="flex flex-row justify-between overflow-visible w-full min-h-screen bg-[var(--bg-sandpaper)]">
          <div className="flex flex-col gap-5">
            <OptionsBar className="slide-in-bottom pt-10 ml-25" />
            <ItemContainer className="slide-in-right ml-25" items={items} />
          </div>
          <ProfileBar
            image={"Image"}
            imgDesc={"Profile Picture"}
            firstName={firstName || "First"}
            lastName={lastName || "Last"}
            about={"Lorem Ipsum is simply dummy text of the printing and typesetting industry..."}
            instaLink={""}
            spotifyLink={""}
            twitterLink={""}
            className="slide-in-left h-screen sticky top-0 right-0"
          />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
