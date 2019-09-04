import Ctrl from './Ctrl'
import Props from './Props'
import VirtualNode from './VirtualNode'

type StatefulComponentMeta<P extends Props = {}> = {
  displayName: string,
  validate: ((props: P) => null | Error | true | false) | null,
  init(c: Ctrl<P>): (props: P) =>  VirtualNode,
}

export default StatefulComponentMeta
