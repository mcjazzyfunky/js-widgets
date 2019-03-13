import { defineComponent, Component, VirtualElement } from '../modules/core/main/index'
import { forceUpdate } from '../modules/util/main/index'
import { mount } from '../modules/dom/main/index'
import { div, h4, label, option, select } from '../modules/html/main/index'

import availableDemos from './available-demos'

// --- Component DemoSelector ---------------------------------------

type DemoSelectorProps = {
  demos: [string, VirtualElement][]
}

const DemoSelector = defineComponent<DemoSelectorProps>({
  displayName: 'DemoSelector',

  init(c) {
    let
      demoIdx = getCurrentDemoIndex()

    function startDemo(c: Component, idx: number) {
      demoIdx = idx
      document.location.href = document.location.href.replace(/#.*$/, '') + '#idx=' + idx
      forceUpdate(c)
    }

    const options: [string, VirtualElement][] = []

    return props => {
      for (let i = 0; i < props.demos.length; ++i) {
        const demo = props.demos[i]
            
        options.push(option({ key: i, value: i }, demo[0]))
      }

      return (
        div(null,
          div(null,
            label(null, 'Select demo: '),
              select({
                onChange: (ev: any) => startDemo(c, ev.target.value),
                value: demoIdx,
                autoFocus: true
              }, options)),
              div(null,
                h4('Example: ', props.demos[demoIdx][0]),
                props.demos[demoIdx][1])))
    }
  }
})

// --- Component Demo -----------------------------------------------

type DemoProps = {
  demos: [string, VirtualElement][]
}

const Demo = defineComponent<DemoProps>({
  displayName: 'Demo',

  render(props) {
    return (
      div(null,
        DemoSelector({ demos: props.demos }))
    )
  }
})

function getCurrentDemoIndex() {
  return parseInt(document.location.href.replace(/^.*idx=/, ''), 10) || 0
}

// --- main ---------------------------------------------------------

mount(Demo({ demos: availableDemos }), 'main-content')

declare module 'react'
declare module 'react-dom'
