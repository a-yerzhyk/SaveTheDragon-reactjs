'use client'

import { useState } from 'react'
import Game from './Game';
import MainMenu from './MainMenu';
import {
  Game as STDGame,
  GameCreator as STDGameCreator,
  GameConfig as STDGameConfig,
  EVENTS
} from 'save-the-dragon'
import useEventManager from '@/hooks/useEventManager';

export default function Frame() {
  const [game, setGame] = useState<STDGame | null>(null)
  const [currentSlot, setCurrentSlot] = useState<number | null>(null)

  const onGameOver = () => {
    setGame(null)
  }
  useEventManager(EVENTS.gameOver, onGameOver)

  const newGame = (slotId: number) => {
    const game = new STDGameCreator().createGame()
    setGame(game)
    setCurrentSlot(slotId)
  }

  const loadGame = () => {
    const gameConf = {} as STDGameConfig
    const game = new STDGameCreator(gameConf).createGame()
    setGame(game)
  }

  const saveGame = () => {
    console.log('save game in', currentSlot)
  }

  return (
    <div className="w-[60%] h-[70%] border-4 border-gray-800 rounded-2xl overflow-hidden">
      {!game && <MainMenu onNewGame={newGame} />}
      {game && <Game game={game} />}
    </div>
  )
}