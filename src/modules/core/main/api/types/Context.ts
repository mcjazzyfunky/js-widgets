import Component from './Component'
import Children from './Children'
import VirtualNode from './VirtualNode'
import Key from './Key'

type ProviderProps<T> = {
  value: T,
  key?: Key,
  children?: Children
}

type ConsumerProps<T> = {
  key?: Key,
  children?: (value: T) => VirtualNode
}

export default interface Context<T> {
  Provider: Component<ProviderProps<T>>,
  Consumer: Component<ConsumerProps<T>
}
