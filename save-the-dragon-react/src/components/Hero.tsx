'use client'

import heroImage from '@/assets/person/knight.png'
import Image from 'next/image'

export default function Hero ({
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
