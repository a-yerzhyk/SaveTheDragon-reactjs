'use client'

import { classNames } from '@/utils/classNames'
import { useState } from 'react'
import { GameLocationConfig, GameMapConfig, SECTION, EVENTS } from 'save-the-dragon'
import useEventManager from '@/hooks/useEventManager'

export default function MiniMap({
  location,
  getSection
}: {
  location: GameLocationConfig
  getSection: (section: SECTION) => GameMapConfig | undefined
}) {
  const [heroLocation, setHeroLocation] = useState<GameLocationConfig>(location)
  const [map, setMap] = useState<GameMapConfig | undefined>(getSection(location.section))
  const section = heroLocation.section

  const handleMove = (nextLocation: GameLocationConfig) => {
    setHeroLocation(nextLocation)
    setMap(getSection(nextLocation.section))
  }
  useEventManager(EVENTS.move, handleMove)

  const mapBg = section === SECTION.SUBURB
    ? 'bg-suburb'
    : section === SECTION.TOWN
      ? 'bg-town'
      : 'bg-castle'

  const mapSvg = map ? mapDrawer(map) : null

  return (
    <div className={classNames(
        'flex justify-between gap-6 w-full h-full',
        mapBg
      )}
    >
      {mapSvg}
    </div>
  )
}

const mapDrawer = (map: GameMapConfig) => {
  switch (map.section) {
    case SECTION.SUBURB:
      return drawSuburbMap(map)
    case SECTION.TOWN:
      return drawTownMap(map)
    case SECTION.CASTLE:
      return drawCastleMap(map)
    default:
      return null
  }
}

const drawSuburbMap = (map: GameMapConfig) => {
  return (
    <svg
      version="1.1"
      width="100%" height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <symbol id="location" width="20" height="20" viewBox="0 0 20 20">
          <ellipse cx="50%" cy="10" rx="8" ry="5" fill="#8f3001" stroke="black" strokeWidth="1" />
          <ellipse cx="50%" cy="6" rx="8" ry="4" fill="#8f3001" stroke="black" strokeWidth="1" />
          <ellipse cx="50%" cy="7" rx="7" ry="4" fill="#e64c00" />
        </symbol>
      </defs>

      <line x1="40%" y1="35%" x2="75%" y2="35%" stroke="#702a01" strokeWidth="3" />
      <line x1="7%" y1="62%" x2="93%" y2="62%" stroke="#702a01" strokeWidth="3" />
      <line x1="40%" y1="91%" x2="75%" y2="91%" stroke="#702a01" strokeWidth="3" />

      <line x1="40%" y1="35%" x2="40%" y2="91%" stroke="#702a01" strokeWidth="3" />
      <line x1="57%" y1="35%" x2="57%" y2="91%" stroke="#702a01" strokeWidth="3" />
      <line x1="75%" y1="8%" x2="75%" y2="91%" stroke="#702a01" strokeWidth="3" />

      <line x1="20%" y1="64%" x2="40%" y2="35%" stroke="#702a01" strokeWidth="3" />
      <line x1="20%" y1="61%" x2="40%" y2="91%" stroke="#702a01" strokeWidth="3" />

      <line x1="57%" y1="35%" x2="75%" y2="8%" stroke="#702a01" strokeWidth="3" />

      <line x1="75%" y1="35%" x2="93%" y2="62%" stroke="#702a01" strokeWidth="3" />
      <line x1="75%" y1="91%" x2="93%" y2="62%" stroke="#702a01" strokeWidth="3" />

      <use href="#location" x="72%" y="5%" />

      <use href="#location" x="37%" y="30%" />
      <use href="#location" x="54%" y="30%" />
      <use href="#location" x="72%" y="30%" />

      <use href="#location" x="5%" y="57%" />
      <use href="#location" x="20%" y="57%" />
      <use href="#location" x="37%" y="57%" />
      <use href="#location" x="54%" y="57%" />
      <use href="#location" x="72%" y="57%" />
      <use href="#location" x="90%" y="57%" />
      
      <use href="#location" x="37%" y="85%" />
      <use href="#location" x="54%" y="85%" />
      <use href="#location" x="72%" y="85%" />
    </svg>
  )
}

