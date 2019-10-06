import { Ctrl } from '../../../core/main/index'
import px from '../internal/tools/px'
import Varia from '../api/types/Varia'

export default function useAsValue<T>(c: Ctrl, variaValue: Varia<T>): { value: T } {
  return px.isValue(variaValue) ? variaValue  as any:  px.value(variaValue)
}
