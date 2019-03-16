import { Component } from '../../../core/main/index'

type Updater<T> = T | ((oldState: T) => T)

export default function useState<T, A extends any[] = any[]>(
  c: Component,
  init: (...args: A) => T = (function() { return arguments[0] })
): [(...args: A) => T, (updater: Updater<T>) => void] {
 
  let
    getState: (() => T) | null = null,
    setState: (updater: Updater<T>) => void | null = null

  function setter(updater: Updater<T>): void {
    if (setState) {
      setState(updater)
    }
  }

  const getter = (...args: A): T => {
    if (getState === null) {
      [getState, setState] = c.handleState(init(...args))
    }

    return getState()
  }
  
  return [getter, setter]
}
