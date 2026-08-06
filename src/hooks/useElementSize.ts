import { useCallback, useRef, useState } from 'react'

export function useElementSize<T extends HTMLElement>() {
  const observerRef = useRef<ResizeObserver | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  // A callback ref (instead of useRef + useEffect) so the observer attaches
  // whenever the DOM node actually appears/disappears — including when the
  // element only exists conditionally (e.g. behind an async loading state),
  // where a mount-only effect would run once against a still-null ref and
  // never retry.
  const ref = useCallback((el: T | null) => {
    observerRef.current?.disconnect()
    observerRef.current = null
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      setSize({ width: Math.round(width), height: Math.round(height) })
    })
    observer.observe(el)
    observerRef.current = observer
  }, [])

  return { ref, width: size.width, height: size.height }
}
