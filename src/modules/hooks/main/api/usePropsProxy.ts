import { Component } from '../../../core/main/index'

export default function usePropsProxy<P>(c: Component<P>): P & (() => P)  {
  return new Proxy(c.getProps.bind(c), {
    get: (target, name) => (c.getProps() as any)[name]
  }) as any
}
