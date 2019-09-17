import { h, component } from '../../modules/core/main/index'
import { useOnMount, useOnUpdate, useProps, useState } from '../../modules/hooks/main/index'
import { wrapGetters, defineComponentStore } from '../../modules/util/main/index'
import { Spec } from 'js-spec'

type CounterProps = {
  initialValue?: number,
  label?: string
}

type CounterState = {
  count: number
}

const useCounterState = defineComponentStore({
  initState: (initialValue: number): CounterState => ({
    count: initialValue
  }),

  initActions: (state: CounterState, setState) => ({
    incrementCount() {
      setState({ count: state.count + 1 })
    },

    decrementCount() {
      setState({ count: state.count - 1 })
    }
  })
})

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
      getProps = useProps(c),
      [getState, actions] = useCounterState(c, getProps().initialValue),

      [v, using] = wrapGetters({
        props: getProps,
        state: getState
      }),

      onIncrement = () => actions.incrementCount(),
      onDecrement = () => actions.decrementCount()

    useOnMount(c, () => {
      console.log('Component has been mounted')

      return () => console.log('Component will be unmounted')
    })

    useOnUpdate(c, ()=> {
      console.log(`Component has been rendered - ${v.props.label}: ${v.state.count}`)
    })

    return using(({ props, state }) => {
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
    })
  }
})

export default <Counter/> 
