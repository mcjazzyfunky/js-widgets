import { h, component } from '../../modules/core/main/index'
import { useProps, useOnUnmount, useStateObject } from '../../modules/hooks/main/index'
import { createRef, toProxies } from '../../modules/util/main/index'

type StopWatchProps = {
  label?: string
}

const StopWatch = component<StopWatchProps>('StopWatch')({
  defaultProps: {
    label: 'Stop watch'
  },

  init(c) {
    const
      [getState, setState] = useStateObject(c, {
        time: 0,
        running: false
      }),

      getProps = useProps(c),
      [props, state, using] = toProxies(getProps, getState),
      intervalIdRef = createRef(0),

      onStartStop = () => {
        if (state.running) {
          stopTimer()
        } else {
          startTimer()
        }
      },

      onReset = () => resetTimer()

    useOnUnmount(c, () => stopTimer())
    
    function startTimer() {
      if (!state.running) {
        console.log(`[${props.label}] Started`)

        const startTime = Date.now() - state.time

        intervalIdRef.current = window.setInterval(() => {
          setState({ time: Date.now() - startTime })
        }, 91) // TODO - the demo has problems if milliseconds are lower (e.g. 20)

        setState({ running: true })
      }
    }

    function stopTimer() {
      if (state.running) {
        console.log(`[${props.label}] Stopped`)

        clearInterval(intervalIdRef.current)
        intervalIdRef.current = 0
        setState({ running: false })
      }
    }

    function resetTimer() {
      stopTimer()
      setState({ time: 0 })
    }

    return using((props, state) =>
      <div>
        <h4>{props.label}</h4>
        <div>Time: {state.time}</div>
        <button onClick={onStartStop}>
          { state.running ? 'Stop' : 'Start'}
        </button>
        <button onClick={onReset}>
          Reset
        </button>
      </div>
    )
  }
})

export default (
  <div>
    <StopWatch label="Stop watch 1"/>
    <br/>
    <StopWatch label="Stop watch 2"/>
  </div>
)
