import { Ctrl } from '../../../core/main/index'
import px from '../internal/tools/px'

export default function useBoundValue<T>(c: Ctrl, getValue: () => T): { value: T } {
  return px.bindValue(getValue)
}