import { ItemBar } from "@/components/item-bar"
import { ItemImage } from "@/components/item-image"
import { ItemDetails } from "@/components/item-details"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

interface Tag {
  id: string;
  name: string;
}

interface Item {
  _id: string;
  title: string;
  price: string;
  productURL: string;
  description: string;
  imageURL: string;
  tags: Tag[];
}

export default function ItemPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true);
  const color = "black";
  const { id } = useParams<{ id: string }>();

  const [item, setItem] = useState<Item | null>(null);
  // err state?


  // const { itemId } = useParams()

  useEffect(() => {
    async function fetchItem() {
      try {
        const resp = await fetch('/api/item/singleitem', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({itemID: id}),
        });

        const data = await resp.json();
        if (!resp.ok) {
          // err or navigate back
        }

        setItem(data.item);
      } catch (err) {
        console.log(err)
        // err or navigate back
      } finally {
        await new Promise(resolve => setTimeout(resolve, 200));
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  // test
  // const item2 = {
  //   name: "This Product's Name",
  //   price: "999.99",
  //   link: "link-is-located-here.link",
  //   description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   imageUrl: "/placeholder.jpg",
  //   tags: [
  //     { id: "1", name: "Birthday" },
  //     { id: "2", name: "orange" },
  //     { id: "3", name: "hi" },
  //     { id: "4", name: "tag" }
  //   ]
  // }

  const handleGoBack = () => {
    navigate('/home')
  }

  const handleDelete = async () => {
  }

  return (
    <div className="min-h-screen bg-[var(--bg-sandpaper)]">
      {loading ? (
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
          <SyncLoader
            color={color}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h2 className="text-xl py-10">Please wait a few seconds</h2>
        </div>
      ) : (
      <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-sandpaper)]">
        <div className="max-w-[1400px] mx-auto w-full px-6">
          <ItemBar 
            className="py-10"
            onDelete={handleDelete}
            onGoBack={handleGoBack}
            item={item || undefined}
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
                imageUrl={item?.imageURL || ""}
                tags={item?.tags || []}
              />
            </div>
            
            {/* scroll */}
            <div className="w-[700px] overflow-y-auto h-full pb-8">
              <ItemDetails 
                name={item?.title || ""}
                price={item?.price || ""}
                link={item?.productURL || ""}
                description={item?.description || ""}
              />
            </div>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  )
}