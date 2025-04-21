"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function DropdownMenuCheckboxes({ text, style, size, options, onChange }) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [checkedItems, setCheckedItems] = React.useState<string[]>([])

  const handleToggle = (opt: string) => (newState: Checked) => {
    // implement search l8r
    const next = newState ? [...checkedItems, opt] : checkedItems.filter((x) => x !== opt);
    setCheckedItems(next);
    onChange?.(next);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={style}>{ text }</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`${size} bg-[var(--bg-pale-white)] border border-black scrollbar-thin`}>
        <DropdownMenuLabel>All Tags</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-black"/>

        {options.map((opt) => (
          <DropdownMenuCheckboxItem
            key={opt}
            checked={checkedItems.includes(opt)}
            onCheckedChange={handleToggle(opt)}
            >{opt}</DropdownMenuCheckboxItem>
        ))}
        
        
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
