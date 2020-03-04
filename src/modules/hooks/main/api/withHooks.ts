import { Props, VNode, Ctrl } from '../../../core/main/index'

export default function useHooks<
  P extends Props
>(init: (c: Ctrl, props: P) => (() => VNode)):
  (c: Ctrl, getProps: () => P) => (props: P) => VNode
{
  return (c, getProps) => {
    const props: P = Object.assign({}, getProps())

    c.beforeUpdate(() => {
      for (const propName in props) {
        delete props[propName]
      }

      Object.assign(props, getProps())
    })

    return init(c, props)
  }
}
