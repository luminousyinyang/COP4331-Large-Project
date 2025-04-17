import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  
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
    return (
        <div className={cn("flex flex-col items-center gap-6 w-[400px] bg-[var(--bg-pale-white)] border rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)]", className)} {...props}>
            <div className="w-[380px] pt-4">
                <Dialog>
                    <DialogTrigger className="w-0 h-0 flex justify-center items-center !bg-[var(--bg-sandpaper)] !border-0">
                        <i className="inline-block text-2xl bi bi-gear-fill hover:text-[var(--bg-salmon)] hover:scale-125 transition-all duration-400 ease-out cursor-pointer"></i>
                    </DialogTrigger>
                    <DialogContent className="bg-[var(--bg-sandpaper)]"> 
                        <DialogHeader>
                            <DialogTitle className="mb-4 flex justify-center">Settings</DialogTitle>
                            {/* <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription> */}
                            <Button type="button" className="w-[155px] flex justify-center">
                                Edit Profile
                            </Button>
                            <Button type="button" className="w-[155px] flex justify-center">
                                Logout
                            </Button>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            
            </div>
            <img 
                src={image} 
                alt={imgDesc}
                className="text-center w-[240px] h-[220px] text-white border rounded-xl bg-[var(--bg-navy)]">
            </img>
            <p className="text-xl font-black">{firstName} {lastName}</p>
            <div className="flex flex-col gap-2 w-[280px]">
                <h2 className="text-lg font-bold">About</h2>
                <span>{about}</span>
            </div>
            <div className="flex flex-col gap-2 w-[280px]">
                <h2 className="text-lg font-bold">Social Media</h2>
                <div className="flex flex-col gap-4">
                    <a href={instaLink} className="flex gap-5 cursor-pointer group relative">
                        <i className="bi bi-instagram"></i>
                        <p>instagram-example.link</p>
                        <div className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-[var(--bg-navy)] transition-all duration-500 ease-out group-hover:w-[25%]"></div>
                    </a>
                    
                    <a href={spotifyLink} className="flex gap-5 cursor-pointer group relative">
                        <i className="bi bi-spotify"></i>
                        <p>spotify-example.link</p>
                        <div className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-[var(--bg-navy)] transition-all duration-500 ease-out group-hover:w-[25%]"></div>
                    </a>

                    <a href={twitterLink} className="flex gap-5 cursor-pointer group relative">
                        <i className="bi bi-twitter-x"></i>
                        <p>twitter-example.link</p>
                        <div className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-[var(--bg-navy)] transition-all duration-500 ease-out group-hover:w-[25%]"></div>
                    </a>
                </div>

            </div>

        </div>
    );
  }

export { ProfileBar };