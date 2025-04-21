import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from 'react-feather';
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogDescription,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import placeholder from "../assets/placeholder.jpg";

type ProfileBarProps = {
    className?: string;
    image: string;
    imgDesc: string;
    firstName: string;
    lastName: string;
    about: string;
    instaLink: string;
    spotifyLink: string;
    twitterLink: string;
} & React.HTMLAttributes<HTMLDivElement>;

function ProfileBar({
    className,
    image,
    imgDesc,
    firstName,
    lastName,
    about,
    instaLink,
    spotifyLink,
    twitterLink,
    ...props
}: ProfileBarProps) {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState(firstName);
    const [lastname, setLastname] = useState(lastName);
    const [bio, setBio] = useState(about);
    const [x, setX] = useState(twitterLink);
    const [instagram, setInstagram] = useState(instaLink);
    const [spotify, setSpotify] = useState(spotifyLink);

    const handleLogout = async () => {
        try {
            const resp = await fetch('/api/auth/logout', { credentials: 'include' });
            const data = await resp.json();
            if (!resp.ok) throw new Error(data.message);
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async () => {
        try {
            const resp = await fetch('/api/auth/profile', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname, lastname, bio, instagram, spotify, x })
            });

            const data = await resp.json();
            if (!resp.ok) throw new Error(data.message);

            // Update state with response
            setFirstname(data.firstname || firstname);
            setLastname(data.lastname || lastname);
            setBio(data.bio || bio);
            setInstagram(data.instagram || instagram);
            setSpotify(data.spotify || spotify);
            setX(data.x || x);

        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error saving profile');
        }
    };

    return (
        <div className={cn("flex flex-col items-center gap-4 w-[400px] bg-[var(--bg-pale-white)] border rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)]", className)} {...props}>
            <div className="w-[380px] pt-3">
                <Dialog>
                    <DialogTrigger className="w-0 h-0 flex justify-center items-center !bg-[var(--bg-sandpaper)] !border-0">
                        <i className="inline-block text-2xl bi bi-gear-fill hover:text-[var(--bg-salmon)] hover:scale-125 hover:rotate-180 transition-all duration-400 ease-out cursor-pointer"></i>
                    </DialogTrigger>
                    <DialogContent className="bg-[var(--bg-sandpaper)]">
                        <DialogHeader>
                            <DialogTitle className="mb-4 flex justify-center">Settings</DialogTitle>
                            <Dialog>
                                <div className="relative">
                                    <DialogTrigger className="w-[155px] h-[37px] flex justify-center items-center text-white">
                                        Edit Profile
                                    </DialogTrigger>
                                </div>
                                <DialogContent className="bg-[var(--bg-sandpaper)] w-[560px] h-[720px] py-5 px-15">
                                    <DialogHeader>
                                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="relative flex flex-col justify-between h-full">
                                            <div className="relative flex flex-col gap-3.5">
                                                <DialogClose className="cancel-btn absolute w-[35px] h-[35px] -top-1 -right-11 text-white">
                                                    <X className="w-6 h-6 absolute top-1 right-1.75" ></X>
                                                </DialogClose>
                                                <DialogTitle className="text-xl font-black flex justify-center">Edit Profile</DialogTitle>
                                                <div className="border border-[var(--bg-navy)]"></div>

                                                <div>
                                                    <h2 className="font-bold">First Name</h2>
                                                    <Input
                                                        className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                                                        id="profile-first-name"
                                                        type="text"
                                                        value={firstname}
                                                        onChange={(e) => setFirstname(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <h2 className="font-bold">Last Name</h2>
                                                    <Input
                                                        className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                                                        id="profile-last-name"
                                                        type="text"
                                                        value={lastname}
                                                        onChange={(e) => setLastname(e.target.value)}
                                                    />
                                                </div>


                                                <div>
                                                    <h2 className="font-bold">Bio</h2>
                                                    <Textarea
                                                        id="profile-bio"
                                                        className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] w-full h-[120px]"
                                                        value={bio}
                                                        onChange={(e) => setBio(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <h2 className="font-bold">Instagram Link</h2>
                                                    <Input
                                                        className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                                                        id="instagram-link"
                                                        type="text"
                                                        value={instagram}
                                                        onChange={(e) => setInstagram(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <h2 className="font-bold">Spotify Link</h2>
                                                    <Input
                                                        className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                                                        id="spotify-link"
                                                        type="text"
                                                        value={spotify}
                                                        onChange={(e) => setSpotify(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <h2 className="font-bold">Twitter/X Link</h2>
                                                    <Input
                                                        className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                                                        id="twitter-link"
                                                        type="text"
                                                        value={x}
                                                        onChange={(e) => setX(e.target.value)}
                                                    />
                                                </div>

                                                <DialogDescription></DialogDescription>
                                            </div>
                                            <div className="flex justify-between">
                                                <DialogClose className="cancel-btn w-[125px] h-[37px] flex justify-center items-center ">Cancel</DialogClose>
                                                <DialogClose className=" w-[125px] h-[37px] flex justify-center items-center text-white " onClick={handleSubmit}>Save</DialogClose>
                                            </div>
                                        </form>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <Button type="button" className="w-[155px] flex justify-center" onClick={handleLogout}>
                                Logout
                            </Button>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <img
                src={placeholder}
                alt={imgDesc}
                className="text-center w-[240px] h-[220px] text-white border rounded-xl bg-[var(--bg-navy)]"
            />

            <div className="w-[280px] flex justify-center">
                <p className="text-xl font-black overflow-hidden h-[26px]">{firstname} {lastname}</p>
            </div>

            <div className="flex flex-col gap-2 w-[280px]">
                <h2 className="text-lg font-bold">About</h2>
                <span className="overflow-hidden h-[170px]">{bio}</span>
            </div>

            {(instagram || spotify || x) && (
                <div className="flex flex-col gap-2 w-[280px]">
                    <h2 className="text-lg font-bold">Social Media</h2>
                    <div className="flex flex-col gap-4 w-[280px]">
                        {instagram && (
                            <a href={instagram} className="flex gap-5 cursor-pointer group relative">
                                <i className="bi bi-instagram"></i>
                                <p className="overflow-hidden h-[22px]">{instagram}</p>
                                <div className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-[var(--bg-navy)] transition-all duration-500 ease-out group-hover:w-[25%]"></div>
                            </a>
                        )}
                        {spotify && (
                            <a href={spotify} className="flex gap-5 cursor-pointer group relative">
                                <i className="bi bi-spotify"></i>
                                <p className="overflow-hidden h-[22px]">{spotify}</p>
                                <div className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-[var(--bg-navy)] transition-all duration-500 ease-out group-hover:w-[25%]"></div>
                            </a>
                        )}
                        {x && (
                            <a href={x} className="flex gap-5 cursor-pointer group relative">
                                <i className="bi bi-twitter-x"></i>
                                <p className="overflow-hidden h-[22px]">{x}</p>
                                <div className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-[var(--bg-navy)] transition-all duration-500 ease-out group-hover:w-[25%]"></div>
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export { ProfileBar };
