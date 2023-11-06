'use client'

import { useState } from 'react'
import Game from './Game';
import MainMenu from './MainMenu';
import {
  Game as STDGame,
  GameCreator as STDGameCreator,
  GameConfig as STDGameConfig,
  EVENTS,
} from 'save-the-dragon'
import useEventManager from '@/hooks/useEventManager';
import Store from '@/utils/store';
import GameoverScreen from './GameoverScreen';
import GameLogger from './GameLogger';

export default function Frame() {
  const [game, setGame] = useState<STDGame | null>(null)
  const [currentSlot, setCurrentSlot] = useState<string | null>(null)

  const onGameOver = (reason: string) => {
    setTimeout(() => {
      setGame(null)
    }, 4000)
  }
  useEventManager(EVENTS.gameOver, onGameOver)

  const onGameWin = () => {
    setGame(null)
  }
  useEventManager(EVENTS.gameWin, onGameWin)

  const newGame = (slotId: string) => {
    const game = new STDGameCreator().createGame()
    setCurrentSlot(slotId)
    setGame(game)
  }

  const loadGame = (slotId: string, config: Partial<STDGameConfig> | null) => {
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
    <div className="relative w-[60%] h-[80%] border-4 border-gray-800 rounded-2xl overflow-hidden z-10">
      {!game && <MainMenu onNewGame={newGame} onLoadGame={loadGame} />}
      {game && <Game game={game} onSaveGame={saveGame} />}
      <GameoverScreen />
      <GameLogger />
    </div>
  )
}