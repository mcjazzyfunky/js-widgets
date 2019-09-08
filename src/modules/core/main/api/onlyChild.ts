import ChildrenUtils from '../internal/adapt/ChildrenUtils'
import Children from './types/Children'
import VirtualNode from './types/VirtualNode'

export default function onlyChild(children: Children): VirtualNode {
  let ret: any

  const childCount = ChildrenUtils.count(children)

  if (childCount !== 1) {
    throw new Error(`Expected exactly one child - got ${childCount}`)
  }

  ChildrenUtils.forEach(children, (item: any) => {
    ret = item
  })

  return ret
}
