'use client'

import Image from "next/image";
import breadImage from '@/assets/items/bread.png'
import potionImage from '@/assets/items/potion_of_power.png'
import keyImage from '@/assets/items/key.png'

import { ITEM } from "save-the-dragon";
import { classNames } from "@/utils/classNames";

export default function Enemy ({
  type,
  onClick
}: {
  type: ITEM
  onClick?: () => void
}) {
  const itemImage = getItemImage(type)
  const clickable = isItemClickable(type) && typeof onClick !== 'undefined'

  return (
    <Image
      height={67}
      className={classNames(clickable ? 'cursor-pointer' : '')}
      src={itemImage}
      alt={type}
      onClick={() => clickable ? onClick() : null}
    />
  )
}

function getItemImage (type: ITEM) {
  switch(type) {
    case ITEM.BREAD:
      return breadImage
    case ITEM.POTION_OF_POWER:
      return potionImage
    case ITEM.JAIL_KEY:
      return keyImage
  }
}

function isItemClickable (type: ITEM) {
  switch(type) {
    case ITEM.JAIL_KEY:
      return false
    default:
      return true
  }
}
