import { Ctrl } from '../index'
import { createMutable } from '../internal/tools/mutables'

export default function useMutable<T>(c: Ctrl, getValue: () => T) {
  const ret = createMutable(getValue())

  c.onWillRender(() => {
    ret.value = getValue()
  })

  return ret
}
