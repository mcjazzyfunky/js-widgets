import { h, component } from '../../modules/core/main/index'
import { useOnMount, useOnUpdate, useProps, useTime, useStateObject } from '../../modules/hooks/main/index'
import { proxify } from '../../modules/util/main/index'

type CounterProps = {
  label?: string,
  initialValue?: number
}

const Counter = component<CounterProps>('Counter')({
  memoize: true,

  defaultProps: {
    initialValue: 0,
    label: 'Counter'
  },

  init(c) {
    const
      getProps = useProps(c),

      [getState, setState] = useStateObject(c, {
        count: getProps().initialValue
      }),

      [props, state, data, using] = proxify(getProps, getState, {
        time: useTime(c) 
      } as any),

      onIncrement = () => setState({ count: state.count + 1 })

    useOnMount(c, () => {
      console.log('Component has been mounted', )
    })

    useOnUpdate(c, () => {
      const timeString = data.time.toLocaleTimeString()

      console.log(`Component has been rendered [${timeString}]- `
          + `${props.label}: ${state.count}`)
    })
    
    return (using as any)((props: any, state: any, data: any) => { // TODO!!!
      const timeString = data.time.toLocaleTimeString()
      
      return (
        <div>
          <div>
            <label>{props.label + ': '}</label> 
            <button onClick={onIncrement}>
              {state.count}
            </button>
          </div>
          <br/>
          <div>
            Current time: {timeString}
          </div>
        </div>
      )
    })
  }
})

export default <Counter/>
