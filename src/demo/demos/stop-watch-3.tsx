import { h, component } from '../../modules/core/main/index'
import { useEffect, usePropsProxy,  useStateProxy } from '../../modules/hooks/main/index'

type StopWatchProps = {
  name?: string
}

const StopWatch = component<StopWatchProps>({
  displayName: 'StopWatch',

  init(c) {
    const
      props = usePropsProxy(c, { name: 'Stop Watch' }),

      [state, setState] = useStateProxy(c, {
        startTime: 0,
        duration: 0,
        running: false
      }),

      onStartStop = () => {
        if (!state.running) {
          setState({ running: true, startTime: Date.now() - state.duration })
        } else {
          setState({ running: false })
        }
      },

      onReset = () => setState({ running: false, duration: 0, startTime: 0 })

    useEffect(c, () => {
      if (state.running) {
        console.log(`Starting "${props.name}"`)

        const interval = setInterval(() => {
          if (state.running) {
            setState({ duration: Date.now() - state.startTime })
          }
        }, 10)

        return () => {
          console.log(`Stopping "${props.name}"`)
          clearInterval(interval)
        }
      }
    }, () => [state.running])

    return () =>
      <div>
        <h4>{props.name}</h4>
        <div>Duration: {state.duration}</div>
        <button onClick={onStartStop}>
          { state.running ? 'Stop' : 'Start' }
        </button>
        <button onClick={onReset}>
          Reset
        </button>
      </div>
  }
})

export default (
  <div>
    <StopWatch name="Stop watch 1"/>
    <StopWatch name="Stop watch 2"/>
  </div>
)
