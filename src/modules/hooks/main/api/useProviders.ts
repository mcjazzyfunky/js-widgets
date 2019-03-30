import { Component } from '../../../core/main/index'

function useProviders<A1>(c: Component, getters: [() => A1], action?: (a1: A1) => void): [A1]
function useProviders<A1, A2>(c: Component, getters: [() => A1, () => A2], action?: (a1: A1, a2: A2) => void): [A1, A2]
function useProviders<A1, A2, A3>(c: Component, getters: [() => A1, () => A2, () => A3], action?: (a1: A1, a2: A2, a3: A3) => void): [A1, A2, A3]
// ... etc
function useProviders(c: Component, getters?: any, action?: (...args: any) => void): any {
  let ret = getters.map((getter: any) => getter())

  if (action) {

    c.onUpdate(() => {
      const values = getters.map((getter: any) => getter())
      action.apply(null, values)
    })
  }

  return ret
}

export default useProviders
