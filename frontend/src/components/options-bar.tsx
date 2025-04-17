import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, PlusSquare, Search } from 'react-feather';
import Dropdown from "@/components/ui/checkbox";

function OptionsBar({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-3 w-[780px]", className)} {...props}>
            <h2 className="text-3xl font-bold">My Wishlist</h2>
            <div className="flex justify-between">
                <div className="relative w-[364px]">
                    <Input className=""
                        id="search"
                        type="text"
                        placeholder="Search"
                    />
                    <Search size={22} className="absolute top-1.5 right-3"/>
                </div>
                <div className="relative">
                    <Dropdown text={"Filter"} style={"w-[155px] flex justify-start text-white"} size={"w-39"}/>
                    <Filter size={22} color="white" className="absolute top-1.5 right-3"/>
                </div>
                <div className="relative">
                    <Button type="submit" className="w-[155px] flex justify-start ">
                        Add
                    </Button>
                    <PlusSquare size={22} color="white" className="absolute top-1.5 right-3"/>
                </div>
            </div>
            
        </div>
    );
  }

export { OptionsBar };