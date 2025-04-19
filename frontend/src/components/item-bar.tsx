import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowLeft, Trash2, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

interface ItemBarProps extends React.ComponentProps<"div"> {
  onEdit?: () => void
  onDelete?: () => void
}

export function ItemBar({ className, onEdit, onDelete, ...props }: ItemBarProps) {
  const navigate = useNavigate()

  return (
    <div className={cn("flex justify-between items-center w-full px-6 py-6", className)} {...props}>
      <button 
        className="bg-[var(--bg-salmon)]] text-white hover:bg-[var(--bg-navy)] hover:border-[var(--bg-navy)] h-[45px] flex items-center gap-2 px-6 relative rounded-full border border-transparent transition-all duration-350 ease-in-out shadow-[5px_5px_5px_rgba(0,0,0,0.3)]"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={22} />
        <span className="text-lg">Go Back</span>
      </button>
      
      <div className="flex gap-4">
        <button 
          className="!bg-[var(--bg-navy)] text-white hover:!bg-[var(--bg-salmon)] hover:border-[var(--bg-salmon)] h-[45px] flex items-center gap-2 px-6 relative rounded-full transition-all duration-350 ease-in-out shadow-[5px_5px_5px_rgba(0,0,0,0.3)]"
          onClick={onEdit}
        >
          <i className="inline-block text-xl bi bi-gear-fill hover:text-white hover:scale-125 hover:rotate-180 transition-all duration-400 ease-out"></i>
          <span className="text-lg">Edit</span>
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <button 
              className="bg-[var(--bg-salmon)] text-white hover:bg-[var(--bg-navy)] hover:border-[var(--bg-navy)] h-[45px] flex items-center gap-2 px-6 relative rounded-full border border-transparent transition-all duration-350 ease-in-out shadow-[5px_5px_5px_rgba(0,0,0,0.3)]"
            >
              <Trash2 size={22} />
              <span className="text-lg">Delete</span>
            </button>
          </DialogTrigger>
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
                <DialogClose className="cancel-btn w-[125px] h-[37px] flex justify-center items-center">Cancel</DialogClose>
                <DialogClose className="w-[125px] h-[37px] flex justify-center items-center text-white bg-[var(--bg-salmon)]" onClick={onDelete}>Delete</DialogClose>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}