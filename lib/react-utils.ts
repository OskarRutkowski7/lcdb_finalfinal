"use client"

import * as React from "react"
import { useStableCallback } from "@/hooks/use-stable-callback"

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
  // Add any other hooks you might be using
} = React

// Export our stable implementation as useEffectEvent
export const useEffectEvent = useStableCallback

// This file can be imported instead of 'react' to get all React hooks plus our custom ones
