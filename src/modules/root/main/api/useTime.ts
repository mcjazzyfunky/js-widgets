import { Ctrl } from '../../../core/main/index'

import useState from './useState'
import useInterval from './useInterval'
import Var from './types/Var'

export default function useTime(
  c: Ctrl,
  interval: Var<number> = 1000
): { value: Date } {
  const [$time, setTime] = useState(c, new Date())

  useInterval(c, () => setTime(new Date()), interval)

  return $time
}
