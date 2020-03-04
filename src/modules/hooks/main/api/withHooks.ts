import { Props, VNode, Ctrl } from '../../../core/main/index'

export default function withHooks<
  P extends Props
>(init: (c: Ctrl<P>, props: P) => (() => VNode)):
  (c: Ctrl<P>) => (props: P) => VNode
{
  return c => {
    const props: P = Object.assign({}, c.getProps())

    c.beforeUpdate(() => {
      for (const propName in props) {
        delete props[propName]
      }

      Object.assign(props, c.getProps())
    })

    return init(c, props)
  }
}
