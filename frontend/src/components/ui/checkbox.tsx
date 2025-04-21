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
  const [checkedIds, setCheckedIds] = React.useState<string[]>([]);

  const toggle = (tagId: string) => {
    const next = checkedIds.includes(tagId)
      ? checkedIds.filter(id => id !== tagId)
      : [...checkedIds, tagId];
    setCheckedIds(next);
    onChange(next);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={style}>{ text }</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`${size} bg-[var(--bg-pale-white)] border border-black scrollbar-thin`}>
        <DropdownMenuLabel>All Tags</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-black"/>

        {options.map(tag => (
          <DropdownMenuCheckboxItem
            key={tag._id}
            checked={checkedIds.includes(tag._id)}
            onCheckedChange={() => toggle(tag._id)}
          >
            {tag.tagName}
          </DropdownMenuCheckboxItem>
        ))}
        
        
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
