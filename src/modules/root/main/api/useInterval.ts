import { Ctrl } from '../../../core/main/index'

import useEffect from './useEffect'
import px from './px'
import Var from './types/Var'

function useInterval(
  c: Ctrl,
  _callback: Var<() => void>,
  _delay: Var<number>
) {
  const
    $callback = px.toValue(_callback),
    $delay = px.toValue(_delay)
  
  useEffect(c, () => {
    let id = setInterval($callback.value, $delay.value)

    return () => clearInterval(id)
  }, () => [$callback.value, $delay.value])
}


export default useInterval
