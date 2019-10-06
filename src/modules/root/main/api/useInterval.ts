import { Ctrl } from '../../../core/main/index'

import useEffect from './useEffect'
import useAsValue from './useAsValue'
import Varia from './types/Varia'

function useInterval(
  c: Ctrl,
  variCallback: Varia<() => void>,
  variDelay: Varia<number>
) {
  const
    $callback = useAsValue(c, variCallback),
    $delay = useAsValue(c, variDelay)
  
  useEffect(c, () => {
    const id = setInterval($callback.value, $delay.value)

    return () => clearInterval(id)
  }, [$callback, $delay])
}


export default useInterval
