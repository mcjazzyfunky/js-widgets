import Props from './Props'
import VirtualNode from './VirtualNode'
import Ctrl from './Ctrl'
import PickOptionalProps from '../../internal/types/PickOptionalProps'

type StatefulComponentConfig<P extends Props = {}> = {
  displayName: string,
  memoize?: boolean,
  validate?(props: P): boolean | null | Error,
  defaultProps?: PickOptionalProps<P>, 
  init(c: Ctrl<P>): (props: P) => VirtualNode,
}

export default StatefulComponentConfig 
