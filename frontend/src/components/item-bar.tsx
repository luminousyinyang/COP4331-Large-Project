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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface ItemBarProps extends React.ComponentProps<"div"> {
  onEdit?: () => void
  onDelete?: () => void
  item?: {
    name: string
    price: string
    description: string
    imageUrl: string
    tags?: Array<{ id: string, name: string }>
  }
}

export function ItemBar({ className, onEdit, onDelete, item, ...props }: ItemBarProps) {
  const navigate = useNavigate()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    tag: "",
    description: "",
    imageUrl: ""
  })

  const handleEditClick = () => {
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
  }

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setEditForm((prev) => ({ ...prev, [id]: value }))
  }

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
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <button 
              className="!bg-[var(--bg-navy)] text-white hover:!bg-[var(--bg-salmon)] hover:border-[var(--bg-salmon)] h-[45px] flex items-center gap-2 px-6 relative rounded-full transition-all duration-350 ease-in-out shadow-[5px_5px_5px_rgba(0,0,0,0.3)]"
              onClick={handleEditClick}
            >
              <i className="inline-block text-xl bi bi-gear-fill hover:text-white hover:scale-125 hover:rotate-180 transition-all duration-400 ease-out"></i>
              <span className="text-lg">Edit</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[var(--bg-sandpaper)] w-[560px] h-[720px] py-5 px-15">
            <DialogHeader>
              <form onSubmit={handleEditSubmit} className="relative flex flex-col gap-3.5">
                <DialogClose className="cancel-btn absolute w-[35px] h-[35px] -top-1 -right-11 text-white">
                  <X className="w-6 h-6 absolute top-1 right-1.75" />
                </DialogClose>

                <DialogTitle className="text-xl font-black flex justify-center">Edit Item</DialogTitle>
                <div className="border border-[var(--bg-navy)]" />

                <div>
                  <h2 className="font-bold">Image URL</h2>
                  <Input
                    id="imageUrl"
                    type="text"
                    value={editForm.imageUrl}
                    onChange={handleEditChange}
                    className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                  />
                  <img
                    src={editForm.imageUrl}
                    alt="Product preview"
                    className="mt-2 w-full h-[120px] object-cover bg-[var(--bg-pale-white)] border border-[var(--bg-navy)] rounded-2xl"
                  />
                </div>

                <div>
                  <h2 className="font-bold">Name</h2>
                  <Input
                    id="name"
                    type="text"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                  />
                </div>

                <div className="flex justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="font-bold">Price</h2>
                    <Input
                      id="price"
                      type="text"
                      value={editForm.price}
                      onChange={handleEditChange}
                      className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold">Tag (Optional)</h2>
                    <Input
                      id="tag"
                      type="text"
                      value={editForm.tag}
                      onChange={handleEditChange}
                      className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)]"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-bold">Description</h2>
                  <Textarea
                    id="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="bg-[var(--bg-pale-white)] border-[var(--bg-navy)] w-full h-[120px]"
                  />
                </div>

                <div className="flex justify-between mt-4">
                  <DialogClose className="cancel-btn w-[125px] h-[37px] flex justify-center items-center">
                    Cancel
                  </DialogClose>
                  <button
                    type="submit"
                    className="w-[125px] h-[37px] flex justify-center items-center text-white bg-[var(--bg-salmon)]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>

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