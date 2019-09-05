import { Ctrl } from '../../../core/main/index'

type Updater<T extends object> = Partial<T> | ((oldState: T) => Partial<T>)

export default function useStateObject<T extends object>(c: Ctrl, initialValue: T):
  [() => T, (updater: Updater<T>) => void] {

  const [get, set] = c.handleState(initialValue)

  function update(updater: Updater<T>) {
    if (typeof updater === 'function') {
      set(oldState2 => {
        const result = (updater as any)(oldState2)

        return {...oldState2, ...result }
      })
    } else if (updater !== null && typeof updater === 'object') {
      set(oldState3 => ({ ...oldState3, ...updater }))
    }
  }

  return [get, update]
}
