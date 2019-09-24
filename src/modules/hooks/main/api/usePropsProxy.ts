import { Ctrl, Props } from '../../../core/main/index'
import toProxy from '../../../util/main/api/toProxy'
import PickOptionalProps from '../internal/types/PickOptionalProps'

export default function useProps<P extends Props, D extends PickOptionalProps<P>>(
  c: Ctrl<P>,
  defaultProps?: D
): P & Required<D> {
  const getter = !defaultProps
    ? () => c.getProps()
    : () => Object.assign({}, defaultProps, c.getProps()) as any

  return toProxy(getter)
}
