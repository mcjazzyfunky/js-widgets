import { Ctrl } from '../../../root/main/index'
import px from '../internal/tools/px'

export default function useValue<T>(c: Ctrl, initialValue: T) {
  return px.toValue(initialValue)
}
