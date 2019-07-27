import { VirtualElement } from '../modules/core/main/index'

import helloWorld from './demos/hello-world'
import simpleCounter from './demos/simple-counter'
import simpleCounterAlt from './demos/simple-counter-alt'
import complexCounter from './demos/complex-counter'
import stopWatch from './demos/stop-watch'
import stopWatchAlt from './demos/stop-watch-alt'
import stopWatchAlt2 from './demos/stop-watch-alt2'
import i18n from './demos/i18n'
import friendList from './demos/friend-list'

const demos: [string, VirtualElement][] = [
  ['Hello world', helloWorld],
  ['Simple counter', simpleCounter],
  ['Simple counter - alternative', simpleCounterAlt],
  ['Complex counter', complexCounter],
  ['Stop watch', stopWatch],
  ['Stop watch - using store', stopWatchAlt],
  ['Stop watch - using withData', stopWatchAlt2],
  ['Internationalization', i18n],
  ['Friend list', friendList],
]

export default demos
