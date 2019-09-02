import { h } from '../../../core/main/index'

export default function isElement(it: any): boolean {
  return it && typeof it === 'object' && it.constructor && it.constructor.name === 'VirtualElement'
}

Object.defineProperty(isElement, 'js-spec:validate', {
  value(it: any) {
    return isElement(it)
      ? null
      : new Error('Must be a valid element')
  }
})
