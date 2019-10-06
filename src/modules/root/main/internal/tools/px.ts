const px = Object.freeze({
  value<T>(value: T) {
    const
      target = new Value(),
      valueOf = () => target.value

    target.value = value


    const ret = new Proxy(target, {

      get(target, name) {
        return name === 'value'
          ? target.value
          : name === 'valueOf'
          ? valueOf
          : undefined
      }
    })

    return ret
  },

  bindValue<T>(getValue: () => T): { value: T } {
    const target = new Value()

    Object.defineProperty(target, 'value', {
        get: getValue,

        set() {
          throw new Error('Write operation not allowed')
        }
    })

    return new Proxy(target, {}) as any
  },

  bindData<T>(getData: () => T) {
    return toProxy(getData)
  },

  isValue(it: any) {
    return it instanceof Value
  },

  toValue<T>(it: T | { value: T }): { value: T } {
    return px.isValue(it) ? it as Value : px.value(it)
  }
})


class Value {
  value: any

  valueOf() {
    return (this as any).value
  }
}

type Proxifiable =
  () => { [key: string]: any}
    | { [key: string]: () => any }

function toProxy<T extends Record<string, any>>(getter: () => T): T

function toProxy<G extends Record<string, () => any>>(getters: G): { [key in keyof G]: G[key] }

function toProxy(what: any): any {
  let ret, get, has, ownKeys, getOwnPropertyDescriptor

  if (typeof what === 'function') {
    get = (_: any, name: string) => what()[name],
    has = (_: any, name: string) => (name in what())

    ownKeys = () => {
       return Object.keys(what())
    }

    getOwnPropertyDescriptor = function (_: any, name: any) {
      return Object.getOwnPropertyDescriptor(what(), name)
    }

    ret = new Proxy({}, {
      get,
      ownKeys,
      has,
      getOwnPropertyDescriptor
    })
  } else {
    const target = {}

    for (const key of Object.keys(what)) {
      Object.defineProperty(target, key, {
        enumerable: true,
        get: what[name]
      })
    }

    ret = new Proxy(target, {})
  }

  return ret
}

export default px
