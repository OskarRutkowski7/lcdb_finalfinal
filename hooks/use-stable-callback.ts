"use client"

import * as React from "react"

/**
 * A stable callback hook that replaces useEffectEvent
 * This provides the same functionality but uses standard React hooks
 * @param callback The callback function to stabilize
 * @returns A stable callback that can be used in effects
 */
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return React.useCallback((...args: any[]) => {
    return callbackRef.current(...args)
  }, []) as T
}

// Export an alias for useEffectEvent to make migration easier
export const useEffectEvent = useStableCallback
