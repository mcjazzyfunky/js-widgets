import { h, component } from '../../modules/core/main/index'
import { useOnUpdate, usePropsProxy, useStateProxy } from '../../modules/hooks/main/index'
import { Spec } from 'js-spec'

type CounterProps = {
  initialValue?: number,
  label?: string
}

const Counter = component<CounterProps>({
  displayName: 'Counter',
  memoize: true,

  validate: Spec.checkProps({
    optional: {
      initialValue: Spec.integer,
      label: Spec.string
    }
  }),

  init(c) {
    const
      [props] = usePropsProxy(c, {
        initialValue: 0,
        label: 'Counter'
      }),

      [state, setState] = useStateProxy(c, {
        count: props.initialValue
      }),

      onIncrement = () => setState({ count: state.count + 1 }),
      onDecrement = () => setState({ count: state.count - 1 })

    useOnUpdate(c, () => {
      console.log(`Component has been rendered - ${props.label}: ${state.count}`)
    })

    return () => {
      return (
        <div>
          <label>{props.label + ': '}</label> 
          <button onClick={onDecrement}>
            -
          </button>
          <span> {state.count} </span>
          <button onClick={onIncrement}>
            +
          </button>
        </div>
      )
    }
  }
})

export default <Counter/> 
