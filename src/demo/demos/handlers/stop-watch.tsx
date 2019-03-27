import { createElement, defineComponent } from '../../../modules/core/main/index'
import { withState, withOnUnmount } from '../../../modules/handlers/main/index' 
import { memoize } from '../../../modules/util/main/index'

const StopWatch = defineComponent({
  displayName: 'StopWatch',

  init(c) {
    let interval = 0

    const
      [getTime, setTime] = withState(c, (time: number) => time),
      [getRunning, setRunning] = withState(c, (running: boolean) => running),

      createStartStopListener = memoize((running: boolean, time: number) =>
        () => {
          if (running) {
            stopTimer(running)
          } else {
            startTimer(running, time)
          }
        }),

      createResetListener = memoize((running: boolean) =>
        () => resetTimer(running)),

      stopTimerOnUnmount = withOnUnmount(c, (running: boolean) => {
        return stopTimer(running)
      })
    
    function startTimer(running: boolean, time: number) {
      if (!running) {
        const startTime = Date.now() - time

        interval = window.setInterval(() => {
          setTime(Date.now() - startTime)
        }, 10)

        setRunning(true)
      }
    }

    function stopTimer(running: boolean) {
      if (running) {
        clearInterval(interval)
        interval = 0 
        setRunning(false)
      }
    }

    function resetTimer(running: boolean) {
      stopTimer(running)
      setTime(0)
    }

    return () => {
      const
        time = getTime(0),
        running = getRunning(false)

      stopTimerOnUnmount(running)

      return (
        <div>
            <div>Time: {time}</div>
            <br/>
            <button onClick={createStartStopListener(running, time)}>
            { running ? 'Stop' : 'Start'}
            </button>
            {' '}
            <button onClick={createResetListener(running)}>
            Reset
            </button>
        </div>
      )
    }
  }
})

export default StopWatch()
