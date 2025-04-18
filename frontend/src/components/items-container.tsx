import { cn } from "@/lib/utils";
import Item from "@/components/mini-comp/productItem";


function ItemContainer({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex space-y-3 flex-col w-[780px] h-auto gap-3 bg-[var(--bg-pale-white)] border rounded-2xl items-center justify-start flex-start py-5", className)} {...props}>
            <Item 
                image={"Image"} 
                imgDesc={"Image"}
                price={999.99}
                itemDesc={"Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
            />
            <Item 
                image={"Image"} 
                imgDesc={"Image"}
                price={999.99}
                itemDesc={"Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry ..."}
            />
            <Item 
                image={"Image"} 
                imgDesc={"Image"}
                price={999.99}
                itemDesc={"Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry ..."}
            />
            <Item 
                image={"Image"} 
                imgDesc={"Image"}
                price={999.99}
                itemDesc={"Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry ..."}
            />
            <Item 
                image={"Image"} 
                imgDesc={"Image"}
                price={999.99}
                itemDesc={"Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry ..."}
            />
        </div>
    );
  }

export { ItemContainer };