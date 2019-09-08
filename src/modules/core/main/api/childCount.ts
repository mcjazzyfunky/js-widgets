import Children from './types/Children'
import ChildrenUtils from '../internal/adapt/ChildrenUtils'

export default function childCount(children: Children): number {
  return ChildrenUtils.count(children)
}
