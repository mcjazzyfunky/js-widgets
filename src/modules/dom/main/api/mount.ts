import * as Dyo from 'dyo'

const
  SYMBOL_ITERATOR =
    typeof Symbol === 'function' && Symbol.iterator
      ? Symbol.iterator
      : '@@iterator'

function isElement(it: any) {
  return it && typeof it === 'object' && it.$kind === 'VirtualElement'
}

function isIterableObject(it: any): boolean {
  return typeof it === 'object' && (Array.isArray(it) || typeof it[SYMBOL_ITERATOR] === 'function')
}

export default function mount(element: any, container: Element | string) { 
  if (!isElement(element)) {
    throw new TypeError(
      '[mount] First argument "element" must be a virtual element')
  }

  if (!container || (typeof container !== 'string' && !container.tagName)) {
    throw new TypeError(
      '[mount] Second argument "container" must be a DOM element or the id of the corresponding DOM element')
  }

  const target =
    typeof container === 'string'
      ? document.getElementById(container)
      : container

  if (!target) {
    throw new TypeError(
      `[mount] Could not find container DOM element with id "${container}"`)
  }

  Dyo.render(convertNode(element), target)
}

function adjustEntity(it: any): void {
  if (it.meta && it.meta.variant === 'Fragment') {
    Object.defineProperty(it, '__internal_type', {
      value: Dyo.Fragment 
    })

    return
  } else if (it.meta && it.meta.variant === 'ContextProvider') {
    const DyoContextProvider = ({ value, children }: any) => {
      return Dyo.h(Dyo.Context, { value }, ...children)
    }

    Object.defineProperty(it, '__internal_type', {
      value: DyoContextProvider
    })
console.log(it)
    return
  }

  const kind: string = it['js-widgets:kind'] 

  switch (kind) {
    case 'componentFactory':
      if (it.meta.render) {
         convertStatelessComponent(it)
      } else {
         convertStatefulComponent(it)
      }

      break
  }
}

function convertNode(node: any) {
  if (isIterableObject(node)) {
    return convertNodes(node)
  } else if (!isElement(node)) {
    return node
  }

  const
    type = node.type,
    props = node.props,
    children = props ? props.children || null : null,
    newChildren = children ? convertNodes(children) : null

  if (type && type.__internal_type === undefined && type.meta) {
    adjustEntity(type)
  }

  const
    newType = typeof type === 'function' && type.__internal_type !== undefined ? type.__internal_type : type
  
  let newProps = props ? { ...props } : null

  if (newChildren && newChildren !== children) {
    newProps.children = newChildren
  }

  if (type && type['js-widgets:kind'] === 'contextConsumer' && newProps.children && typeof newProps.children[0] === 'function') { 
    const consume = newProps.children[0]
    newProps.children[0] = (value: any) => convertNode(consume(value))
  }

  let ret = null

  // TODO - optimize

  if (newProps) {
    delete newProps.key
  }

  if (node.key !== null || node.ref !== null) {
    newProps = newProps ? Object.assign({}, newProps) : {}

    if (node.key !== undefined && node.key !== null) {
      newProps.key = node.key
    }

    if (node.ref !== undefined && node.ref !== null) {
      newProps.ref = node.ref
    }
  }

  if (!newProps || !newProps.children) {
    ret = Dyo.createElement(newType, newProps)
  } else {
    const
      children = newProps.children,
      childCount = newProps.children.length,
      newArgs = new Array(childCount + 2)

    delete newProps.children
    newArgs[0] = newType
    newArgs[1] = newProps

    for (let i = 0; i < childCount; ++i) {
      newArgs[i + 2] = children[i]
    }

    ret = Dyo.createElement.apply(null, newArgs)
  }

  return ret
}

function convertNodes(elements: any[]) {
  const ret = [...elements]

  for (let i = 0; i < elements.length; ++i) {
    const child = elements[i]

    if (isElement(child)) {
      ret[i] = convertNode(child)
    } else if (isIterableObject(child)) {
      ret[i] = convertNodes(child)
    }
  }

  return ret
}

