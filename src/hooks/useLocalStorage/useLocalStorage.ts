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
    Fn to initialize default state value
  */
  function getInitialValue () {
    /*
      *
      if it's client side do statement
    */
    if (isLocalStorageAvailable) {
      /*
        *
        check if localStorage property exists in window object
      */
      if (!localStorage) throw new Error('localStorage is not supported!')
      /*
        *
        get localStorage value based on key
      */
      const storedValue = localStorage.getItem(key)
      /*
        *
        if localStorage value exists return it, else return initialValue
      */
      return storedValue ? JSON.parse(storedValue) : initialValue
    } else {
      /*
        *
        if it's server side return initialValue
      */
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
