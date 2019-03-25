import Props from './Props'
import VirtualNode from './VirtualNode'
import PropertiesConfig from './PropertiesConfig'

type StatelessComponentConfig<P extends Props = {}> = {
  displayName: string,
  properties?: PropertiesConfig<P>,
  validate?(props: P): boolean | null | Error
  render(props: P): VirtualNode,
  init?: never
  defaultProps?: never
}

export default StatelessComponentConfig
