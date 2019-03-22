import { Component } from '../../../core/main/index'

export default function withState<T, A extends any[]>(c: Component, init: (...args: A) => T):
  [(...args: A) => T, (updater: (T | ((oldState: T) => T))) => void] {
  
  const
    [getState, setState] = c.handleState<T>(undefined),

    unsubscribe = c.onUpdate(() => {
      isInitialized = true
      console.log('did render....')
      unsubscribe()
    })
  
  let isInitialized = false

  function updateState(updater: (T | ((oldState: T) => T))) {
    console.log(222, updater)
    const updater2 = (it: any) => { console.log(3, it); return it + 1}
    setState(((it: any) => it + 1) as any)
  }

  function useState(...args: A) {
    let ret = undefined

    if (!isInitialized) {
      isInitialized = true
      ret = init(...args)
      setState(ret)
      console.log(3, isInitialized)
    } else {
      ret = getState()
      console.log(4, ret)
    }

    return ret 
  }

  return [useState, updateState] as any
}