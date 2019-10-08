import { Ctrl } from '../../../core/main/index'
import { createMutable, isMutable } from '../internal/tools/mutables'
import ValueOrMutable from './types/ValueOrMutable'

export default function useAsMutable<T>(
  c: Ctrl,
  variaValue: ValueOrMutable<T>
): { value: T } {
  return isMutable(variaValue) 
    ? variaValue as any
    : createMutable(variaValue)
}