function convertStatelessComponent(it: any): Function {
  let ret: any = (props: any, ref: any = null) => {
    if (ref) {
      props.ref = ref
    }
    
    return convertNode(it.meta.render(props))
  }

  ret.displayName = it.meta.displayName

  if (it.meta.memoize) {
    ret = Dyo.memo(ret)
  }

  Object.defineProperty(it, '__internal_type', {
    value: ret
  })

  return ret
}

function convertStatefulComponent(it: any): Function {
  let ret = function StatefulComponent(props: any, ref: any) {
    if (ref) {
      //props.ref = ref
      props = { ...props, ref } // TODO - optimize
    }

    const
      currPropsRef = Dyo.useRef(props),
      getProps = Dyo.useRef(() => currPropsRef.current).current,
      isMountedRef =  Dyo.useRef(false),
      states: any[] = Dyo.useRef([]).current,
      contexts: any[] = Dyo.useRef([]).current,
      updateListeners: (() => void)[] = Dyo.useRef([]).current,
      disposeListeners: (() => void)[] = Dyo.useRef([]).current,

      component = Dyo.useRef({
        getProps() {
          return currPropsRef.current
        },

        handleState(initialState: any) {
          const idx = states.length

          states[idx] = [initialState, null]

          return [() => states[idx][0], (init: any) => {
            states[idx][0] = init
            
            if (isMountedRef.current) {
              states[idx][1](init)
            }
          }]
        },

        consumeContext(context: any) {
          const idx = contexts.length

          if (!context.Provider.__internal_type) {
          //  convertContext(context) // TODOO!!!
          }

          contexts[idx] = [context.Provider.__internal_defaultValue, context]

          return () => {
            return contexts[idx][0]
          }
        },

         onUpdate(listener: () => void): () => void {
           const subscriber = () => listener()

           updateListeners.push(subscriber)

           return () => {
              const idx = updateListeners.indexOf(subscriber)
              updateListeners.splice(idx, 1)
           }
         },

         onUnmount(listener: () => void): () => void {
           const subscriber = () => listener()

           disposeListeners.push(subscriber)

           return () => {
              const idx = disposeListeners.indexOf(subscriber)
              disposeListeners.splice(idx, 1)
           }
         }
      }).current,

    renderRef = Dyo.useRef(null)
    currPropsRef.current = props

    Dyo.useEffect(() => {
      isMountedRef.current = true

      const listeners = [...updateListeners]

      listeners.forEach(
        listener => listener())
    })

    Dyo.useEffect(() => {
      const listeners = [...disposeListeners]

      return () => listeners.forEach(
        listener => listener()) 
    }, [])

    if (!renderRef.current) {
      renderRef.current = it.meta.init(component, getProps)
    }

    states.forEach(item => {
      const [value, setValue] = Dyo.useState(item[0])

      item[0] = value
      item[1] = setValue
    })

    contexts.forEach(item => {
      const value = useContext(item[1].Provider.__internal_type._context)
    
      item[0] = value
    })

    return convertNode(renderRef.current(props))
  }
  
  ;(ret as any).displayName = it.meta.displayName

  if (it.meta.memoize) {
    ret = Dyo.memo(ret)
  }
  
  Object.defineProperty(it, '__internal_type', {
    value: ret
  })

  return ret
}

function createContext(defaultValue: any) {
  const Provider = ({ value, children }: any) => {
    return Dyo.createElement(Dyo.Context, { value }, ...children)
  }

  Object.defineProperty(Provider, '__internal_defaultValue', {
    value: defaultValue
  })

  const Consumer = ({ children }: any) => {
    return Dyo.Children.onlyChild(children)
  }

  return { Provider, Consumer }
}

function useContext(context: any) {
  let ret = Dyo.useContext(context)

  if (ret === undefined) {
    ret = context.Provider.__internal_defaultValue
  }

  return ret
}