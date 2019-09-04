import { VirtualElement } from '../modules/core/main/index'

import helloWorld from './demos/hello-world'
import simpleCounter from './demos/simple-counter'
import simpleCounterAlt from './demos/simple-counter-alt'
import complexCounter from './demos/complex-counter'
import clock from './demos/clock'
import fragments from './demos/fragments'
import iterators from './demos/iterators'
import stopWatch from './demos/stop-watch'
import stopWatchAlt2 from './demos/stop-watch-alt2'
import mousePosition from './demos/mouse-position'
import i18n from './demos/i18n'

const demos: [string, VirtualElement][] = [
  ['Hello world', helloWorld],
  ['Simple counter', simpleCounter],
  ['Simple counter - alternative', simpleCounterAlt],
  ['Complex counter', complexCounter],
  ['Clock', clock],
  ['Fragments', fragments],
  ['Iterators', iterators],
  ['Stop watch', stopWatch],
  ['Stop watch - using withData', stopWatchAlt2],
  ['Mouse position', mousePosition],
  ['Internationalization', i18n],
]

export default demos
