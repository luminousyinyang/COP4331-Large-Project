import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, PlusSquare, Search } from 'react-feather';


function OptionsBar({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-3", className)} {...props}>
            <h2 className="text-3xl font-bold">My Wishlist</h2>
            <div className="flex gap-10">
                <div className="relative w-[364px]">
                    <Input className=""
                        id="search"
                        type="text"
                        placeholder="Search"
                    />
                    <Search size={22} className="absolute top-1.5 right-2"/>
                </div>
                <div className="relative">
                    <Button type="submit" className="w-[155px] ">
                        Filter
                    </Button>
                    <Filter size={22} className="absolute top-1.5 right-2"/>
                </div>
                <div className="relative">
                    <Button type="submit" className="w-[155px] ">
                        Add
                    </Button>
                    <PlusSquare size={22} className="absolute top-1.5 right-2"/>
                </div>
            </div>
            
        </div>
    );
  }

export { OptionsBar };