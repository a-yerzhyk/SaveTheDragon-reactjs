'use client'

import { useState } from 'react'
import {
  GameLocationConfig,
  EVENTS,
  Direction,
  LocationID,
  PersonID,
  EnemyConfig,
  ENEMY
} from "save-the-dragon"
import useEventManager from '@/hooks/useEventManager'
import { classNames } from '@/utils/classNames'
import { HitTheNumberBattle } from 'save-the-dragon'
import BattleScreen from './BattleScreen'
import Hero from './Hero'
import Enemy from './Enemy'

export default function GameplaySrceen ({
  currentLocation,
  onMove,
  onTeleport,
  onBattleStart
}: {
  currentLocation: GameLocationConfig
  onMove: (direction: Direction) => void
  onTeleport: (locationId: LocationID) => void
  onBattleStart: (enemyId: PersonID) => HitTheNumberBattle | null
}) {
  const [location, setLocation] = useState(currentLocation)
  const [direction, setDirection] = useState<Direction>('l')
  const [battle, setBattle] = useState<HitTheNumberBattle | null>(null)

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

  const paths = location.linkedLocations.map(linkedLocation => {
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
  const teleportPath = location.teleport !== null ? (
    <>
      <div
        className={classNames(
          'absolute w-[10px] h-[30px] bg-red-800 cursor-pointer',
          calcDirectionPosition(location.teleport.direction)
        )}
        onClick={() => onTeleport(location.teleport?.location.id || 0)}
      ></div>
    </>
  ) : null
  const enemies = Array.from(location.personsOnLocation).map(([id, enemy]) => {
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
  
  const heroPosition = calcHeroPosition(direction)
  const heroImageDirection = direction.includes('l') ? 'person_right' : 'person_left'

  return (
    <div className="relative w-full h-full flex gap-y-4 justify-center items-center">
      {battle && <BattleScreen battle={battle} onBattleEnd={() => setBattle(null)} />}
      {!battle &&
        <>
          <div className={classNames('absolute z-10 pointer-events-none', heroPosition, heroImageDirection)}>
            <Hero />
          </div>
          {paths}
          {teleportPath}
          <h3 className="absolute top-10 pt-4 text-center text-2xl capitalize">
            {location.name} {location.id}
          </h3>
          <div className="flex justify-center gap-x-4">
            {enemies}
          </div>
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
