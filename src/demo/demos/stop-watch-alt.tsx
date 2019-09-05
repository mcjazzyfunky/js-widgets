import { h, context, component } from '../../modules/core/main/index'
import { useContext, useEffect, useProps, useOnMount, useStateObject } from '../../modules/hooks/main/index'
import { createRef, toProxies } from '../../modules/util/main/index'

/* TODO
const ThemeCtx = context('ThemeCtx')({
  defaultValue: 'default'
})
*/

type StopWatchProps = {
  name?: string
}

const StopWatch = component<StopWatchProps>('StopWatch')({
  defaultProps: {
    name: 'Stop watch'
  },

  init(c) {
    const
      getProps = useProps(c),
      
      [getState, setState] = useStateObject(c, {
        time: 0,
        running: false
      }),

      [props, state, data, using] = toProxies(getProps, getState, {
        theme: () => 'default' //useContext(c, ThemeCtx) // TODO
      }),

      intervalIdRef = createRef(0)
    
    useEffect(c, () => {
      console.log(`Using theme "${data.theme}" for ${props.name}`)
    }, () => [data.theme])


    useOnMount(c, () => {
      console.log(`${props.name} has been mounted`)

      return () => {
        stopTimer()

        console.log(`${props.name} will be unmounted`)
      }
    })

    function onStartStop() {
      if (state.running) {
        stopTimer()
      } else {
        startTimer()
      }
    }

    function onReset() {
      resetTimer()
    }

    function startTimer() {
      if (!state.running) {
        console.log(`Started ${props.name}`)

        const startTime = Date.now() - state.time

        intervalIdRef.current = window.setInterval(() => {
          setState({ time: Date.now() - startTime })
        }, 107)

        setState({ running: true })
      }
    }

    function stopTimer() {
      if (state.running) {
        console.log(`Stopped ${props.name}`)

        clearInterval(intervalIdRef.current)
        intervalIdRef.current = 0
        setState({ running: false })
      }
    }

    function resetTimer() {
      stopTimer()
      setState({ time: 0 })
    }

    return using((props, state, data) =>
      <div className={`theme-${data.theme}`}>
        <h4>{props.name}</h4>
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
    <StopWatch name="Stop watch 1"/>
    <StopWatch name="Stop watch 2"/>
  </div>
)
