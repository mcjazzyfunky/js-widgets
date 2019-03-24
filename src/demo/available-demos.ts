import { VirtualElement } from '../modules/core/main/index'

// hooks
import simpleCounter from './demos/hooks/simple-counter'
import complexCounter from './demos/hooks/complex-counter'
import stopWatch from './demos/hooks/stop-watch'
import i18n from './demos/hooks/i18n'


// handlers
import simpleCounter2 from './demos/handlers/simple-counter'
import stopWatch2 from './demos/handlers/stop-watch'

const demos: [string, VirtualElement][] = [
  ['Simple counter (hooks)', simpleCounter],
  ['Complex counter (hooks)', complexCounter],
  ['Stop watch (hooks)', stopWatch],
  ['Internationalization (hooks)', i18n],

  ['Simple counter (handlers)', simpleCounter2],
  ['Stop watch (handlers)', stopWatch2],
]

export default demos
