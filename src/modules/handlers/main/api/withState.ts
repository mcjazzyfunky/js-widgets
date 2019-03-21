import { Component } from '../../../core/main/index'

export default function withState<T, A extends any[]>(c: Component, init: (...args: A) => T):
  [(...args: A) => T, (updater: (T | ((oldState: T) => T))) => void] {
  
  const
    [getState, setState] = c.handleState<T>(undefined),
    unsubscribe = c.onUpdate(() => {
      isInitialized = true
      useTempState = false
      console.log(111)
      unsubscribe()
    })
  
  let isInitialized = false
  let useTempState = true
  let tempState: T = undefined

  function updateState(updater: any) {
    if (useTempState) {
      tempState = updater === 'function' ? updater(tempState) : updater
    } else {
      useTempState = false
      setState(updater)
    }
  }

  function useState(...args: A) {
    if (!isInitialized) {
      //setState(init(...args))
      tempState = init(...args)
    }

    return useTempState ? tempState : getState()
  }


  return [useState, updateState] as any
}