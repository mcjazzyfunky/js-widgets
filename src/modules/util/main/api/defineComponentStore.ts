import { Ctrl } from '../../../core/main/index'

// --- defineComponentStore -----------------------------------------

function defineComponentStore<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => void }
>(config: StoreConfig<S, A, M>): (c: Ctrl, ...args: A) => [() => S, M] {
  
  return (c: Ctrl, ...args: A) => {
    const
      [getState, setState] = c.handleState<S>(config.initState.apply(null, args)),

      actions = config.initActions(
        createStateProxy(getState),
        newState => setState(oldState => Object.assign({}, oldState, newState)),
        getState
      )
      
    return [getState, actions]
  }
}

// --- locals -------------------------------------------------------

type State = { [key: string]: any }

type StoreConfig<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => void }> =
{
  initState: (...args: A) => S,
  
  initActions(
    state: S,
    setState: (state: Partial<S>) => void,
    getState: () => S
  ): M
}

function createStateProxy<S extends State>(getState: () => S): S {
  const ret: any = {}
  
  for (const k of Object.keys(getState())) {
    Object.defineProperty(ret, k, {
      get: () => getState()[k]
    })
  }

  return ret
}

// --- exports ------------------------------------------------------

export default defineComponentStore
