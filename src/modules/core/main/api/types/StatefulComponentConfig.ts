import Props from './Props'
import VirtualNode from './VirtualNode'
import Ctrl from './Ctrl'

type StatefulComponentConfig<P extends Props = {}> = {
  displayName: string,
  memoize?: boolean,
  validate?: ((props: P) => boolean | null | Error) | null,
  init: (c: Ctrl<P>) => (props: P) => VirtualNode,
}

export default StatefulComponentConfig 
