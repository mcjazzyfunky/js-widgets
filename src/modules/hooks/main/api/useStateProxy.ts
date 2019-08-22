import { Component } from '../../../core/main/index'
import useStateObject from './useStateObject'

type Updater<T extends object> = Partial<T> | ((oldState: T) => Partial<T>)

export default function useStateProxy<T extends object>(
  c: Component,
  initialState: T
): [T & (() => T), (updater: Updater<T>) => void] {
  const [getState, updateState] = useStateObject(c, initialState)

  return [new Proxy(getState, {
    get: (target, name) => (getState as any)()[name]
  }), updateState] as any
}