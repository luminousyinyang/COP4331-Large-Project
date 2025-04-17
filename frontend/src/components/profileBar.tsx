import { cn } from "@/lib/utils";

function ProfileBar ({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col items-center gap-6 w-[400px] bg-[var(--bg-pale-white)] border rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)]", className)} {...props}>
            <div className="w-[340px] pt-3">
                <i className="text-2xl bi bi-gear-fill"></i>
            </div>
            <span className="flex justify-center items-center w-[240px] h-[220px] text-white border rounded-xl bg-[var(--bg-navy)]">Image</span>
            <p className="text-xl font-black">First Last</p>
            <div className="flex flex-col gap-2 w-[280px]">
                <h2 className="text-lg font-bold">About</h2>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry ...</span>
            </div>
            <div className="flex flex-col gap-2 w-[280px]">
                <h2 className="text-lg font-bold">Social Media</h2>
                <div className="flex flex-col gap-3">
                    <a href="" className="flex gap-5">
                        <i className="bi bi-instagram"></i>
                        <p>instagram-example.link</p>
                    </a>
                    <a href="" className="flex gap-5">
                        <i className="bi bi-spotify"></i>
                        <p>spotify-example.link</p>
                    </a>
                    <a href="" className="flex gap-5">
                        <i className="bi bi-twitter-x"></i>
                        <p>twitter-example.link</p>
                    </a>
                </div>
            </div>

        </div>
    );
  }

export { ProfileBar };