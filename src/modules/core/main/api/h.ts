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
  
  let validate: null  | ((props: Props) => boolean | null | Error) = null

  if (typeof type === 'function' && (type as any).__type !== undefined) {
    args[0] = (type as any).__type

    validate = type.meta.validate
  }

  const ret = createElement.apply(null, args as any)

  if (process.env.NODE_ENV === 'development' as any && validate) {
    let props = ret.props as Props

    if ('key' in props) {
      props = {...props}

      delete props.key
    }

    const result = validate(props)

    if (result === false || result instanceof Error) {
      let errorMsg = `Property validation failed for component '${type.meta.name}'`

      if (result !== false && result.message) {
        errorMsg += ` => ${result.message}`
      }
      
      throw new TypeError(errorMsg)
    }
  }

  return ret
}

export default h 
