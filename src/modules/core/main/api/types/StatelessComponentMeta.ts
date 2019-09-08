import Props from './Props'
import VirtualNode from './VirtualNode'

type StatelessComponentMeta<P extends Props = {}> = {
  displayName: string,
  render(props: P): VirtualNode,
}

export default StatelessComponentMeta
