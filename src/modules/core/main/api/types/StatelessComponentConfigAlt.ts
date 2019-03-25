import Props from './Props'
import VirtualNode from './VirtualNode'

type StatelessComponentConfigAlt<P extends Props = {}> = {
  displayName: string,
  defaultProps?: Partial<P>,
  validate?(props: P): boolean | null | Error,
  render(props: P, ref?: any): VirtualNode,
}

export default StatelessComponentConfigAlt
