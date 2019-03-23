import { createElement, defineComponent } from '../../../modules/core/main/index'
import { useOnUnmount, useState } from '../../../modules/hooks/main/index'

const StopWatch = defineComponent({
  displayName: 'StopWatch',

  init(c) {
    let timerId: number

    const
      [getTime, setTime] = useState(c, 0),
      [isRunning, setRunning] = useState(c, false),

      onStartStop = () => {
        if (isRunning()) {
          stopTimer()
        } else {
          startTimer()
        }
      },

      onReset = () => resetTimer()

    useOnUnmount(c, () => {
      stopTimer()
    })
    
    function startTimer() {
      if (!isRunning()) {
        const startTime = Date.now() - getTime() 

        timerId = window.setInterval(() => {
          setTime(Date.now() - startTime)
        }, 10)

        setRunning(true)
      }
    }

    function stopTimer() {
      if (isRunning()) {
        clearInterval(timerId)
        timerId = null
        setRunning(false)
      }
    }

    function resetTimer() {
      stopTimer()
      setTime(0)
    }

    return () =>
      <div>
        <div>Time: {getTime()}</div>
        <br/>
        <button onClick={onStartStop}>
          { isRunning() ? 'Stop' : 'Start'}
        </button>
        {' '}
        <button onClick={onReset}>
          Reset
        </button>
      </div>
  }
})

export default <StopWatch/>
