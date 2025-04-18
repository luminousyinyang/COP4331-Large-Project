import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from 'react-feather';
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
  
type ProfileBarProps = {
    className?: string;
    image: string;
    imgDesc: string;
    firstName: string;
    lastName: string;
    instaLink: string;
    spotifyLink: string;
    twitterLink: string;
  } & React.HTMLAttributes<HTMLDivElement>;

function ProfileBar ({ className, image, imgDesc, firstName, lastName, about, instaLink, spotifyLink, twitterLink, ...props }: ProfileBarProps) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          const resp = await fetch('/api/auth/logout', {
            credentials: 'include'
          })
    
          const data = await resp.json()
          if (!resp.ok) {
            throw new Error(data.message)
          }
    
          navigate('/login')
    
        } catch (err) {
          console.log(err)
        }
    }


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
                                    <DialogHeader >
                                        <form action="" className="relative flex flex-col justify-between h-full">
                                            <div className="relative flex flex-col gap-3.5">
                                                <DialogClose className="cancel-btn absolute w-[35px] h-[35px] -top-1 -right-11 text-white">
                                                    <X className="w-6 h-6 absolute top-1 right-1.75"></X>
                                                </DialogClose>
                                                <DialogTitle className="text-xl font-black flex justify-center">Edit Profile</DialogTitle>
                                                <div className="border border-[var(--bg-navy)]"></div>
                                                
                                                <div>
                                                    <h2 className="font-bold">First Name</h2>
                                                    <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                                        id="profile-first-name"
                                                        type="text"
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="font-bold">Last Name</h2>
                                                    <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                                        id="profile-last-name"
                                                        type="text"
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <h2 className="font-bold">Bio</h2>
                                                    <Textarea
                                                        id="profile-bio"
                                                        className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] w-full h-[120px]"
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="font-bold">Instagram Link</h2>
                                                    <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                                        id="instagram-link"
                                                        type="text"
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="font-bold">Spotify Link</h2>
                                                    <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                                        id="spotify-link"
                                                        type="text"
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="font-bold">Twitter/X Link</h2>
                                                    <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                                        id="twitter-link"
                                                        type="text"
                                                    />
                                                </div>
                                                
                                                <DialogDescription></DialogDescription>
                                            </div>
                                            <div className="flex justify-between">
                                                <DialogClose className="cancel-btn w-[125px] h-[37px] flex justify-center items-center ">Cancel</DialogClose>
                                                <DialogClose className=" w-[125px] h-[37px] flex justify-center items-center text-white ">Save</DialogClose>
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
                src={image} 
                alt={imgDesc}
                className="text-center w-[240px] h-[220px] text-white border rounded-xl bg-[var(--bg-navy)]">
            </img>
            <div className="w-[280px] flex justify-center">
                <p className="text-xl font-black overflow-hidden h-[26px]">{firstName} {lastName}</p>
            </div>
            <div className="flex flex-col gap-2 w-[280px]">
                <h2 className="text-lg font-bold">About</h2>
                <span className="overflow-hidden h-[170px]">{about}</span>
            </div>
            <div className="flex flex-col gap-2 w-[280px]">
                <h2 className="text-lg font-bold">Social Media</h2>
                <div className="flex flex-col gap-4 w-[280px]">
                    <a href={instaLink} className="flex gap-5 cursor-pointer group relative">
                        <i className="bi bi-instagram"></i>
                        <p className="overflow-hidden h-[22px]">instagram-example.link</p>
                        <div className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-[var(--bg-navy)] transition-all duration-500 ease-out group-hover:w-[25%]"></div>
                    </a>
                    
                    <a href={spotifyLink} className="flex gap-5 cursor-pointer group relative">
                        <i className="bi bi-spotify"></i>
                        <p className="overflow-hidden h-[22px]">spotify-example.link</p>
                        <div className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-[var(--bg-navy)] transition-all duration-500 ease-out group-hover:w-[25%]"></div>
                    </a>

                    <a href={twitterLink} className="flex gap-5 cursor-pointer group relative">
                        <i className="bi bi-twitter-x"></i>
                        <p className="overflow-hidden h-[22px]">twitter-example.link</p>
                        <div className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-[var(--bg-navy)] transition-all duration-500 ease-out group-hover:w-[25%]"></div>
                    </a>
                </div>

            </div>

        </div>
    );
  }

export { ProfileBar };