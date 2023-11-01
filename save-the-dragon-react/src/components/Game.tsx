'use client'

import { Game as STDGame, ITEM, LocationID, Direction, SECTION } from 'save-the-dragon'
import Inventory from './Inventory'
import MiniMap from './MiniMap'
import HeroStats from './HeroStats'
import GameplaySrceen from './GameplaySrceen'
import { HitTheNumberBattle } from 'save-the-dragon'

export default function Game ({
  game,
  onSaveGame
}: {
  game: STDGame
  onSaveGame: () => void
}) {
  const hero = game.hero
  const heroHealth = hero.getHealth()
  const heroMaxHealth = hero.getMaxHealth()
  const heroStrength = hero.getStrength()
  const heroInventory = hero.getInventory()
  const heroLocation = hero.currentLocation
  const heroDirection = hero.getDirection()

  const getSection = (section: SECTION) => {
    return game.getSection(section)
  }

  const handleItemUse = (item: ITEM) => {
    hero.useItem(item)
  }

  const moveHero = (direction: Direction) => {
    game.moveHero(direction)
  }

  const teleportHero = (locationId: LocationID) => {
    hero.teleport(locationId)
  }

  const startBattle = (enemyId: number) => {
    const enemy = game.enemies.find(e => e.id === enemyId)
    if (enemy) {
      return new HitTheNumberBattle(game, hero, enemy)
    }
    return null
  }

  const saveGame = () => {
    onSaveGame()
  }

  return (
    <>
      {game &&
        <div className="h-full w-full flex flex-col">
          <div className="flex-1 basis-[68%]">
            {heroLocation &&
              <GameplaySrceen
                location={heroLocation}
                direction={heroDirection}
                onMove={moveHero}
                onTeleport={teleportHero}
                onBattleStart={startBattle}
              />
            }
          </div>
          <div className="flex flex-1 basis-[7%] border-t-2 border-t-orange-950">
            <HeroStats maxHealth={heroMaxHealth} health={heroHealth} strength={heroStrength} />
          </div>
          <div className="flex flex-1 basis-[25%] border-t-4 border-t-orange-950">
            <div className="flex-1 basis-[70%] border-r-4 border-r-orange-950">
              <Inventory inventory={heroInventory} onUse={handleItemUse} />
            </div>
            <div className="flex-1 basis-[30%]">
              {heroLocation &&
                <MiniMap
                  location={heroLocation}
                  getSection={getSection}
                />
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}