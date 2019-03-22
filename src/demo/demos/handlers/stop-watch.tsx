import { createElement, defineComponent } from '../../../modules/core/main/index'
import { withEffect, withState } from '../../../modules/handlers/main/index' 

const StopWatch = defineComponent({
  displayName: 'StopWatch',

  init(c) {
    let 
      timerId: any = null,
      startTime: number = 0

    const
      [useTime, setTime] = withState(c, (time: number) => time),
      [useRunning, setRunning] = withState(c, (running: boolean) => running),

      onStartStopBy = (running: boolean, startTimer: () => void) => {
        if (running) {
          stopTimer(running)
        } else {
          startTimer(running)
        }
      },

      onResetBy = (running: boolean) => resetTimer(running)

    useEffect(c, (running: boolean) => {
      return () => stopTimer(running)
    })
    
    function startTimer(running: boolean, time: number) {
      if (!running) {
        startTime = Date.now() - time

        timerId = setInterval(() => {
          setTime(Date.now() - startTime)
        }, 10)

        setRunning(true)
      }
    }

    function stopTimer(running: boolean) {
      if (running) {
        clearInterval(timerId.current)
        timerId.current = null
        setRunning(false)
      }
    }

    function resetTimer(running: boolean) {
      stopTimer(running)
      setTime(0)
    }

    return () => {
      const
        time = useTime(Date.now() - startTime),
        running = useRunning(false)

      return (
        <div>
            <div>Time: {time}</div>
            <br/>
            <button onClick={onStartStopBy(running)}>
            { running ? 'Stop' : 'Start'}
            </button>
            {' '}
            <button onClick={onReset}>
            Reset
            </button>
        </div>
      )
    }
  }
})

export default StopWatch()
