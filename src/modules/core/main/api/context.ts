import {
  h as createDyoElement,
  useContext as useDyoContext,
  Context as DyoContext,
} from 'dyo'

import * as Spec from 'js-spec/validators'

import h from './h'
import component from './component'
import Context from './types/Context'
import VNode from './types/VNode'
import setHiddenProp from '../internal/setHiddenProp'
import Component from './types/Component'

function context<T>(
  config: ContextConfig1<T>
): [Context<T>, Provider<T>] 

function context<T>(
  config: ContextConfig2<T>
): [Context<T>, Provider<T>] 

function context<T>(config: ContextConfig1<T> | ContextConfig2<T>):
  [Context<T>, Provider<T>] {
  
    const
    Provider = component({
      name: `ContextProvider (${name})`,

      render(props: any): VNode { // TODO
        const { children, ...propsWithoutChildren } = props

        return h(Provider, propsWithoutChildren, ...children)
      }
    })

  const DyoProvider = ({ value, key, children }: any): any => { // TODO
    return createDyoElement(DyoContext, { value, key }, children)
  }

  setHiddenProp(Provider, '__type', DyoProvider)

  const
    constr = () => {},
    context = Object.create(constr.prototype) as Context<T>

  (context as any).meta = {
    type: 'context',
    name: config.name,
    default: config.default!
  }

  setHiddenProp(constr, '__type', DyoProvider)
  setHiddenProp(constr, '__validate', config.validate)

  return [context, Provider]
}

// --- types --------------------------------------------------------

type ContextConfig1<T extends (any | undefined)> = {
  name: string,
  default?: T,
  validate?(value: T): boolean | null | Error
}

type ContextConfig2<T> = {
  name: string,
  default: T,
  validate?(value: T): boolean | null | Error
}

type ProviderProps<T> = {
  value: T,
  children?: VNode
}

type Provider<T> = Component<ProviderProps<T>>


// --- locals --------------------------------------------------------

function createDyoContext(defaultValue: any) {
  const
    Provider = ({ value, key, children }: any): any => {
      return createDyoElement(DyoContext, { value, key }, children)
    },

    Consumer = ({ props, children }: any): any => {
      let value: any = useDyoContext(Provider)

      if (value === undefined) {
        value = defaultValue
      }

      return children(value)
    }

  Object.defineProperty(Provider, '__internal_defaultContextValue', {
    value: defaultValue 
  })

  return { Provider, Consumer }
}


// --- exports ------------------------------------------------------

export default context
