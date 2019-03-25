import Props from './Props'
import VirtualNode from './VirtualNode'

type StatelessComponentMeta<P extends Props = {}> = {
  type: 'statelessComponent',
  displayName: string,
  defaults?: Partial<P>,
  validate?(props: P): null | Error | true | false,
  render(props: P): VirtualNode,
}

export default StatelessComponentMeta
