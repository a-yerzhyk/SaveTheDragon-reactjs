'use client'

import { useState } from 'react'
import Game from './Game';
import MainMenu from './MainMenu';
import {
  Game as STDGame,
  GameCreator as STDGameCreator,
  GameConfig as STDGameConfig,
  EVENTS,
  GameConfig
} from 'save-the-dragon'
import useEventManager from '@/hooks/useEventManager';
import Store from '@/utils/store';

export default function Frame() {
  const [game, setGame] = useState<STDGame | null>(null)
  const [currentSlot, setCurrentSlot] = useState<string | null>(null)

  const onGameOver = () => {
    setGame(null)
  }
  useEventManager(EVENTS.gameOver, onGameOver)

  const newGame = (slotId: string) => {
    const game = new STDGameCreator().createGame()
    setCurrentSlot(slotId)
    setGame(game)
  }

  const loadGame = (slotId: string, config: Partial<GameConfig> | null) => {
    if (!config) return
    const gameConf = config
    const game = new STDGameCreator(gameConf).createGame()
    setCurrentSlot(slotId)
    setGame(game)
  }

  const saveGame = () => {
    if (game && currentSlot) {
      const { set } = Store()
      const gameConf = game.saveGame()
      set(currentSlot, gameConf)
    }
  }

  return (
    <div className="relative w-[60%] h-[70%] border-4 border-gray-800 rounded-2xl overflow-hidden">
      <button className="absolute top-2 right-2 button" onClick={saveGame}>Save Game</button>
      {!game && <MainMenu onNewGame={newGame} onLoadGame={loadGame} />}
      {game && <Game game={game} onSaveGame={saveGame} />}
    </div>
  )
}