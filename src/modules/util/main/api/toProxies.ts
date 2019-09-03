type Rec = Record<string, any>
type Get<T> = () => T

function toProxies<A extends Rec, B extends Rec>(
  getA: Get<A>, getB: Get<B>
): [A, B, (f: (a: A, b: B) => any) => () => any]

function toProxies<A extends Rec, B extends Rec, C extends Rec>(
  getA: Get<A>, getB: Get<B>, getC: Get<C>
): [A, B, C, (f: (a: A, b: B, c: C) => any) => () => any]

function toProxies<A extends Rec, B extends Rec, C extends Rec, D extends Rec>(
  getA: Get<A>, getB: Get<B>, getC: Get<C>, GetD: Get<D>
): [A, B, C, D, (f: (a: A, b: B, c: C, d: D) => any) => () => any]

function toProxies<A extends Rec, B extends Rec, C extends Rec, D extends Rec, E extends Rec>(
  getA: Get<A>, getB: Get<B>, getC: Get<C>, getD: Get<D>
): [A, B, C, D, E, (f: (a: A, b: B, c: C, d: D, e: E) => any) => () => any]

function toProxies(...args: any[]): any {
  const ret: any = []

  for (let i = 0; i < args.length; ++i) {
    ret[i] = new Proxy({}, {
      get: (target: any, name: string) => args[i]()[name]
    })
  }

  ret.push((f: Function) => {
    return () => {
      const values: any = []

      for (let i = 0; i < args.length; ++i) {
        values[i] = args[i]()
      }

      return f.apply(null, values)
    } 
  })

  return ret
}

export default toProxies
