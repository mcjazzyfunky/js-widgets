import isValidElement from '../internal/adapt/isValidElement'

export default function isElement(it: any): boolean {
  return isValidElement(it)
}

Object.defineProperty(isElement, 'js-spec:validate', {
  value(it: any) {
    return isElement(it)
      ? null
      : new Error('Must be a valid element')
  }
})
