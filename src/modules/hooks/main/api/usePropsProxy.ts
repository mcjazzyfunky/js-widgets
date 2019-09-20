import { Ctrl, Props } from '../../../core/main/index'
import toProxy from '../../../util/main/api/toProxy'
import PickOptionalProps from '../internal/types/PickOptionalProps'

export default function useProps<P extends Props>(
  c: Ctrl<P>,
  defaultProps?: PickOptionalProps<P>
): P {
  const getter = !defaultProps
    ? () => c.getProps()
    : () => Object.assign({}, defaultProps, c.getProps())

  return toProxy(getter)
}
