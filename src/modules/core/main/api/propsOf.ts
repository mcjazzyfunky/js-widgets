import typeOf from './typeOf'
import Props from './types/Props'

export default function propsOf(elem: any): Props | null | undefined {
  let ret: Props | null | undefined

  if (typeOf(elem) !== undefined) {
    ret = elem.props || null
  }

  return ret
}