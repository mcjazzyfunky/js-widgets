import { VirtualElement } from '../modules/core/main/index'

// hooks
import simpleCounter from './demos/hooks/simple-counter'
import i18n from './demos/hooks/i18n'


// handlers
import simpleCounter2 from './demos/handlers/simple-counter'
//import stopWatch from './demos/stop-watch'

const demos: [string, VirtualElement][] = [
  ['Simple counter (Hooks)', simpleCounter],
  ['Internationalization (Hooks)', i18n],

  ['Simple counter (handlers)', simpleCounter2],
//  ['Stop watch', stopWatch],
]

export default demos
