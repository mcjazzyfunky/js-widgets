import hasOwnProp from '../internal/hasOwnProp'
import Ref from './types/Ref'

export default function toRef<T>(arg?: T | Ref<T>): Ref<T> {
  let ret: Ref<T>

  if (arg && typeof arg === 'object' && hasOwnProp(arg, 'current')) {
    ret = arg as Ref<T>
  } else {
    ret = {
      current: arg as T
    }
  }

  return ret
}
