import Props from './Props'
import Methods from './Methods'
import VirtualNode from './VirtualNode'
import PropertiesConfig from './PropertiesConfig'
import Component from './Component'

type Stateless<P extends Props = {}> = {
  displayName: string,
  render(props: P, ref?: any): VirtualNode
}

type Stateful<P extends Props = {}, M extends Methods = {}> = {
  displayName: string,
  methods?: (keyof M)[],
  init: ((c: Component, ref?: any) => (props: P) => VirtualNode) | (() => any) // TODO
}

type WithProperties<P extends Props = {}> = {
  properties?: PropertiesConfig<P>,
  defaultProps?: never, 
}

type WithDefaultProps<P extends Props = {}> = {
  defaultProps?: Partial<P>,
  properties?: never,
}

type ComponentConfig<P extends Props = {}, M extends Methods = {}> =
  (Stateless<P> & WithProperties<P>)
    | (Stateless<P> & WithDefaultProps<P>)
    | (Stateful<P, M> & WithProperties<P>)
    | (Stateful<P, M> & WithDefaultProps<P>)

export default ComponentConfig
