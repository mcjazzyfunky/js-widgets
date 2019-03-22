import { VirtualElement } from '../modules/core/main/index'

// hooks
import simpleCounter from './demos/hooks/simple-counter'


// handlers
import simpleCounter2 from './demos/handlers/simple-counter'
//import stopWatch from './demos/stop-watch'

const demos: [string, VirtualElement][] = [
  ['Simple counter (Hooks)', simpleCounter],

  ['Simple counter (handlers)', simpleCounter2],
//  ['Stop watch', stopWatch],
]

export default demos
