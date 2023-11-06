'use client'

import { classNames } from '@/utils/classNames'
import { useState } from 'react'
import { EVENTS } from 'save-the-dragon';
import useEventManager from '@/hooks/useEventManager';

let reasonToDisplay = ''

export default function GameoverScreen() {
  const [reason, setReason] = useState<string | null>(null)
  reasonToDisplay = reason ? reason : reasonToDisplay

  const onGameOver = (reason: string) => {
    setReason(reason)
    setTimeout(() => {
      setReason(null)
    }, 3500)
  }
  useEventManager(EVENTS.gameOver, onGameOver)

  return (
    <div className={classNames(
      'absolute w-full h-full top-0 left-0 flex justify-center items-center z-20',
      reason ? 'pointer-events-auto' : 'pointer-events-none'
    )}>
      <div className={classNames(
        'gameover-bg gameover-bg__r',
        reason ? 'gameover-bg__r_active' : ''
      )}></div>
      <div className={classNames(
        'gameover-bg gameover-bg__l',
        reason ? 'gameover-bg__l_active' : ''
      )}></div>
      <div className={classNames(
        'z-20 transition-opacity duration-1000 ',
        reason ? 'opacity-100' : 'opacity-0'
      )}>
        <p className="text-2xl text-white text-center mb-6">Game Over</p>
        <p className="text-lg text-white text-center">{reasonToDisplay}</p>
      </div>
    </div>
  )
}
