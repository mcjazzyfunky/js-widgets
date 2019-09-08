import Props from './Props'
import VirtualNode from './VirtualNode'
import PickOptionalProps from '../../internal/types/PickOptionalProps'

type StatelessComponentConfig<P extends Props = {}, D extends Partial<PickOptionalProps<P>> = {}> = {
  memoize?: boolean,
  validate?: ((props: P) => boolean | null | Error) | null,
  defaultProps?: D,
  render: (props: P & D) => VirtualNode,
  init?: never
}

export default StatelessComponentConfig
