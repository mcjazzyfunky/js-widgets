import Children from './types/Children'
import VirtualNode from './types/VirtualNode'
import ChildrenUtils from '../internal/adapt/ChildrenUtils'

export default function forEachChild(
  children: Children,
  action: (child: VirtualNode, index: number) => void
): void {
  ChildrenUtils.forEach(children, action)
}
