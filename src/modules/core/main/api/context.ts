import h from './h'
import Context from './types/Context'
import Key from './types/Key'
import ContextConfig from './types/ContextConfig'

export default function context<T>(displayName: string):
  (config: ContextConfig<T>) => Context<T>
{

  return (config: ContextConfig<T>) =>
    createContext(config.defaultValue)
}

// --- private ------------------------------------------------------

function createContext<T>(defaultValue: T): Context<T> {
  const Provider = (props: { value: T, key?: Key }, ...children: any[]): any => 
     h(Provider as any, props, ...children)

  Provider.meta = Object.freeze({
    displayName: 'Context.Provider',
    variant: 'ContextProvider',
    render: Provider
  })

  const Consumer = (props: { key?: Key }, f: Function): any => // TODO
     h(Consumer as any, props, f)

  Consumer.meta = Object.freeze({
    displayName: 'Context.Consumer',
    variant: 'ContextConsumer',
    render: Consumer
  })

  return Object.freeze({ Provider, Consumer }) as any // TODO
}