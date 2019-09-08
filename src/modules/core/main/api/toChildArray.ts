import Children from './types/Children'
import VirtualNode from './types/VirtualNode'
import ChildrenUtils from '../internal/adapt/ChildrenUtils'

export default function toChildArray(children: Children): VirtualNode[] {
  return ChildrenUtils.toArray(children)
}
