import Children from './types/Children'
import VirtualElement from './types/VirtualElement'
import ChildrenUtils from '../internal/adapt/ChildrenUtils'

export default function mapChildren<T>(
  children: Children,
  mapper: (child: VirtualElement) => T
): T[] {
  return ChildrenUtils.map(children, mapper)
}
