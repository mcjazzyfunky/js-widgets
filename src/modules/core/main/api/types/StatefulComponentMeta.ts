import Ctrl from './Ctrl'
import Props from './Props'
import VirtualNode from './VirtualNode'

type StatefulComponentMeta<P extends Props = {}> = {
  displayName: string,
  init(c: Ctrl<P>): (props: P) =>  VirtualNode,
}

export default StatefulComponentMeta
