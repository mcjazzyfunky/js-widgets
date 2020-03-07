// TODO: Fix this code mess!!!

import { h as createDyoElement, Boundary as DyoBoundary } from 'dyo'
import h from './h'
import setHiddenProp from '../internal/setHiddenProp'
import component from './component'
import Children from './types/Children'
import Component from './types/Component'

type BoundaryProps = {
  fallback: Function, // TODO
  children?: Children
}

const Boundary: Component<BoundaryProps> = component({
  name: 'Boundary',

  render(props) {
    const { children, ...propsWithoutChildren } = props

    return h(Boundary, propsWithoutChildren, ...children)
  }
})

setHiddenProp(Boundary, '__type', CustomDyoBoundary)

function CustomDyoBoundary({
  fallback,
  children
}: any) { // TODO
  return createDyoElement(DyoBoundary as any, { // TODO
    fallback(cause: any) {
      return fallback(cause.message)
    }
  } as any, children) // TODO
}

CustomDyoBoundary.displayName = 'Boundary'

export default Boundary
