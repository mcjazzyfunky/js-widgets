import { Ctrl, Props } from '../../../core/main/index'
import hook from './hook'

function useProps<
  P extends Props,
  D extends PartialOptionalProps<P> = {}  
>(c: Ctrl<P>, defaultProps?: D): P & D {
  const props = Object.assign({}, defaultProps, c.getProps())
  
  c.beforeUpdate(() => {
    for (const propName in props) {
      delete props[propName]
    }

    Object.assign(props, defaultProps, c.getProps())
  })

  return props
}

// --- types ---------------------------------------------------------

type OmitNeverProps<T extends object> = Pick<T, {
  [K in keyof T]: T[K] extends never ? never : K
}[keyof T]>

type PickOptionalProps<T extends object> = OmitNeverProps<{
  [K in keyof T]: T extends Record<K, T[K]> ? never : T[K]
}>

type PartialOptionalProps<T extends Object> = Partial<PickOptionalProps<T>>

// --- exports -------------------------------------------------------

export default hook('useProps', useProps)
