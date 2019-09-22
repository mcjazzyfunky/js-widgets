import { Ctrl } from '../../../core/main/index'

// TODO: Real implementation is missing

type Cleanup = (() => void) | undefined | null

export default function handleEffect<T, A extends any[]>(c: Ctrl, f: (...args: A) => Cleanup):
  (...args: A) => void {

  let
    unsubscribe: Cleanup,
    cleanup: Cleanup,
    oldArgs: A

  const ret = (...args: A) => {
    if (oldArgs) {
      if (isSameArray(args, oldArgs)) {
        return
      }
    }

    oldArgs = args

    unsubscribe = c.onUpdate(() => {
      if (unsubscribe) {
        unsubscribe()
        unsubscribe = null
      }

      if (cleanup) {
        cleanup()
        cleanup = null
      }

      cleanup = f(...args)
    })
  }
  
  return ret
}

function isSameArray(arr1: any[], arr2: any[]) {
  let ret = false

  if (arr1.length === arr2.length) {
    let i: number = 0

    for (i; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) {
        break
      }
    }

    if (i === arr1.length) {
      ret = true
    }
  }

  return ret
}