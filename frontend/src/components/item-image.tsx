import * as React from "react"
import { cn } from "@/lib/utils"

interface ItemImageProps extends React.ComponentProps<"div"> {
  imageUrl: string
  tags?: Array<{
    id: string
    name: string
  }>
}

export function ItemImage({ className, imageUrl, tags, ...props }: ItemImageProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="w-full aspect-square rounded-xl overflow-hidden">
        <img 
          src={imageUrl} 
          alt="image here" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        {tags?.map(tag => (
          <span 
            key={tag.id}
            className="px-6 py-2 bg-[var(--bg-salmon)] text-white rounded-full text-base hover:bg-[var(--bg-navy)] transition-colors duration-200 cursor-pointer"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  )
}