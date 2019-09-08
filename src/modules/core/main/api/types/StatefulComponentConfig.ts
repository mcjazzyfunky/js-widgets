import Props from './Props'
import VirtualNode from './VirtualNode'
import Ctrl from './Ctrl'
import PickOptionalProps from '../../internal/types/PickOptionalProps'

type StatefulComponentConfig<P extends Props = {}, D extends Partial<PickOptionalProps<P>> = {}> = {
  memoize?: boolean,
  validate?: ((props: P) => boolean | null | Error) | null,
  defaultProps?: D,
  init: (c: Ctrl<P & D>) => (props: P) => VirtualNode,
  render?: never
}

export default StatefulComponentConfig 
