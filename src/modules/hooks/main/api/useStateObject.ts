import { Ctrl, Props } from '../../../core/main/index'

type Updater<T extends object> = Partial<T> | ((oldState: T) => Partial<T>)

export default function useStateObject<T extends object, P extends Props>(c: Ctrl<P>, init: T | ((props: P) => T)):
  [() => T, (updater: Updater<T>) => void] {

  const [get, set] =
    typeof init === 'function'
      ? c.handleState((init as Function)(c.getProps()))
      : c.handleState(init)

  function update(updater: Updater<T>) {
    if (typeof updater === 'function') {
      set(oldState2 => {
        const result = (updater as any)(oldState2)

        return {...oldState2, ...result }
      })
    } else if (updater !== null && typeof updater === 'object') {
      //set(oldState3 => ({ ...oldState3, ...updater })) // TODO - this would cause subtle problems!!!!
      set(({ ...get(), ...updater }))
    } else {
      throw new Error('Illegal state updater')
    } 
  }

  return [get, update]
}
