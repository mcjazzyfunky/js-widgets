import { h, Component } from '../../modules/core/main/index'
import { useEffect } from '../../modules/hooks/main/index'
import { classic as component } from '../../modules/variants/main/index'

type CounterProps = {
  initialValue?: number,
  label?: string
}

const Counter: Component<CounterProps> = component('Counter', {
  defaultProps: {
    initialValue: 0,
    label: 'Counter'
  },

  initState: props => ({
    count: props.initialValue
  }),

  main({ c, props, state, setState }) {
    const
      onIncrement = () => setState({ count: state.count + 1 }),
      onDecrement = () => setState({ count: state.count - 1 })

    useEffect(c, () => {
      console.log('Updated - count:', state.count)
    })

    return () => (
      <div>
        <label>{props.label}: </label>
        <button onClick={onDecrement}>-</button>
        <span> {state.count} </span>
        <button onClick={onIncrement}>+</button>
      </div>
    )
  }
})

export default <Counter/>
