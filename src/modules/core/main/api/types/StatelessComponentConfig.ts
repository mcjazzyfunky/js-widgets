import Props from './Props'
import VirtualNode from './VirtualNode'

type StatelessComponentConfig<P extends Props = {}> = {
  displayName: string,
  memoize?: boolean,
  validate?: ((props: P) => boolean | null | Error) | null,
  render: (props: P) => VirtualNode,
}

export default StatelessComponentConfig
