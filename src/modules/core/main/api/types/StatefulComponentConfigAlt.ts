import Props from './Props'
import VirtualNode from './VirtualNode'
import Component from './Component'

type StatefulComponentConfigAlt<P extends Props = {}> = {
  displayName: string,
  defaultProps?: Partial<P>, 
  validate?(props: P): boolean | null | Error,
  init: (c: Component<P>) => (props: P) => VirtualNode,
}

export default StatefulComponentConfigAlt 
