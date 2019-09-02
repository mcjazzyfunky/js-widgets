import { Ctrl } from '../../../core/main/index'

type Updater<T> = T | ((oldState: T) => T)

export default function useState<T>( c: Ctrl, initialValue: T):
  [() => T, (updater: Updater<T>) => void] {

  return c.handleState(initialValue)
}
