import { Ctrl, Props } from '../../../core/main/index'
import useBoundValue from './useBoundValue'

type Updater<T> = T | ((oldValue: T) => T)

function useState<T>(c: Ctrl, initialValue: T):
  [{ value: T }, (updater: Updater<T>) => void, () => T] {

  const [get, set] = c.handleState(initialValue)
  
  return [useBoundValue(c, get), set, get]
}

export default useState
