import { Component } from '../../../core/main/index'

export default function withState<T, A extends any[]>(c: Component, init: (...args: A) => T):
  [(...args: A) => T, (updater: (T | ((oldState: T) => T))) => void] {
  
  const
    [getState, setState] = c.handleState<T>(undefined!),

    unsubscribe = c.onUpdate(() => {
      isInitialized = true
      unsubscribe()
    })
  
  let isInitialized = false

  function updateState(updater: (T | ((oldState: T) => T))) {
    setState(updater)
  }

  function useState(...args: A) {
    let ret = undefined

    if (!isInitialized) {
      isInitialized = true
      ret = init(...args)
      setState(ret)
    } else {
      ret = getState()
    }

    return ret 
  }

  return [useState, updateState] as any
}