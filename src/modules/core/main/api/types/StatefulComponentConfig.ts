import Props from './Props'
import VirtualNode from './VirtualNode'
import PropertiesConfig from './PropertiesConfig'
import Component from './Component'

type StatefulComponentConfig<P extends Props = {}> = {
  displayName: string,
  properties?: PropertiesConfig<P>,
  validate?(props: P): boolean | null | Error,
  init: (c: Component<P>) => (props: P) => VirtualNode,
  render?: never
  defaultProps?: never
}

export default StatefulComponentConfig
