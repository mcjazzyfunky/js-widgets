import Props from './Props'
import VirtualNode from './VirtualNode'
import PickOptionalProps from '../../internal/types/PickOptionalProps'

type StatelessComponentConfigAlt<P extends Props = {}> = {
  displayName: string,
  defaultProps?: PickOptionalProps<P>,
  validate?(props: P): boolean | null | Error,
  render(props: Required<P>): VirtualNode,
}

export default StatelessComponentConfigAlt
