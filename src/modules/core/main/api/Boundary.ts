import h from './h'
import component from './component'
import Component from './types/Component'

type BoundaryProps = {
  key?: number | string,
  fallback: Function, // TODO
  children?: any // TODO
}

const Boundary = component<BoundaryProps>('Boundary')({
  render(props) {
    const { children, ...props2 } = props

    return h(Boundary as any, props2, ...children)
  }
}) as Component<BoundaryProps>

export default Boundary
