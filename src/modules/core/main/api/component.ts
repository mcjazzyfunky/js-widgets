import { h, memo, useContext, useEffect, useRef, useState } from 'dyo'
import * as Spec from 'js-spec/validators'
import Component from './types/Component'
import Props from './types/Props'
import Ctrl from './types/Ctrl'
import StatelessComponent from './types/StatelessComponent'
import StatefulComponent from './types/StatefulComponent'
import StatelessComponentConfig from './types/StatelessComponentConfig'
import StatefulComponentConfig from './types/StatefulComponentConfig'

function component<
  P extends Props = {}
>(config: StatelessComponentConfig<P>): StatelessComponent<P> 

function component<
  P extends Props = {}
>(config: StatefulComponentConfig<P>): StatefulComponent<P>

function component<
  P extends Props,
>(config: any): Component<P> {
  let
    funcComp: any, // TODO
    ret: Component<P>

  if (config.render) {
    funcComp = config.render.bind(null)
  } else if (config.init) {
    funcComp = (props: P) => {
      const data = useRef({}) as any // TODO
      
      if (props !== data.oldProps) {
        data.oldProps = props
        data.currProps = props 
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
