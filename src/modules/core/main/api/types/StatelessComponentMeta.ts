import Props from './Props'
import VirtualNode from './VirtualNode'

type StatelessComponentMeta<P extends Props = {}> = {
  displayName: string,
  validate: ((props: P) => null | Error | true | false) | null,
  render(props: P): VirtualNode,
}

export default StatelessComponentMeta
