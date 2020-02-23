import { createElement } from 'dyo'
import Component from './types/Component'
import Props from './types/Props'
import VElement from './types/VElement'
import VNode from './types/VNode'

function h<P extends Props>(
  type: string | Component<P>,
  props?: P | null,
  ...children: VNode[]
): VElement<P>

function h(/* arguments */) {
  const
    args = arguments,
    type = args[0]

  if (typeof type  === 'function' && (type as any).__type !== undefined) {
    args[0] = (type as any).__type
  }

  return createElement.apply(null, args as any)
}

export default h 
