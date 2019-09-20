type Proxifiable =
  () => { [key: string]: any}
    | { [key: string]: () => any }

function toProxy<T extends Record<string, any>>(getter: () => T): T

function toProxy<G extends Record<string, () => any>>(getters: G): { [key in keyof G]: G[key] }

function toProxy(what: any): any {
  let ret: any

  if (typeof what === 'function') {
    ret = new Proxy({}, {
      get: (_: any, name: string) => what()[name]
    })
  } else {
    ret = new Proxy({}, {
      get: (_: any, name: string) => what[name](),
    })
  }
  
  return ret
}

export default toProxy
