import { ItemBar } from "@/components/item-bar"
import { ItemImage } from "@/components/item-image"
import { ItemDetails } from "@/components/item-details"
import { useNavigate, useParams } from "react-router-dom"

export default function ItemPage() {
  const navigate = useNavigate()
  const { itemId } = useParams()

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
    // 
    console.log()
  }

  const handleDelete = async () => {
  }

  return (
    <div className="min-h-screen bg-[var(--bg-sandpaper)]">
      {/* fixed nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-sandpaper)]">
        <div className="max-w-[1400px] mx-auto w-full px-6">
          <ItemBar 
            className="py-10"
/*             onEdit={handleEdit}
            onDelete={handleDelete} */
          />
        </div>
      </div>

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