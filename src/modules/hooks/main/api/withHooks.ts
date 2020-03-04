import { Props, VNode, Ctrl } from '../../../core/main/index'
import PartialOptionalProps from '../../../core/main/internal/types/PartialOptionalProps'

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
