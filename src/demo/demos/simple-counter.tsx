import { h, component } from '../../modules/core/main/index'
import { useOnMount, useOnUpdate, useProps, useStateObject } from '../../modules/hooks/main/index'
import { proxify } from '../../modules/util/main/index'
import { Spec } from 'js-spec'

type CounterProps = {
  initialValue?: number,
  label?: string
}

const Counter = component<CounterProps>('Counter')({
  memoize: true,

  validate: Spec.checkProps({
    optional: {
      initialValue: Spec.integer,
      label: Spec.string
    }
  }),

  defaultProps: {
    initialValue: 0,
    label: 'Counter'
  },

  init(c) {
    const
      [getState, setState] = useStateObject(c, props => ({
        count: props.initialValue
      })),

      [props, state, using] = proxify(useProps(c), getState),
      onIncrement = () => setState({ count: state.count + 1 })

    useOnMount(c, () => {
      console.log('Component has been mounted')

      return () => console.log('Component will be unmounted')
    })

    useOnUpdate(c, ()=> {
      console.log(`Component has been rendered - ${props.label}: ${state.count}`)
    })

    return using((props, state) => {
      return (
        <div>
          <label>{props.label + ': '}</label> 
          <button onClick={onIncrement}>
            {state.count}
          </button>
        </div>
      )
    })
  }
})

export default <Counter/> 
