import { h,  component, createRef } from '../../modules/core/main/index'
import { useEffect, useProps, useOnMount, useStateObject } from '../../modules/hooks/main/index'
import { proxify } from '../../modules/util/main/index'

type StopWatchProps = {
  name?: string
}

const StopWatch = component<StopWatchProps>('StopWatch')({
  defaultProps: {
    name: 'Stop watch'
  },

  init(c) {
    let startTime = 0

    const
      [getState, setState] = useStateObject(c, {
        time: 0,
        running: false
      }),

      [props, state, using] = proxify(useProps(c), getState)

    useOnMount(c, () => {
      console.log(`${props.name} has been mounted`)

      return () => {
        reset()
        console.log(`${props.name} will be unmounted`)
      }
    })

    function startStop() {
      setState({ running: !state.running })
    }

    function reset() {
      startTime = 0
      setState({ running: false, time: 0 })
    }

    useEffect(c, () => {
      if (state.running) {
        startTime = Date.now()
        console.log(`Starting "${props.name}"`)

        const interval = setInterval(() => {
          setState({ time: Date.now() - startTime })
        }, 103);

        return () => {
          console.log(`Stopping "${props.name}"`)
          clearInterval(interval)
        }
      }
    }, () => [state.running])

    return using((props, state) =>
      <div>
        <h4>{props.name}</h4>
        <div>Time: {state.time}</div>
        <button onClick={startStop}>
          { state.running ? 'Stop' : 'Start' }
        </button>
        <button onClick={reset}>
          Reset
        </button>
      </div>
    )
  }
})

export default (
  <div>
    <StopWatch name="Stop watch 1"/>
    <StopWatch name="Stop watch 2"/>
  </div>
)
