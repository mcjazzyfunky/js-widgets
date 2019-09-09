import { VirtualElement } from '../modules/core/main/index'

import helloWorld from './demos/hello-world'
import simpleCounter from './demos/simple-counter'
import simpleCounterAlt from './demos/simple-counter-alt'
import complexCounter from './demos/complex-counter'
import clock from './demos/clock'
import iterators from './demos/iterators'
import fragments from './demos/fragments'
import boundary from './demos/boundary'
import stopWatch1 from './demos/stop-watch-1'
import stopWatch2 from './demos/stop-watch-2'
import stopWatch3 from './demos/stop-watch-3'
import mousePosition from './demos/mouse-position'
import i18n from './demos/i18n'
import performanceTest1 from './demos/performance-test-1'
import performanceTest2 from './demos/performance-test-2'

const demos: [string, VirtualElement][] = [
  ['Hello world', helloWorld],
  ['Simple counter', simpleCounter],
  ['Simple counter - alternative', simpleCounterAlt],
  ['Complex counter', complexCounter],
  ['Clock', clock],
  ['Iterators', iterators],
  ['Fragments', fragments],
  ['Boundary', boundary],
  ['Stop watch 1', stopWatch1],
  ['Stop watch 2', stopWatch2],
  ['Stop watch 3', stopWatch3],
  ['Mouse position', mousePosition],
  ['Internationalization', i18n],
  ['Performance test 1', performanceTest1],
  ['Performance test 2', performanceTest2],
]

export default demos