const drawTownMap = (map: GameMapConfig) => {
  return (
    <svg
      version="1.1"
      width="100%" height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <symbol id="location" width="20" height="20" viewBox="0 0 20 20">
          <ellipse cx="50%" cy="10" rx="8" ry="5" fill="#8f3001" stroke="black" strokeWidth="1" />
          <ellipse cx="50%" cy="6" rx="8" ry="4" fill="#8f3001" stroke="black" strokeWidth="1" />
          <ellipse cx="50%" cy="7" rx="7" ry="4" fill="#e64c00" />
        </symbol>
      </defs>

      <line x1="28%" y1="33%" x2="73%" y2="33%" stroke="#702a01" strokeWidth="3" />
      <line x1="7%" y1="54%" x2="93%" y2="54%" stroke="#702a01" strokeWidth="3" />
      <line x1="28%" y1="76%" x2="73%" y2="76%" stroke="#702a01" strokeWidth="3" />

      <line x1="28%" y1="33%" x2="28%" y2="76%" stroke="#702a01" strokeWidth="3" />
      <line x1="49%" y1="9%" x2="49%" y2="92%" stroke="#702a01" strokeWidth="3" />
      <line x1="72%" y1="33%" x2="72%" y2="76%" stroke="#702a01" strokeWidth="3" />

      <line x1="7%" y1="54%" x2="28%" y2="33%" stroke="#702a01" strokeWidth="3" />
      <line x1="7%" y1="54%" x2="28%" y2="76%" stroke="#702a01" strokeWidth="3" />

      <use href="#location" x="46%" y="5%" />
      
      <use href="#location" x="25%" y="28%" />
      <use href="#location" x="46%" y="28%" />
      <use href="#location" x="69%" y="28%" />

      <use href="#location" x="5%" y="48%" />
      <use href="#location" x="25%" y="48%" />
      <use href="#location" x="46%" y="48%" />
      <use href="#location" x="69%" y="48%" />
      <use href="#location" x="90%" y="48%" />

      <use href="#location" x="25%" y="70%" />
      <use href="#location" x="46%" y="70%" />
      <use href="#location" x="69%" y="70%" />

      <use href="#location" x="46%" y="89%" />
    </svg>
  )
}

const drawCastleMap = (map: GameMapConfig) => {
  return (
    <svg
      version="1.1"
      width="100%" height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <symbol id="location" width="20" height="20" viewBox="0 0 20 20">
          <ellipse cx="50%" cy="10" rx="8" ry="5" fill="#8f3001" stroke="black" strokeWidth="1" />
          <ellipse cx="50%" cy="6" rx="8" ry="4" fill="#8f3001" stroke="black" strokeWidth="1" />
          <ellipse cx="50%" cy="7" rx="7" ry="4" fill="#e64c00" />
        </symbol>
      </defs>
      <line x1="28%" y1="24%" x2="72%" y2="24%" stroke="#702a01" strokeWidth="3" />
      <line x1="7%" y1="54%" x2="93%" y2="54%" stroke="#702a01" strokeWidth="3" />
      <line x1="28%" y1="86%" x2="72%" y2="86%" stroke="#702a01" strokeWidth="3" />

      <line x1="28%" y1="24%" x2="28%" y2="88%" stroke="#702a01" strokeWidth="3" />
      <line x1="49%" y1="24%" x2="49%" y2="88%" stroke="#702a01" strokeWidth="3" />
      <line x1="72%" y1="24%" x2="72%" y2="88%" stroke="#702a01" strokeWidth="3" />

      <use href="#location" x="25%" y="18%" />
      <use href="#location" x="46%" y="18%" />
      <use href="#location" x="69%" y="18%" />

      <use href="#location" x="5%" y="48%" />
      <use href="#location" x="25%" y="48%" />
      <use href="#location" x="46%" y="48%" />
      <use href="#location" x="69%" y="48%" />
      <use href="#location" x="90%" y="48%" />

      <use href="#location" x="25%" y="80%" />
      <use href="#location" x="46%" y="80%" />
      <use href="#location" x="69%" y="80%" />
    </svg>
  )
}
