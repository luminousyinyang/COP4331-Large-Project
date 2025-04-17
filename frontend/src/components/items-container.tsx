import { cn } from "@/lib/utils";
import { XSquare } from 'react-feather';

function ItemContainer({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex space-y-3 flex-col w-[780px] h-auto gap-3 bg-[var(--bg-pale-white)] border rounded-2xl items-center justify-start flex-start py-5", className)} {...props}>
            <div className="flex justify-center items-center gap-8 h-[195px] w-[720px] border rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] cursor-pointer hover:scale-102 transition-transform duration-500 ease-in-out">
                <span className="w-[160px] h-[160px] flex justify-center items-center border rounded-2xl text-white bg-[var(--bg-navy)]">
                    Image
                </span>
                <div className="w-[480px] h-full flex flex-col justify-start pt-5 gap-3">
                    <div className="flex justify-between">
                        <h2 className="font-bold">This Product's Name</h2>
                        <XSquare size={22} className="hover:text-red-900"/>
                    </div>
                    <p>$999.99</p>
                    <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry ...</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-8 h-[195px] w-[720px] border rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] cursor-pointer hover:scale-102 transition-transform duration-500 ease-in-out">
                <span className="w-[160px] h-[160px] flex justify-center items-center border rounded-2xl text-white bg-[var(--bg-navy)]">
                    Image
                </span>
                <div className="w-[480px] h-full flex flex-col justify-start pt-5 gap-3">
                    <div className="flex justify-between">
                        <h2 className="font-bold">This Product's Name</h2>
                        <XSquare size={22} className="hover:text-red-900"/>
                    </div>
                    <p>$999.99</p>
                    <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry ...</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-8 h-[195px] w-[720px] border rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] cursor-pointer hover:scale-102 transition-transform duration-500 ease-in-out">
                <span className="w-[160px] h-[160px] flex justify-center items-center border rounded-2xl text-white bg-[var(--bg-navy)]">
                    Image
                </span>
                <div className="w-[480px] h-full flex flex-col justify-start pt-5 gap-3">
                    <div className="flex justify-between">
                        <h2 className="font-bold">This Product's Name</h2>
                        <XSquare size={22} className="hover:text-red-900"/>
                    </div>
                    <p>$999.99</p>
                    <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry ...</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-8 h-[195px] w-[720px] border rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] cursor-pointer hover:scale-102 transition-transform duration-500 ease-in-out">
                <span className="w-[160px] h-[160px] flex justify-center items-center border rounded-2xl text-white bg-[var(--bg-navy)]">
                    Image
                </span>
                <div className="w-[480px] h-full flex flex-col justify-start pt-5 gap-3">
                    <div className="flex justify-between">
                        <h2 className="font-bold">This Product's Name</h2>
                        <XSquare size={22} className="hover:text-red-900"/>
                    </div>
                    <p>$999.99</p>
                    <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry ...</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-8 h-[195px] w-[720px] border rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] cursor-pointer hover:scale-102 transition-transform duration-500 ease-in-out">
                <span className="w-[160px] h-[160px] flex justify-center items-center border rounded-2xl text-white bg-[var(--bg-navy)]">
                    Image
                </span>
                <div className="w-[480px] h-full flex flex-col justify-start pt-5 gap-3">
                    <div className="flex justify-between">
                        <h2 className="font-bold">This Product's Name</h2>
                        <XSquare size={22} className="hover:text-red-900"/>
                    </div>
                    <p>$999.99</p>
                    <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry ...</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-8 h-[195px] w-[720px] border rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] cursor-pointer hover:scale-102 transition-transform duration-500 ease-in-out">
                <span className="w-[160px] h-[160px] flex justify-center items-center border rounded-2xl text-white bg-[var(--bg-navy)]">
                    Image
                </span>
                <div className="w-[480px] h-full flex flex-col justify-start pt-5 gap-3">
                    <div className="flex justify-between">
                        <h2 className="font-bold">This Product's Name</h2>
                        <XSquare size={22} className="hover:text-red-900"/>
                    </div>
                    <p>$999.99</p>
                    <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry ...</p>
                </div>
            </div>

        </div>
    );
  }

export { ItemContainer };