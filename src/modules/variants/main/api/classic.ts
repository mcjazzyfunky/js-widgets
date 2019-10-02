import { component, Component, Props, VirtualNode, Ctrl, Context } from '../../../core/main/index'
import usePropsProxy from '../../../hooks/main/api/usePropsProxy'
import useStateProxy from '../../../hooks/main/api/useStateProxy'

function classic<P extends Props, S extends State, D extends P>(
  config: StatelessConfig<P, S, D>
): Component<P>

function classic<P extends Props, S extends State, D extends P>(
  displayName: string,
  config: Omit<StatelessConfig<P, S, D>, 'displayName'>
): Component<P>

function classic<P extends Props, S extends State, D extends P, C extends ContextFields>(
  config: StatefulConfig<P, S, D, C>
): Component<P>

function classic<P extends Props, S extends State, D extends P, C extends ContextFields>(
  displayName: string,
  config: Omit<StatefulConfig<P, S, D, C>, 'displayName'>
): Component<P>

function classic<P extends Props>(
  displayName: string,
  render: (props: P) => VirtualNode
): Component<P>

function classic<P extends Props>(arg1: any, arg2?: any): Component<P> {
  if (process.env.NODE_ENV === 'development' as any) {
    let errorMsg = ''

    if (typeof arg1 === 'string') {
      if (typeof arg2 === 'function') {
        // nothing wrong with a function as second argument
      } else if (!arg2 || typeof arg2 !== 'object') {
        errorMsg = 'Second parameter must be an object or an function'
      } else if ('displayName' in arg2) {
        errorMsg = "Second argument must not contain key 'displayName'"
      }
    } else if (!arg1 || typeof arg1 !== 'object') {
      errorMsg = 'First argument must either be a string or an object'
    } else if (arg2 !== undefined) {
      errorMsg = 'Illegal second argument (expected undefined)'
    }

    if (errorMsg) {
      throw new TypeError(`Illegal arguments: ${errorMsg}`)
    }
  }

  let config: any

  if (typeof arg1 === 'string' && typeof arg2 === 'function') {
    config = {
      displayName: arg1,
      render: arg2
    }
  } else {
    const
      options =
        typeof arg1 !== 'string' ? arg1 : { ...arg2, displayName: arg1 },

      defaultProps = options.defaultProps || {},
      initState = options.initState || (() => ({})),

      init = (rawC: Ctrl<any>) => {
        let c = rawC

        if (options.defaultProps) {
          c = { ...rawC }

          c.consumeProps = () => {
            const
               getRawProps = rawC.consumeProps(),
               getProps = () => Object.assign({}, defaultProps, getRawProps())

            return getProps
          }
        }

        const
          [props, getProps] = usePropsProxy(c),
          context = {} // TODO!!!
        
          if (options.context) {
          const keys = Object.keys(options.context)

          for (let i = 0; i < keys.length; ++i) {
            const key = keys[i]

            if (typeof options.context[key] === 'function') {
              Object.defineProperty(context, key, {
                get: options.context[key](c)
              })
            } else {
              Object.defineProperty(context, key, {
                get: c.consumeContext(options.context[key]) 
              })
            }
          }
        }
        
        // TODO !!!!!
        const
          [getState, setState] = c.handleState(initState(getProps(), context)),
          currState = getState(),
          keys = Object.keys(currState),
          state: any = {}

        for (let i = 0; i < keys.length; ++i) {
          Object.defineProperty(state, keys[i], {
            get: () => getState()[keys[i]] // TODO
          })
        }

        const 
          update = setState, // TODO!!
          render = options.main(c, props, state, context, update, getProps, getState)

        return () => render(props, state, context)
      }

    config = { ...options, init }
    delete config.defaultProps
    delete config.context
    delete config.initState
    delete config.main
  }

  return component(config)
}

// --- locals -------------------------------------------------------

type State = Record<string, any>

type ContextFields =
  Record<string, Context<any> | ((c: Ctrl) => () => any)>

type ContextValues<C extends ContextFields> = {
  [K in keyof C]: C[K] extends Context<infer T>
    ? T
    : C[K] extends ((c: Ctrl) => () => infer T)
    ? T
    : never
} 

type StatelessConfig<P extends Props, S extends State, D extends P>  = {
  displayName: string,
  memoize?: boolean,
  validate?(props: P): boolean | null | Error,
  defaultProps?: D,
  initState?(props: P & D): S,
  render(props: P & D): VirtualNode
}

type StatefulConfig<P extends Props, S extends State, D extends P, C extends ContextFields>  = {
  displayName: string,
  memoize?: boolean,
  validate?(props: P): boolean | null | Error,
  defaultProps?: D
  context?: C,
  initState?(props: P & D, context: ContextValues<C>): S,
  
  main(
    c: Ctrl<P & D>,
    props: P & D,
    state: S,
    context: ContextValues<C>,
    update: (updater: Partial<S> | ((s: S) => Partial<S>)) => void,
    getProps: () => P & D,
    getState: () => S,
  ): (props: P, state: S, ctx: ContextValues<C>) => VirtualNode
}

// --- exports ------------------------------------------------------

export default classic