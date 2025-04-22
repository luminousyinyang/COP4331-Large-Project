import * as React from "react"
import { cn } from "@/lib/utils"

interface ItemDetailsProps extends React.ComponentProps<"div"> {
  name: string
  price: string
  link: string
  description: string
}

export function ItemDetails({ 
  className, 
  name, 
  price, 
  link, 
  description, 
  ...props 
}: ItemDetailsProps) {
  return (
    <div className={cn("flex flex-col gap-8 bg-[#FEE7D1] rounded-xl p-8", className)} {...props}>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-4xl font-bold text-[var(--bg-navy)]">{name}</h2>
        <div className="w-full border-b border-[var(--bg-navy)]" />
      </div>
      
      <div className="text-4xl font-bold text-[var(--bg-navy)]">
        ${price}
      </div>
      
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium text-[var(--bg-navy)]">Product is available at:</h2>
        <ul className="list-disc list-inside">
          <li>
            <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Product Link
            </a>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[var(--text-navy)]">About this item</h2>
        <p className="text-[var(--bg-navy)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
