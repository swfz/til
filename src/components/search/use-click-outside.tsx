import { useEffect, RefObject } from "react"

type EventMap = keyof DocumentEventMap
const events: EventMap[] = [`mousedown`, `touchstart`]

const ClickOutside = (ref: RefObject<HTMLElement>, onClickOutsideFn: () => void) => {
  const isOutside = (element: HTMLElement) => !ref.current || !ref.current.contains(element)

  const onClick: EventListener = (event): void => {
    const target = event.target as HTMLElement

    if (isOutside(target)) {
      onClickOutsideFn()
    }
  }

  useEffect(() => {
    for (const event of events) {
      document.addEventListener(event, onClick)
    }
    return () => {
      for (const event of events) document.removeEventListener(event, onClick)
    }
  })
}

export default ClickOutside
