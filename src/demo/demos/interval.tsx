import { h, component, useInterval, px, Ctrl, Component } from '../../modules/root/main/index'

const Demo = component('Demo', {
  initState: {
    delay: 1000,
    count: 0
  },

  main({ c, state, update }) {
    const
      onReset = () => update({ delay: 1000 })

    useInterval(c, () => {
      update({ count: state.count + 1 })
    }, px.bindValue(() => state.delay))

    useInterval(c, () => {
      if (state.delay > 10) {
        update({ delay: state.delay / 2 })
      }
    }, 1000)

    return () => 
      <div>
        <h1>Counter: {state.count}</h1>
        <h4>Delay: {state.delay}</h4>
        <button onClick={onReset}>
          Reset delay
        </button>
      </div>
  }
})

export default <Demo/>
