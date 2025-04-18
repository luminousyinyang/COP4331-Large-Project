import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { X } from 'react-feather';
import { Filter, PlusSquare, Search } from 'react-feather';
import Dropdown from "@/components/ui/checkbox";
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


function OptionsBar({ className, ...props }: React.ComponentProps<"div">) {
    const [imgPreview, setImgPreview] = useState<string | null>("");
    const [open, setOpen] = useState(false);

    // Saves the file taken from file input, and stores it in imgPreview
    // Shows the image preview 
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const previewURL = URL.createObjectURL(file);
          setImgPreview(previewURL);
        }
      };

      // Removes the img preview when user leaves/exit out of the add dialog 
      useEffect(() => {
        if (!open && imgPreview) {
          URL.revokeObjectURL(imgPreview);
          setImgPreview(null);
        }
      }, [open, imgPreview]);

    return (
        <div className={cn("flex flex-col gap-3 w-[780px]", className)} {...props}>
            <h2 className="text-3xl font-black text-[var(--bg-navy)]">My Wishlist</h2>
            <div className="flex justify-between">
                <form className="relative w-[364px]">
                    <Input className="bg-[var(--bg-pale-white)] shadow-[5px_5px_5px_rgba(0,0,0,0.3)] px-8"
                        id="search"
                        type="text"
                        placeholder="Search"
                    />
                    <Search size={22} className="absolute top-1.5 right-3"/>
                </form>
                <div className="relative hover:scale-110 transition-all duration-400 ease-out">
                    <Dropdown text={"Filter"} style={"w-[155px] flex justify-start text-white shadow-[5px_5px_5px_rgba(0,0,0,0.3)]"} size={"w-39 max-h-100"}/>
                    <Filter size={22} color="white" className="absolute top-1.5 right-3"/>
                </div>
                
                <Dialog open={open} onOpenChange={setOpen}>
                    <div className="relative hover:scale-110 transition-all duration-400 ease-out">
                        <DialogTrigger className="w-[155px] h-[37px] flex justify-start items-center text-white shadow-[5px_5px_5px_rgba(0,0,0,0.3)] ">
                            Add
                            <PlusSquare size={22} color="white" className="absolute top-2 right-3 "/>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="bg-[var(--bg-sandpaper)] w-[560px] h-[720px] py-5 px-15">
                        <DialogHeader>
                            
                            <form action="" className="relative flex flex-col gap-3.5">
                                <DialogClose className="cancel-btn absolute w-[35px] h-[35px] -top-1 -right-11 text-white">
                                    <X className="w-6 h-6 absolute top-1 right-1.75"></X>
                                </DialogClose>

                                <DialogTitle className="text-xl font-black flex justify-center">Add Item</DialogTitle>
                                <div className="border border-[var(--bg-navy)]"></div>

                                <img
                                    src={imgPreview ?? ""}
                                    alt={imgPreview ? "Image" : "Invalid Image"}
                                    className="w-full h-[120px] object-cover bg-[var(--bg-pale-white)] border border-[var(--bg-navy)] rounded-2xl"
                                />
                                <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                                    id="item-picture"
                                    type="file"
                                    onChange={handleImageChange}
                                />


                                <div>
                                    <h2 className="font-bold">Product Link</h2>
                                    <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                        id="product-link"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-bold">Name</h2>
                                    <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                        id="produce-name"
                                        type="text"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="font-bold">Price</h2>
                                        <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                            id="product-price"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="font-bold">Tag (Optional)</h2>
                                        <Input className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] "
                                            id="product-tag"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-bold">Description</h2>
                                    <Textarea 
                                        id="product-desc"
                                        className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] w-full h-[120px]"
                                    />
                                </div>

                                <DialogDescription></DialogDescription>
                                <div className="flex justify-between">
                                    <DialogClose className="cancel-btn w-[125px] h-[37px] flex justify-center items-center ">Cancel</DialogClose>
                                    <DialogClose className=" w-[125px] h-[37px] flex justify-center items-center text-white ">Add</DialogClose>
                                </div>
                            </form>
                            
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            
        </div>
    );
  }

export { OptionsBar };