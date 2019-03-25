import Component from './Component'
import Props from './Props'
import VirtualNode from './VirtualNode'

type StatefulComponentMeta<P extends Props = {}> = {
  type: 'statefulComponent',
  displayName: string,
  defaults?: Partial<P>,
  validate?(props: P): null | Error | true | false,
  init: (c: Component) => (props: P) =>  VirtualNode,
  render: never
}

export default StatefulComponentMeta
