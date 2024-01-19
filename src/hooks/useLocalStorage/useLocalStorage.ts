import { useState, useEffect } from 'react'

export const useLocalStorage = (key: string, initialValue: unknown) => {
  const isLocalStorageAvailable = typeof window !== 'undefined'

  const [isFirstRender, setIsFirstRender] = useState(true)
  const [state, setState] = useState(() => getInitialValue(true))

  function getInitialValue (isFirstRender: boolean) {
    if (isLocalStorageAvailable) {
      const storedValue = isFirstRender ? initialValue : localStorage.getItem(key)
      return JSON.parse(storedValue as string)
    } else {
      return initialValue
    }
  }

  useEffect(() => {
    if (isFirstRender) setIsFirstRender(false)
    // mount-only
  }, [])

  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(state))
    }
  }, [key, state, isLocalStorageAvailable])

  return [state, setState]
}
