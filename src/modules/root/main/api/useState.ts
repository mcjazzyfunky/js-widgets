import { Ctrl, Props } from '../../../core/main/index'
import px from './px'

type Updater<T> = T | ((oldValue: T) => T)

function useState<T>(c: Ctrl, initialValue: T):
  [{ value: T }, (updater: Updater<T>) => void, () => T] {

  const [get, set] = c.handleState(initialValue)
  
  return [px.bindValue(get), set, get]
}

export default useState
