import { Ctrl } from '../../../core/main/index'
import PickOptionalProps from '../internal/types/PickOptionalProps'

export default function useProps<P>(c: Ctrl<P>, defaultProps?: PickOptionalProps<P>): () => P {
  return !defaultProps
    ? () => c.getProps()
    : () => Object.assign({}, defaultProps, c.getProps())
}
