import { createElement, defineComponent } from '../../../modules/core/main/index'
import { useOnUnmount, useStateObject } from '../../../modules/hooks/main/index'
import { decorateView } from '../../../modules/util/main/index'

const StopWatch = defineComponent({
  displayName: 'StopWatch',

  init(c) {
    let
      interval = 0,
      state = { time: 0, running: false }

    const
      [getState, setState] = useStateObject(c, state),

      view = decorateView(null, () => {
        state = getState()
      }),

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
        const startTime = Date.now() - state.time

        interval = window.setInterval(() => {
          setState({ time: Date.now() - startTime })
        }, 10)

        setState({ running: true })
      }
    }

    function stopTimer() {
      if (state.running) {
        clearInterval(interval)
        interval = 0
        setState({ running: false })
      }
    }

    function resetTimer() {
      stopTimer()
      setState({ time: 0 })
    }

    return view(() =>
      <div>
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

export default <StopWatch/>
