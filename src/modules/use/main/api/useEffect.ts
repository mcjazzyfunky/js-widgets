import { Component } from '../../../core/main/index'

export default function useEffect<A extends any[]>(
  c: Component,
  action: (...args: A) => void
): (...args: A) => void {
  const
    argsList: A[] = [],
    cleanups: (() => void)[] = []

  c.onUpdate(() => {console.log('onUpdate')
    argsList.forEach(args => {
      action(...args)
    })
  })

  return (...args: A) => {
    argsList.push(args)
  }
}

// --- locals -------------------------------------------------------

function isEqual(arr1: any[], arr2: any[]):  boolean {
  let ret = Array.isArray(arr1) && Array.isArray(arr2) && arr1.length === arr2.length

  if (ret) {
    for (let i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) {
        ret = false
        break
      }
    }
  }

  return ret
}