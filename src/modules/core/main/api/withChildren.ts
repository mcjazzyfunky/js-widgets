import Children from './types/Children'
import VirtualNode from './types/VirtualNode'
import ChildrenUtils from '../internal/adapt/ChildrenUtils'

export default function withChildren<R>(
  f: (nodes: VirtualNode[]) => R): (children: Children) => R
{
  if (process.env.NODE_ENV === 'development' as any) {
    if (typeof f !== 'function') {
      throw new TypeError('[withChildren] First argument "f" must be a function')
    }
  }

  return (children: Children) => f(ChildrenUtils.toArray(children))
}
