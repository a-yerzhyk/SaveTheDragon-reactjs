'use client'

import { useState } from 'react'
import { Inventory, InventoryCell, ITEM, EVENTS } from 'save-the-dragon'
import { classNames } from '@/utils/classNames'
import useEventManager from '@/hooks/useEventManager'

const INVENTORY_SIZE = 5

export default function Inventory({
  inventory,
  onUse
}: {
  inventory: Inventory
  onUse: (item: any) => void
}) {
  const [heroInventory, setHeroInventory] = useState(inventory)

  const fullInventory: Array<InventoryCell | null> = []
  for (let i = 0; i < INVENTORY_SIZE; i++) {
    fullInventory.push(heroInventory[i] || null)
  }

  const handleClick = (item?: ITEM) => {
    if (item) {
      onUse(item)
    }
  }

  const updateInventory = (id: number, type: string, newInventory: Inventory) => {
    if (type === 'hero') {
      setHeroInventory(newInventory.slice())
    }
  }

  useEventManager(EVENTS.useItem, updateInventory)
  useEventManager(EVENTS.giveItem, updateInventory)

  return (
    <div className="flex justify-between gap-6 w-full h-full p-8 inventory">
      {
        fullInventory.map((cell, index) => (
          <div
            key={index}
            className={classNames(
              'flex items-center justify-center flex-1 bg-[#92400E] border-4 border-orange-950 rounded-full p-2',
              cell ? 'cursor-pointer' : ''
            )}
            onClick={() => cell && handleClick(cell.item.type)}
          >
            {cell && `${cell.item.label} (${cell.quantity})`}
          </div>
        ))
      }
    </div>
  )
}