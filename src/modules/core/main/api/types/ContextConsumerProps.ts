import VirtualNode from './VirtualNode'

type ContextConsumerProps<T> = {
  children?: (value: T) => VirtualNode
}

export default ContextConsumerProps
