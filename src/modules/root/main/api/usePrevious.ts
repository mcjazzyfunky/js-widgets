import { Ctrl } from '../../../core/main/index'
import useEffect from './useEffect'
import useBoundValue from './useBoundValue'

export default function usePrevious<T>(c: Ctrl, getCurrent: () => T | undefined) {
  let
    current: T | undefined = undefined,
    previous: T | undefined = undefined

  useEffect(c, () => {
    previous = current
    current = getCurrent()
  })

  return useBoundValue(c, () => previous) 
}
