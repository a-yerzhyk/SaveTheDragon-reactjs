'use client'

import { classNames } from '@/utils/classNames'
import { useState } from 'react'
import Image from 'next/image'

import heroImageBig from '@/assets/person/knight_big.png'

export default function MainMenu ({
  onNewGame,
  onLoadGame
}: {
  onNewGame?: (slotId: number) => void
  onLoadGame?: (slotId: number) => void
}) {
  const [isNewGame, setIsNewGame] = useState<boolean>(false)

  const handleNewGameClick = () => {
    setIsNewGame(true)
  }

  const handleLoadGameClick = () => {
    setIsNewGame(false)
  }

  const startNewGame = (slotId: number, config: string | null) => {
    if (config) {
      return
    }
    if (onNewGame) {
      onNewGame(slotId)
    }
  }

  const loadGame = (slotId: number, config: string | null) => {
    if (!config) {
      return
    }
    if (onLoadGame) {
      onLoadGame(slotId)
    }
  }

  const gameSlots = [
    {
      id: 1,
      name: 'Slot 1',
      config: null
    },
    {
      id: 2,
      name: 'Slot 2',
      config: null
    },
    {
      id: 3,
      name: 'Slot 3',
      config: null
    }
  ]

  return (
    <div className="main-menu flex gap-x-8 w-full h-full">
      <div className="flex-1 flex items-center flex-wrap">
        <Image className="person person_right" src={heroImageBig} height={500} width={500} alt="dragon" />
        <div>

        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between items-center py-[100px]">
        <h1 className={`text-5xl`}>Save The Dragon</h1>
        <div className="flex flex-col items-center gap-y-10">
          <div className="flex gap-x-4">
            <button
              className={classNames('button menu-button', isNewGame ? 'button_active' : '')}
              disabled={isNewGame}
              onClick={handleNewGameClick}
            >
              New Game
            </button>
            <button
              className={classNames('button menu-button', isNewGame ? '' : 'button_active')}
              disabled={!isNewGame}
              onClick={handleLoadGameClick}
            >
              Load Game
            </button>
          </div>
          <div className="flex flex-col gap-10">
            {isNewGame
              ? gameSlots.map((slot) => (
                  <button className="button" key={slot.id} onClick={() => startNewGame(slot.id, slot.config)}>
                    &lt;{slot.name}&gt;
                  </button>
                ))
              : gameSlots.map((slot) => (
                  <button className="button" key={slot.id} onClick={() => loadGame(slot.id, slot.config)} disabled={slot.config === null}>
                    &lt;{slot.name}&gt;
                  </button>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}