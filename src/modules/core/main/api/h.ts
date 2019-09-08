import createElement from '../internal/adapt/createElement'
import isValidElement from '../internal/adapt/isValidElement'
import Component from './types/Component'
import VirtualElement from './types/VirtualElement'
import Props from './types/Props'

function h(type: string | Component, props?: Props | null, ...children: any[]): VirtualElement

function h(/* arguments */): any {
  const
    type: any = arguments[0],
    internalType = type && type.__internal_type

  if (process.env.NODE_ENV === 'development' as any) {
    const
      arg2 = arguments[1]
    
    if (typeof type === 'function' && type.meta && type.meta.validate) {
      const props =
        arg2 && typeof arg2 === 'object' && !isValidElement(arg2) && !isIterable(arg2)
          ? arg2
          : null

      let error: Error | null =
        validateComponentProps(props || {}, type.meta.validate, type.meta.displayName)

      if (error) {
        throw new Error(
          `Props validation failed for component "${type.meta.displayName}" => `
            + error.message) 
      }
    }
  }

  if (internalType !== undefined) {
    arguments[0] = internalType
  }

  return createElement.apply(null, arguments)
}

function validateComponentProps(
  props: Props,
  validate: (it: any) => boolean | null | Error,
  displayName: string
): null | Error {
  const result = validate(props)

  let errorMsg: string | null = null

  if (result === false) {
    errorMsg = 'Invalid props'
  } else if (result instanceof Error && result.message) {
    errorMsg = result.message
  }

  return !errorMsg
    ? null
    : new Error(errorMsg)
}

function isIterable(it: any) {
  return it && typeof it === 'object'
    && (Array.isArray(it) || typeof it[Symbol.iterator] === 'function')
}

export default h
