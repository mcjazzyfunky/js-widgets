import h from './h'
import component from './component'
import Context from './types/Context'
import VirtualNode from './types/VirtualNode'
import ContextConfig from './types/ContextConfig'
import ContextProviderProps from './types/ContextPrividerProps'
import ContextConsumerProps from './types/ContextConsumerProps'
import createInternalContext from '../internal/adapt/createContext'

export default function context<T>(displayName: string):
  (config: ContextConfig<T>) => Context<T>
{
  return (config: ContextConfig<T>) => createContext(
    displayName,
    config.defaultValue,
    config.validate)
}

// --- private ------------------------------------------------------

function createContext<T>(
  displayName: string,
  defaultValue: T,
  validate?: (it: T) => boolean | null | Error
): Context<T> {
  const
    Provider = component<ContextProviderProps<T>>('Context.Provider')({
      render(props): VirtualNode {
        const { children, ...props2 } = props

        return h(Provider as any, props2, ...children)
      },

      // validate // TODO
    }),

    Consumer = component<ContextProviderProps<T>>('Context.Consumer')({
      render(props): VirtualNode {
        const { children, ...props2 } = props

        return h(Consumer as any, props2, ...children)
      },

      // validate // TODO
    })

  const internalContext = createInternalContext(defaultValue)

  Object.defineProperty(Provider, '__internal_context', {
    value: internalContext
  })

  Object.defineProperty(Provider, '__internal_type', {
    value: internalContext.Provider
  })
  
  Object.defineProperty(Consumer, '__internal_type', {
    value: internalContext.Consumer
  })

  return Object.freeze({ Provider, Consumer }) as any // TODO
}
