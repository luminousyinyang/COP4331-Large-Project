import { X } from 'react-feather';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import placeholder from '../../assets/placeholder.jpeg';

type ItemProps = {
    className?: string;
    image: string;
    imgDesc: string;
    price: number;
    itemDesc: string;
    title: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Item = ({ className, image, imgDesc, price, itemDesc, title, ...props }: ItemProps) => {

    return (
        <div className="flex justify-center items-center gap-8 h-[195px] w-[720px] border rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] cursor-pointer hover:scale-102 transition-transform duration-500 ease-in-out">
            <img
                src={image || placeholder}
                alt={imgDesc}
                className="w-[160px] h-[160px] text-center border rounded-2xl text-white bg-[var(--bg-navy)]">
            </img>
            <div className="w-[480px] h-full flex flex-col justify-start pt-5 gap-3">
                <div className="flex justify-between">
                    <h2 className="font-bold overflow-hidden h-[22px]">{title}</h2>
                    <Dialog>
                        <div className="relative">
                            <DialogTrigger className="cancel-btn size-9 absolute -top-1 -right-1">
                                <X className="absolute top-1.25 right-1.75"></X>
                            </DialogTrigger>
                        </div>
                        <DialogContent className="w-[400px] bg-[var(--bg-sandpaper)] pt-5 px-12">
                            <DialogHeader>
                                <DialogClose className="cancel-btn absolute w-[35px] h-[35px] top-2 right-2 text-white">
                                    <X className="w-6 h-6 absolute top-1.25 right-1.75"></X>
                                </DialogClose>

                                <DialogTitle className="flex justify-center font-black text-xl">Confirm Delete</DialogTitle>
                                <div className="border border-[var(--bg-navy)]"></div>

                                <DialogDescription className="text-lg py-5 px-8 text-black">
                                    Are you sure you want to delete this item? This action cannot be undone.
                                </DialogDescription>
                                <div className="flex justify-between">
                                    <DialogClose className="cancel-btn w-[75px] h-[37px] flex justify-center items-center ">Cancel</DialogClose>
                                    <DialogClose className=" w-[75px] h-[37px] flex justify-center items-center text-white ">Delete</DialogClose>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <p className="overflow-hidden h-[22px]"><b>$</b> {price} </p>
                <p className="text-sm overflow-hidden h-[78px]">{itemDesc}</p>
            </div>
        </div>
    )
}

export default Item;
