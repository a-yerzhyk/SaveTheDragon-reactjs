import { useEffect } from 'react'
import { Event as STDEvent, EventsManager } from 'save-the-dragon'

export default function useEventManager (type: STDEvent, callback: Function) {
  useEffect(() => {
    EventsManager.getInstance().subscribe(type, callback)

    return () => {
      EventsManager.getInstance().unsubscribe(type, callback)
    }
  }, [])
}