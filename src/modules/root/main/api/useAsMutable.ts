import { Ctrl } from '../../../core/main/index'
import { createMutable, isMutable } from '../internal/tools/mutables'
import Varia from './types/Varia'

export default function useAsMutable<T>(c: Ctrl, variaValue: Varia<T>): { value: T } {
  return isMutable(variaValue) 
    ? variaValue as any
    : createMutable(variaValue)
}
