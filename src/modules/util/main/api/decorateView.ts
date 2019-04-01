import { VirtualNode } from '../../../core/main/index'

type Props = Record<string, any>
type Renderer<P extends Props> = ((props: P) => VirtualNode)
type ViewDecorator<P extends Props> = (renderer: Renderer<P>) => Renderer<P>

export default function decorateView<P extends Props>(
  decoration: ViewDecorator<P> | ViewDecorator<P>[] | null,
  actionBefore?: (props: P) => void
) {
  return (renderer: Renderer<P>) => {
    if (Array.isArray(decoration)) {
      decoration.forEach(decorator => {
        renderer = decorator(renderer)
      })
    } else if (decoration) {
      renderer = decoration(renderer)
    }

    return (props: P) => {
      if (actionBefore) {
        actionBefore(props)
      }

      return renderer(props)
    }
  }
}