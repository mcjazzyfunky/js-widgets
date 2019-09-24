import { Ctrl } from '../../../core/main/index'

// --- prepareActions -----------------------------------------------

function prepareActions<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => void }
>(config: ActionsConfig<S, A, M>): (c: Ctrl, ...args: A) => [M, () => S] {
  
  const useActions = (c: Ctrl, ...args: A) => {
    const
      [getState, setState] = c.handleState<S>(config.initState.apply(null, args)),

      actions: M = config.initActions(
        createStateProxy(getState),
        newState => setState(oldState => Object.assign({}, oldState, newState)),
        getState
      )

    return [actions, getState] as [M, () => S]
  }

  Object.defineProperty(useActions, 'name', {
    value: 'use'
      + config.displayName[0].toUpperCase()
      + config.displayName.substr(1)
  })

  return useActions
}

// --- locals -------------------------------------------------------

type State = { [key: string]: any }

type ActionsConfig<
  S extends State,
  A extends any[],
  M extends { [k: string]: (...args: any[]) => void }> =
{
  displayName: string,
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

export default prepareActions
