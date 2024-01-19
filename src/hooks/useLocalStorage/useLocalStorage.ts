import { useState, useEffect } from 'react'

export const useLocalStorage = (
  /*
    *
    key variable under which the value is saved in localStorage
  */
  key: string,
  /*
    *
    initialValue is the initial of useState
  */
  initialValue: unknown
) => {
  /*
    *
    flag variable if it run in server or client mode
  */
  const isLocalStorageAvailable = typeof window !== 'undefined'
  /*
    *
    store with initial value returned from getInitialValue fn
  */
  const [state, setState] = useState(getInitialValue)
  /*
    *
    Fn
    *
    when run on the client side, it returns the retrieved localStorage value based on key variable
    *
    when run in the server side, it returns initialValue variable
  */
  function getInitialValue () {
    if (isLocalStorageAvailable) {
      const storedValue = localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : initialValue
    } else {
      return initialValue
    }
  }
  /*
    *
    side effect to save state in localStorage
  */
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state, isLocalStorageAvailable])
  /*
    *
    return state value and modifying fn
  */
  return [state, setState]
}
