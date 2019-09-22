import { Ctrl } from '../../../core/main/index'

// --- prepareStore -------------------------------------------------

function prepareStore<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => any }
>(config: Config<S, A, M>): (c: Ctrl, ...args: A) => M {
  
  return (c: Ctrl, ...args: A) => {
    const
      [getState, setState] = c.handleState<S>(config.initState.apply(null, args)),

      store = config.initStore(
        createStateProxy(getState),
        newState => setState(oldState => Object.assign({}, oldState, newState)),
        getState
      )
      
    return store
  }
}

// --- locals -------------------------------------------------------

type State = { [key: string]: any }

type Config<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => any }> =
{
  initState: (...args: A) => S,
  
  initStore(
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

export default prepareActions
