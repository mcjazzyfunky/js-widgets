import { Spec } from 'js-spec'

import h from './h'
import component from './component'
import Context from './types/Context'
import VirtualNode from './types/VirtualNode'
import ContextConfig from './types/ContextConfig'
import ContextProviderProps from './types/ContextPrividerProps'
import ContextConsumerProps from './types/ContextConsumerProps'
import createInternalContext from '../internal/adapt/createContext'

export default function context<T>(
  config: ContextConfig<T>
): Context<T> {
  return createContext(
    config.displayName,
    config.defaultValue,
    config.validate)
}

// --- private ------------------------------------------------------

function createContext<T>(
  displayName: string,
  defaultValue?: T,
  validate?: (it: T) => boolean | null | Error
): Context<T> {
  const
    providerConfig: any = {
      displayName: `ContextProvider (${displayName})`,

      render(props: any): VirtualNode {
        const { children, ...props2 } = props

        return h(Provider as any, props2, ...children)
      }
    },

    consumerConfig: any = {
      displayName: `ContextConsumer (${displayName})`,

      render(props: any): VirtualNode {
        const { children, ...props2 } = props

        return h(Consumer as any, props2, ...children)
      }
    }
    
    if (validate && process.env.NODE_ENV === 'development' as any) {
      providerConfig.validate = Spec.exact({
        value: validate
      })

      consumerConfig.validate = Spec.exact({
      })
    }

  const
    Provider = component<ContextProviderProps<T>>(providerConfig),
    Consumer = component<ContextProviderProps<T>>(consumerConfig)

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
