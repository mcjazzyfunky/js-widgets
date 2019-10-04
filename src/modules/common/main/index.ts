export { default as component } from './api/component'
export { default as newRef } from './api/newRef'
export { default as newValue } from './api/newValue'

export { isElement, isNode, childCount, forEachChild, mapChildren, onlyChild, toChildArray, withChildren }
  from '../../util/main/index'

export { h, context, typeOf, propsOf, mount, unmount, Fragment, Boundary }
  from '../../core/main/index'
