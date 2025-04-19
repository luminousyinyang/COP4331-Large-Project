import * as React from "react"
import { cn } from "@/lib/utils"

interface Tag {
  id: string
  name: string
}

interface TagsProps extends React.ComponentProps<"div"> {
  tags: Tag[]
}

export function Tags({ className, tags, ...props }: TagsProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {tags.map(tag => (
        <span 
          className="bg-[var(--bg-salmon)] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--bg-navy)] transition-colors duration-200"
        >
          {tag.name}
        </span>
      ))}
    </div>
  )
} 