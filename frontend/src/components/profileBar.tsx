import { cn } from "@/lib/utils";

function ProfileBar ({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-3", className)} {...props}>
            <h1>About: Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry ... </h1>
            
        </div>
    );
  }

export { ProfileBar };