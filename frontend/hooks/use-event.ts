"use client"

import * as React from "react"

// Replace useEffectEvent with a stable callback pattern
export function useEvent<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  })

  return React.useCallback((...args: any[]) => {
    return callbackRef.current(...args)
  }, []) as T
}
