import { h, context, component, createRef } from '../../modules/core/main/index'
import { useContext, useEffect, useProps, useOnMount, useStateObject } from '../../modules/hooks/main/index'
import { proxify } from '../../modules/util/main/index'

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
      startTimeRef = createRef(0),
      
      [getState, setState] = useStateObject(c, {
        time: 0,
        running: false
      }),

      [props, state, data, using] = proxify(getProps, getState, {
        theme: () => 'default' //useContext(c, ThemeCtx) // TODO
      })

    useEffect(c, () => {
      console.log(`Using theme "${data.theme}" for ${props.name}`)
    }, () => [data.theme])

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
      startTimeRef.current = 0
      setState({ running: false, time: 0 })
    }

    useEffect(c, () => {
      if (state.running) {
        startTimeRef.current = Date.now()
        console.log(`Starting "${props.name}"`)

        const interval = setInterval(() => {
          setState({ time: Date.now() - startTimeRef.current! }) // TODO
        }, 103);

        return () => {
          console.log(`Stopping "${props.name}"`)
          clearInterval(interval)
        }
      }
    }, () => [state.running])

    return using((props, state, data) =>
      <div className={`theme-${data.theme}`}>
        <h4>{props.name}</h4>
        <div>Time: {state.time}</div>
        <button onClick={startStop}>
          { state.running ? 'Stop' : 'Start'}
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
