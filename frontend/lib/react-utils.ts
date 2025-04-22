"use client"

import * as React from "react"

// Re-export all React hooks and functions
export const {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  useLayoutEffect,
  useImperativeHandle,
  useDebugValue,
  useDeferredValue,
  useId,
  useInsertionEffect,
  useSyncExternalStore,
  useTransition,
} = React

// Export our stable implementation as useEffectEvent
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return React.useCallback((...args: any[]) => {
    return callbackRef.current(...args)
  }, []) as T
}

export const useEffectEvent = useStableCallback
