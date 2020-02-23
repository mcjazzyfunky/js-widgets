import { isValidElement as isDyoElement, Fragment as DyoFragment } from 'dyo'
import Fragment from './Fragment'
import Component from './types/Component'

export default function typeOf(elem: any): string | Component<any> | undefined {
  let ret: string | Component<any> | undefined

  if (isDyoElement(elem)) {
    const type = elem.type as any

    if (type === DyoFragment) {
      ret = Fragment
    } else if (typeof type === 'string') {
      ret = type
    } else if (type && type.__component) {
      ret = type.__component
    }
  }

  return ret
}
