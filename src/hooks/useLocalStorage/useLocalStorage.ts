import { useState, useEffect } from 'react'

export interface LocalStorageHookResult<T> {
  storedValue: T
  setValue: (value: T | ((prev: T) => T)) => void
  isMounted: boolean
}

export const useLocalStorage = <T>(
  /*
    *
    key variable under which the value is saved in localStorage
  */
  key: string,
  /*
    *
    initialValue is the initial of useState
  */
  initialValue: T
): LocalStorageHookResult<T> => {
  /*
    *
    flag variable if it run on server
  */
  const isServer = typeof window === 'undefined'
  /*
    *
    State for store value
    *
    Pass initial state function to useState so logic is only executed once
  */
  const [storedValue, setStoredValue] = useState<T>(() => initialValue)
  /*
    *
    Flag to track if component mount with data or not
  */
  const [isMounted, setIsMounted] = useState(false)
  /*
    *
    Fn initialize from local storage
  */
  function initialize () {
    /*
      *
      If server return initial value
    */
    if (isServer) {
      return initialValue
    } else {
      /*
        *
        If client
      */
      try {
        /*
          *
          Get from local storage by key
        */
        const item = window.localStorage.getItem(key)
        /*
          *
          Parse stored json or if none return initial value
        */
        return item ? JSON.parse(item) : initialValue
      } catch (error) {
        /*
          *
          If error warn and return initial value
        */
        console.warn(error)
        return initialValue
      }
    }
  }
  /*
    *
    Prevents hydration error
    *
    State is initialized only on client side
  */
  useEffect(() => {
    if (!isServer) {
      setStoredValue(initialize());
    }
    /*
      *
      Component has mounted at start
    */
    setIsMounted(true)
    /*
      *
      Mount only
    */
  }, [])
  /*
    *
    Return a wrapped version of useState's setter fn
    *
    It persists the new value to local storage
  */
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      /*
        *
        Allow value to be a fn, so we have the same API as useState
      */
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      /*
        *
        Save to local storage
      */
      if (!isServer) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
      /*
        *
        Save state
      */
      setStoredValue(valueToStore)
    } catch (error) {
      /*
        *
        Catch error.
        *
        TODO: more advanced implementation for catching errors
      */
      console.warn(error)
    }
  }

  return {
    storedValue,
    setValue,
    isMounted
  }
}
