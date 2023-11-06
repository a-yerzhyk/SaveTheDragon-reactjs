'use client'

import useEventManager from '@/hooks/useEventManager';
import { EVENTS } from 'save-the-dragon';

export default function GameLogger() {
  const onLog = (text: string) => {
    console.log(text)
  }
  useEventManager(EVENTS.log, onLog)

  return null
}