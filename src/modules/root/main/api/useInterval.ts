import { Ctrl } from '../../../core/main/index'

import useEffect from './useEffect'
import useAsMutable from './useAsMutable'
import Varia from './types/Varia'

function useInterval(
  c: Ctrl,
  variCallback: Varia<() => void>,
  variDelay: Varia<number>
) {
  const
    $callback = useAsMutable(c, variCallback),
    $delay = useAsMutable(c, variDelay)
  
  useEffect(c, () => {
    const id = setInterval($callback.value, $delay.value)

    return () => clearInterval(id)
  }, [$callback, $delay])
}


export default useInterval
