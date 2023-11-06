'use client'

import { useState } from 'react'
import {
  Game as STDGame,
  GameLocationConfig,
  EVENTS,
  Direction,
  LocationID,
  PersonID,
  EnemyConfig,
  ENEMY,
  SECTION
} from "save-the-dragon"
import useEventManager from '@/hooks/useEventManager'
import { classNames } from '@/utils/classNames'
import { HitTheNumberBattle } from 'save-the-dragon'
import BattleScreen from './BattleScreen'
import { Hero, Dragon } from './Person'
import Enemy from './Enemy'

import Image from 'next/image'
import forestImage from '@/assets/backgrounds/locations/grass.png'
import townImage from '@/assets/backgrounds/locations/town.png'
import castleImage from '@/assets/backgrounds/locations/castle.png'

export default function GameplaySrceen ({
  game,
  location,
  direction,
  onMove,
  onTeleport,
  onBattleStart,
  onSaveDragon
}: {
  game: STDGame
  location: GameLocationConfig
  direction: Direction
  onMove: (direction: Direction) => void
  onTeleport: (locationId: LocationID) => void
  onBattleStart: (enemyId: PersonID) => HitTheNumberBattle | null
  onSaveDragon: () => void
}) {
  const [heroLocation, setLocation] = useState(location)
  const [heroDirection, setDirection] = useState<Direction>(direction)
  const [battle, setBattle] = useState<HitTheNumberBattle | null>(null)
  const currentDay = game.getCurrentDay()
  const totalDays = game.daysToSave

  const handleMove = (nextLocation: GameLocationConfig, nextDirection: Direction) => {
    setLocation(nextLocation)
    setDirection(nextDirection)
  }
  useEventManager(EVENTS.move, handleMove)

  const handleBattleStart = (enemyId: PersonID) => {
    const battle = onBattleStart(enemyId)
    if (battle) {
      setBattle(battle)
    }
  }

  const saveTheDragon = () => {
    onSaveDragon()
  }

  const backgroundImage = getSectionBackground(heroLocation.section)

  const paths = heroLocation.linkedLocations.map(linkedLocation => {
    const direction = linkedLocation.direction
    return (
      <div
        key={direction}
        className={classNames(
          'absolute w-[10px] h-[30px] bg-red-400 cursor-pointer',
          calcDirectionPosition(direction)
        )}
        onClick={() => onMove(direction)}
      ></div>
    )
  })
  const teleportPath = heroLocation.teleport !== null ? (
    <>
      <div
        className={classNames(
          'absolute w-[10px] h-[30px] bg-red-800 cursor-pointer',
          calcDirectionPosition(heroLocation.teleport.direction)
        )}
        onClick={() => onTeleport(heroLocation.teleport?.location.id || 0)}
      ></div>
    </>
  ) : null
  const enemies = Array.from(heroLocation.personsOnLocation).map(([id, enemy]) => {
    return (
      <Enemy
        key={id}
        id={id}
        health={enemy.getHealth()}
        maxHealth={enemy.getMaxHealth()}
        type={(enemy as EnemyConfig).type as ENEMY}
        onClick={() => handleBattleStart(id)}
      />
    )
  })

  const dragon = heroLocation.section === SECTION.TOWN && heroLocation.type === 'jail' && (
    <div className="absolute z-10 top-[4%] left-[44%] cursor-pointer" onClick={saveTheDragon}>
      <Dragon />
    </div>
  )
  
  const heroPosition = calcHeroPosition(heroDirection)
  const heroImageDirection = heroDirection.includes('l') ? 'person_right' : 'person_left'

  return (
    <div className="relative w-full h-full flex gap-y-4 justify-center items-center">
      <Image className="absolute top-0 left-0 w-full h-full" src={backgroundImage} alt={heroLocation.section}/>
      <div className="absolute top-0 left-0 p-3 text-center text-shadow_white text-2xl capitalize dot-bg dot-bg_sand border-b-4 border-r-4 border-gray-800 rounded-br-2xl">
        {heroLocation.name}
      </div>
      <div className="absolute top-[60px] left-0 px-3 py-1 text-center text-shadow_white text-md capitalize dot-bg dot-bg_sand border-b-4 border-r-4 border-gray-800 rounded-r-2xl">
        Day: {currentDay} / {totalDays}
      </div>
      {battle &&
        <BattleScreen
          battle={battle}
          section={heroLocation.section}
          onBattleEnd={() => setBattle(null)}
        />
      }
      {!battle &&
        <>
          <div className={classNames('absolute z-10 pointer-events-none', heroPosition, heroImageDirection)}>
            <Hero />
          </div>
          {paths}
          {teleportPath}
          <div className="flex justify-center gap-x-4">
            {enemies}
          </div>
          {dragon}
        </>
      }
    </div>
  )
}

function calcDirectionPosition (direction: Direction) {
  switch(direction) {
    case 'l':
      return 'top-[50%] left-[1%] rotate-90'
    case 'r':
      return 'top-[50%] left-[98.5%] rotate-90'
    case 't':
      return 'top-0 left-[50%]'
    case 'b':
      return 'top-[93%] left-[50%]'
    case 'tr':
      return '-top-[2%] left-[85%] rotate-45'
    case 'tl':
      return '-top-[2%] left-[15%] -rotate-45'
    case 'br':
      return 'top-[95%] left-[85%] -rotate-45'
    case 'bl':
      return 'top-[95%] left-[15%] rotate-45'
  }
}

function calcHeroPosition (direction: Direction) {
  switch(direction) {
    case 'l':
      return 'top-[40%] left-[0%]'
    case 'r':
      return 'top-[40%] left-[87%]'
    case 't':
      return 'top-[4%] left-[44%]'
    case 'b':
      return 'top-[70%] left-[44%]'
    case 'tr':
      return 'top-[4%] left-[75%]'
    case 'tl':
      return 'top-[4%] left-[14%]'
    case 'br':
      return 'top-[70%] left-[75%]'
    case 'bl':
      return 'top-[70%] left-[14%]'
  }
}

function getSectionBackground(section: SECTION) {
  switch (section) {
    case SECTION.SUBURB:
      return forestImage
    case SECTION.TOWN:
      return townImage
    case SECTION.CASTLE:
      return castleImage
  }
}
