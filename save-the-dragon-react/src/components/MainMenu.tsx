'use client'

import { useState, useEffect } from 'react'
import { classNames } from '@/utils/classNames'
import { GameConfig } from 'save-the-dragon'
import Image from 'next/image'

import heroImageBig from '@/assets/person/knight_big.png'
import Store from '@/utils/store';

type SlotConfig = Partial<GameConfig> | null

type Slot = {
  id: string,
  name: string,
  config: SlotConfig
}

const SLOTS = ['1', '2', '3']

export default function MainMenu ({
  onNewGame,
  onLoadGame
}: {
  onNewGame?: (slotId: string) => void
  onLoadGame?: (slotId: string, config: SlotConfig) => void
}) {
  const [isNewGame, setIsNewGame] = useState<boolean>(false)
  const [gameSlots, setGameSlots] = useState<Slot[]>(SLOTS.map(slot => ({ id: slot, name: 'Slot ' + slot, config: null})))

  const handleNewGameClick = () => {
    setIsNewGame(true)
  }

  const handleLoadGameClick = () => {
    setIsNewGame(false)
  }

  const startNewGame = (slotId: string) => {
    if (onNewGame) {
      onNewGame(slotId)
    }
  }

  const loadGame = (slotId: string, config: SlotConfig) => {
    if (!config) {
      return
    }
    if (onLoadGame) {
      onLoadGame(slotId, config)
    }
  }

  useEffect(() => {
    const { get } = Store()
    const gameSlots = SLOTS.map(slot => {
      const config = get(slot) as SlotConfig
      return {
        id: slot,
        name: 'Slot ' + slot,
        config
      }
    })
    setGameSlots(gameSlots)
  }, [])

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
                  <button className="button" key={slot.id} onClick={() => startNewGame(slot.id)}>
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