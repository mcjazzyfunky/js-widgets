import { Ctrl } from '../../../core/main/index'

// --- defineComponentActions ---------------------------------------

function defineComponentActions<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => void }
>(config: Config<S, A, M>): (c: Ctrl, ...args: A) => [M, () => S] {
  
  return (c: Ctrl, ...args: A) => {
    const
      [getState, setState] = c.handleState<S>(config.initState.apply(null, args)),

      actions = config.initActions(
        createStateProxy(getState),
        newState => setState(oldState => Object.assign({}, oldState, newState)),
        getState
      )
      
    return [actions, getState]
  }
}

// --- locals -------------------------------------------------------

type State = { [key: string]: any }

type Config<
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

export default defineComponentActions
