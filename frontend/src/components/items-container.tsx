import { cn } from "@/lib/utils";
import Item from "@/components/mini-comp/productItem";

type ItemType = {
    imageURL: string;
    description: string;
    price: number;
    title: string;
};

function ItemContainer({ className, items = [], ...props }: React.ComponentProps<"div"> & { items: ItemType[] }) {
    return (
        <div className={cn("flex space-y-3 flex-col w-[780px] h-auto gap-3 bg-[var(--bg-pale-white)] border rounded-2xl items-center justify-start py-5", className)} {...props}>
            {items.length > 0 ? (
                items.map((item, index) => (
                    <Item
                        key={index}
                        image={item.imageURL}
                        imgDesc={item.title}
                        price={item.price}
                        itemDesc={item.description}
                        title={item.title}
                    />
                ))
            ) : (
                <p>No items found.</p>
            )}
        </div>
    );
}

export { ItemContainer };
