import Props from './Props'
//import Methods from './Methods'
import Ref from './Ref'
import PropertiesConfig from './PropertiesConfig'
import VirtualElement from './VirtualElement'
import Component from './Component'

type Base<P extends Props = {}/*, M extends Methods = {}*/> = {
  displayName: string,
  properties?: PropertiesConfig<P>
  validate?(props: P): null | Error | true | false,
}

type Stateless<P extends Props = {}> = Base<P> & {
  render(props: P): VirtualElement
}

type Stateful<P extends Props/*, M extends Methods = {}*/> = Base<P> & {
  //methods?: (keyof M)[],
  init: (c: Component/*, ref: Ref<M>*/) => () =>  VirtualElement
}

type ComponentMeta<P extends Props = {} /*, M extends Methods = {}*/> =
  Stateless<P> | Stateful<P/*, M*/>

export default ComponentMeta
