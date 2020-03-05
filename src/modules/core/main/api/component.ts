import { h, memo, useContext, useEffect, useRef, useState } from 'dyo'
import * as Spec from 'js-spec/validators'
import Component from './types/Component'
import StatelessComponent from './types/StatelessComponent'
import StatefulComponent from './types/StatefulComponent'
import Props from './types/Props'
import VNode from './types/VNode'
import Ctrl from './types/Ctrl'
import PartialOptionalProps from '../internal/types/PartialOptionalProps'

function component<
  P extends Props = {},
  D extends PartialOptionalProps<P> = {}
>(config: StatelessComponentConfig2<P, D>): StatelessComponent<P> 

function component<
  P extends Props = {}
>(config: StatelessComponentConfig1<P>): StatelessComponent<P> 

function component<
  P extends Props = {},
  D extends PartialOptionalProps<P> = {}
>(config: StatefulComponentConfig2<P, D>): StatefulComponent<P>

function component<
  P extends Props = {}
>(config: StatefulComponentConfig1<P>): StatefulComponent<P>

function component<
  P extends Props,
  D extends PartialOptionalProps<P>
>(config: any): Component<P> {
  let
    funcComp: any, // TODO
    ret: Component<P>

  if (config.render) {
    if (!config.defaults) {
      funcComp = config.render.bind(null)
    } else {
      funcComp = (rawProps: P & D) => {
        const props = Object.assign({}, config.defaults, rawProps) // TODO: optimize

        return config.render(props)
      }
    }
  } else if (config.init) {
    funcComp = (props: P & D) => {
      const data = useRef({}) as any // TODO
      
      if (props !== data.oldProps) {
        data.oldProps = props

        data.currProps = config.defaults 
          ? Object.assign({}, config.defaults, props) // TODO: optimize
          : props
      }

      if (!data.render) {
        const result = createCtrl(config.name, () => data.currProps) // TODO!!!

        data.ctrl = result[0]
        data.run = result[1]
        data.render = config.init(data.ctrl)
      }
      
      data.run()
      return data.render(data.currProps)
    }
  }
  
  funcComp.displayName = config.name

  if (config.memoize === true) {
    funcComp = memo(funcComp)
  }

  ret = ((...args: any[]) => h(funcComp, ...args)) as any // TODO: optimize

  if (config.render) {
    (ret as any).meta = Object.freeze({
      type: 'component',
      name: config.name,
      stateful: false,
      memo: config.memo || false,
      render: config.render
    })
  } else {
    (ret as any).meta = Object.freeze({
      type: 'component',
      name: config.name,
      stateful: false,
      memo: config.memo || false,
      render: config.render
    })
  }

  funcComp.__component = ret
  ;(ret as any).__type = funcComp

  return ret
}

// --- types ---------------------------------------------------------

type StatelessComponentConfig1<
  P extends Props = {}
> = {
  name: string,
  memoize?: boolean,
  validate?(props: P): boolean | Error | null,
  render(props: P): VNode
}

type StatelessComponentConfig2<
  P extends Props = {},
  D extends PartialOptionalProps<P> = {}
> = {
  name: string,
  memoize?: boolean,
  defaults: D,
  validate?(props: P): boolean | Error | null,
  render(props: P & D): VNode
}

type StatefulComponentConfig1<
  P extends Props = {}
> = {
  name: string,
  memoize?: boolean,
  validate?(props: P): boolean | Error | null,
  init(c: Ctrl<P>): (props: P) => VNode
}
type StatefulComponentConfig2<
  P extends Props = {},
  D extends PartialOptionalProps<P> = {}
> = {
  name: string,
  memoize?: boolean,
  defaults: D,
  validate?(props: P): boolean | Error | null,
  init(c: Ctrl<P & D>): (props: P & D) => VNode
}

type Action = () => void

// --- locals --------------------------------------------------------

function createCtrl<P extends Props>(
  name: string,
  getProps: () => P
): [Ctrl<P>, () => void] {
  let
    initialized = false,
    mounted = false,
    forceUpdate: Action | null = null,
    onceBeforeUpdateActions: Action[] = []

  const
    afterMountActions: Action[] = [],
    beforeUpdateActions: Action[] = [],
    afterUpdateActions: Action[] = [],
    beforeUnmountActions: Action[] = [],
    contextActions: Action[] = [],

    ctrl: Ctrl<P> = {
      getName: () => name,
      getProps,
      isMounted: () => mounted,
      isInitialized: () => initialized,

      update(onceBeforeUpdateAction) {
        onceBeforeUpdateActions.push(() => {
          mounted = true
        })

        if (onceBeforeUpdateAction) {
          onceBeforeUpdateActions.push(onceBeforeUpdateAction)
        }

        forceUpdate && forceUpdate!()
      },

      consumeContext(ctx) {
        const DyoContextProvider = (ctx as any)?.constructor?.__type

        if (!DyoContextProvider) {
          throw new TypeError('[Ctrl#consumeContxt] First argument must be a context')
        }

        let value = useContext(DyoContextProvider)

        contextActions.push(() => {
          value = useContext(DyoContextProvider)
        })

        return () => value
      },

      afterMount(action) {
        afterMountActions.push(action)
      },

      beforeUpdate(action) {
        beforeUpdateActions.push(action)
      },

      afterUpdate(action) {
        afterUpdateActions.push(action)
      },

      beforeUnmount(action) {
        beforeUnmountActions.push(action)
      }
    },

    run = () => {
      if (!initialized) {
        initialized = true
      }

      if (mounted) {
        contextActions.forEach(it => it())
      }

      const [, setState] = useState(false)

      if (!forceUpdate) {
        forceUpdate = () => setState(it => !it)
      }

      useEffect(() => {
        afterMountActions.forEach(it => it())

        return () => beforeUnmountActions.forEach(it => it())
      }, [])

      useEffect(() => {
        mounted = true

        afterUpdateActions.forEach(it => it())
      })

      if (onceBeforeUpdateActions.length) {
        const actions = onceBeforeUpdateActions
        onceBeforeUpdateActions = []
        actions.forEach(it => it())
      }

      beforeUpdateActions.forEach(it => it())
    }

  return [ctrl, run]
}

// --- exports -----------------------------------------------------------

export default component
