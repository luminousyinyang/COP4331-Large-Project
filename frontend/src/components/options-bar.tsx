import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from 'react-feather';
import { Filter, PlusSquare, Search } from 'react-feather';
import Dropdown from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

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
                
                <Dialog>
                    <div className="relative">
                        <DialogTrigger className="w-[155px] h-[37px] flex justify-start items-center text-white shadow-[5px_5px_5px_rgba(0,0,0,0.3)]">
                            Add
                            <PlusSquare size={22} color="white" className="absolute top-2 right-3"/>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="bg-[var(--bg-sandpaper)] w-[560px] h-[720px] py-5 px-15">
                        <DialogHeader className="relative flex flex-col gap-3.5">
                            <DialogClose className="cancel-btn absolute w-[35px] h-[35px] -top-1 -right-11 text-white">
                                <X className="w-6 h-6 absolute top-1 right-1.75"></X>
                            </DialogClose>

                            <DialogTitle className="text-xl font-black flex justify-center">Add Item</DialogTitle>
                            <div className="border border-[var(--bg-navy)]"></div>

                            <img
                                src="sdfsf.ssdf"
                                alt="Upload Photo"
                                className="w-full h-[160px] object-cover bg-[var(--bg-pale-white)] border border-[var(--bg-navy)] rounded-2xl"
                            />

                            <div>
                                <h2 className="font-bold">Product Link</h2>
                                <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                    id="search"
                                    type="text"
                                />
                            </div>
                            <div>
                                <h2 className="font-bold">Name</h2>
                                <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                    id="search"
                                    type="text"
                                />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <h2 className="font-bold">Price</h2>
                                    <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                        id="search"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-bold">Tag (Optional)</h2>
                                    <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                        id="search"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold">Description</h2>
                                <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] w-full h-[120px]"
                                    id="search"
                                    type="text"
                                />
                            </div>
                            
                            <DialogDescription></DialogDescription>
                            {/* <Button type="button" className="w-[155px] flex justify-center">
                                Edit Profile
                            </Button>
                            <Button type="button" className="w-[155px] flex justify-center">
                                Logout
                            </Button> */}
                            <div className="flex justify-between">
                                <DialogClose className="cancel-btn w-[125px] h-[37px] flex justify-center items-center ">Cancel</DialogClose>
                                <Button type="button" className="w-[125px] flex justify-center ">
                                    Add
                                </Button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            
        </div>
    );
  }

export { OptionsBar };