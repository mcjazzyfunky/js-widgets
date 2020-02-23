import VElement from './VElement'

type VNode =
  undefined | null | boolean | number | string /*| Iterable<VirtualNode> // TODO*/ | VElement<any>

export default VNode
