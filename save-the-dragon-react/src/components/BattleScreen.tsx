'use client'

import { useState, useEffect } from 'react'
import { EVENTS, HitTheNumberBattle, ENEMY, SECTION } from "save-the-dragon";
import useEventManager from '@/hooks/useEventManager'
import { classNames } from '@/utils/classNames';
import { Hero } from './Person';
import Enemy from './Enemy';
import { isNumberKeyEvent } from '@/utils/keyEvents'

import Image from 'next/image';
import forestArena from '@/assets/backgrounds/battle/forest.png'
import townArena from '@/assets/backgrounds/battle/town.png'
import castleArena from '@/assets/backgrounds/battle/forest.png'

type NumberObj = {
  num: number,
  success: boolean | null
}

export default function BattleScreen ({
  battle,
  section,
  onBattleEnd
}: {
  battle: HitTheNumberBattle,
  section: SECTION,
  onBattleEnd: () => void
}) {
  const [battleStarted, setBattleStarted] = useState(false)
  const backgroundImage = getBattleBackground(section)

  const startBattle = () => {
    setBattleStarted(true)
    startRound()
  }

  const startRound = () => {
    battle.startRound()
  }
  
  const onBattleRoundEnd = () => {
    const isHeroAlive = battle.isHeroAlive()
    const isEnemyAlive = battle.isEnemyAlive()
    const hasBattleEnd = !isHeroAlive || !isEnemyAlive
    const hasHeroWon = isHeroAlive && !isEnemyAlive
    if (!hasBattleEnd) {
      setTimeout(() => {
        startRound()
      }, 1000)
    } else if (hasHeroWon) {
      setTimeout(() => {
        onBattleEnd()
      }, 1000)
    }
  }
  useEventManager(EVENTS.battleRoundEnd, onBattleRoundEnd)

  return (
    <div className="flex flex-col w-full h-full">
      <Image className="absolute top-0 left-0 w-full h-full" src={backgroundImage} alt="battle-arena"/>
      <div className="flex items-end justify-between basis-[70%] px-[200px] z-10">
        <div className="person_right">
          <Hero size={230} />
        </div>
        <div>
          <Enemy
            id={battle.enemy.id}
            health={battle.enemy.getHealth()}
            maxHealth={battle.enemy.getMaxHealth()}
            type={battle.enemy.type as ENEMY}
            size={230}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between items-center basis-[30%] pb-4 z-10">
        {!battleStarted && <button className="button" onClick={startBattle}>Battle Start</button>}
        {battleStarted && <>
          <NumbersArray battle={battle} />
          <BattleTimer battle={battle} />
        </>}
      </div>
    </div>
  )
}

function NumbersArray ({
  battle,
}: {
  battle: HitTheNumberBattle,
}) {
  const maxStepsCount = battle.maxStepsCount()
  const [currentNumber, setCurrentNumber] = useState<number | null>(null)
  const [numbersArray, setNumbersArray] = useState<NumberObj[]>([])

  const onCurrentNumberChange = (number: number) => {
    setCurrentNumber(number)
  }
  useEventManager(EVENTS.battleCurrentNumber, onCurrentNumberChange)

  const onSuccessArrayChange = (isSuccess: boolean) => {
    const number = battle.getCurrent()
    setNumbersArray(prev => [...prev, { num: number, success: isSuccess }])
  }
  useEventManager(EVENTS.battleStep, onSuccessArrayChange)
  
  const onBattleRoundEnd = () => {
    setNumbersArray([])
    setCurrentNumber(null)
  }
  useEventManager(EVENTS.battleRoundEnd, onBattleRoundEnd)  

  const hitNumber = (num: number) => {
    battle.tryNumber(num)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isNumberKeyEvent(event)) {
        const num = Number(event.key)
        hitNumber(num)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div className="flex border-[4px] border-black rounded-md tabular-nums bg-gray-400">
      {new Array(maxStepsCount).fill(null).map((_, index) => {
        const obj = numbersArray[index]
        if (!obj && numbersArray.length === index) {
          return <div className="battle-number" key={index}>
              {currentNumber}
            </div>
        }
        if (!obj) {
          return <div className="battle-number" key={index}>
          
        </div>
        }
        return (<>
          <div
            key={index}
            className={classNames(
              'battle-number',
              obj.success === null ? '' : obj.success ? 'text-green-500' : 'text-red-500'
            )}
          >
            {obj.num}
          </div>
        </>)
      })}
    </div>
  )
}

function BattleTimer ({
  battle
}: {
  battle: HitTheNumberBattle
}) {
  const MAX_TIMER = battle.STEP_LIMIT
  const [timer, setTimer] = useState(MAX_TIMER)
  const currentTimer = timer < 0 ? 0 : timer
  const timerPercentage = (currentTimer / MAX_TIMER) * 100
  
  const onTimerTick = (timer: number) => {
    setTimer(timer)
  }
  useEventManager(EVENTS.battleTimer, onTimerTick)

  return (
    <div className="relative flex justify-center items-center w-[300px] h-5 rounded overflow-hidden bg-slate-700">
      <div
        style={{ transform: `translateX(${timerPercentage}%)` }}
        className={classNames(
          'absolute -left-[100%] w-full h-full top-0 transition-transform ease-linear',
          timerPercentage === 100 ? 'duration-[100ms]' : 'duration-[800ms]',
          timerPercentage < 30 ? 'bg-red-500' : timerPercentage < 70 ? 'bg-yellow-500' : 'bg-green-500'
        )}
      ></div>
      <p
        className="text-shadow text-lg text-white relative z-10"
      >
        {timer + 1}
      </p>
    </div>
  )
}

function getBattleBackground(section: SECTION) {
  switch (section) {
    case SECTION.SUBURB:
      return forestArena
    case SECTION.TOWN:
      return townArena
    case SECTION.CASTLE:
      return castleArena
  }
}
