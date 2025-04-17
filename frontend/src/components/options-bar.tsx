import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, PlusSquare, Search } from 'react-feather';
import Dropdown from "@/components/ui/checkbox";

function OptionsBar({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-3 w-[780px]", className)} {...props}>
            <h2 className="text-3xl font-black">My Wishlist</h2>
            <div className="flex justify-between">
                <div className="relative w-[364px]">
                    <Input className="shadow-[5px_5px_5px_rgba(0,0,0,0.3)]"
                        id="search"
                        type="text"
                        placeholder="Search"
                    />
                    <Search size={22} className="absolute top-1.5 right-3"/>
                </div>
                <div className="relative ">
                    <Dropdown text={"Filter"} style={"w-[155px] flex justify-start text-white shadow-[5px_5px_5px_rgba(0,0,0,0.3)]"} size={"w-39 max-h-100"}/>
                    <Filter size={22} color="white" className="absolute top-1.5 right-3"/>
                </div>
                <div className="relative">
                    <Button type="button" className="w-[155px] flex justify-start shadow-[5px_5px_5px_rgba(0,0,0,0.3)]">
                        Add
                    </Button>
                    <PlusSquare size={22} color="white" className="absolute top-1.5 right-3"/>
                </div>
            </div>
            
        </div>
    );
  }

export { OptionsBar };