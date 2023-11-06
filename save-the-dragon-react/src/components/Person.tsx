'use client'

import heroImage from '@/assets/person/knight.png'
import dragonImage from '@/assets/person/dragon.png'
import Image from 'next/image'

export function Hero ({
  size = 130
}: {
  size?: number
}) {

  return (
    <Image
      height={size}
      src={heroImage}
      alt="hero"
    />
  )
}

export function Dragon ({
  size = 130
}: {
  size?: number
}) {

  return (
    <Image
      height={size}
      src={dragonImage}
      alt="hero"
    />
  )
}
