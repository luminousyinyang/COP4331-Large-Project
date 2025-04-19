import { ItemBar } from "@/components/item-bar"
import { ItemImage } from "@/components/item-image"
import { ItemDetails } from "@/components/item-details"
import { useNavigate, useParams } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { useState } from "react"

export default function ItemPage() {
  const navigate = useNavigate()
  const { itemId } = useParams()

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    tag: "",
    description: "",
    imageUrl: ""
  })

  // test
  const item = {
    name: "This Product's Name",
    price: "999.99",
    link: "link-is-located-here.link",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imageUrl: "/placeholder.jpg",
    tags: [
      { id: "1", name: "Birthday" },
      { id: "2", name: "orange" },
      { id: "3", name: "hi" },
      { id: "4", name: "tag" }
    ]
  }

  const handleEdit = () => {
    setEditForm({
      name: item.name,
      price: item.price,
      tag: item.tags[0]?.name || "",
      description: item.description,
      imageUrl: item.imageUrl
    })
    setIsEditOpen(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
  }

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setEditForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleDelete = async () => {
  }

  return (
    <div className="min-h-screen bg-[var(--bg-sandpaper)]">
      <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-sandpaper)]">
        <div className="max-w-[1400px] mx-auto w-full px-6">
          <ItemBar 
            className="py-10"
            onEdit={handleEdit}
            onDelete={handleDelete}
            item={item}
          />
        </div>
      </div>

      {/* edit */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-[var(--bg-sandpaper)] w-[560px] h-[720px] py-5 px-15">
          <DialogHeader>
            <form onSubmit={handleEditSubmit} className="relative flex flex-col gap-3.5">
              <DialogClose className="cancel-btn absolute w-[35px] h-[35px] -top-1 -right-11 text-white">
                <X className="w-6 h-6 absolute top-1 right-1.75" />
              </DialogClose>
              <DialogTitle className="text-xl font-black flex justify-center">Edit Item</DialogTitle>
              <div className="border border-[var(--bg-navy)]" />

              {/* image preview */}
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

      {/* main */}
      <div className="fixed top-[112px] bottom-0 left-0 right-0 overflow-hidden">
        <div className="max-w-[1400px] h-full mx-auto w-full px-6 pt-8">
          <div className="flex gap-16 justify-center h-full">
            {/* left fixed */}
            <div className="w-[600px] flex-shrink-0">
              <ItemImage 
                imageUrl={item.imageUrl}
                tags={item.tags}
              />
            </div>
            
            {/* scroll */}
            <div className="w-[700px] overflow-y-auto h-full pb-8">
              <ItemDetails 
                name={item.name}
                price={item.price}
                link={item.link}
                description={item.description}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}