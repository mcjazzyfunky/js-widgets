import { h, component } from '../../modules/core/main/index'
import { useOnMount, useOnUpdate, useProps } from '../../modules/hooks/main/index'
import { wrap, prepareActions } from '../../modules/util/main/index'
import { Spec } from 'js-spec'

type CounterProps = {
  initialValue?: number,
  label?: string
}

type CounterState = {
  count: number
}

const useCounterActions = prepareActions({
  displayName: 'CounterActions',

  initState: (initialValue: number) => ({
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
      getProps = useProps(c, {
        initialValue: 0,
        label: 'Counter'
      }),

      [actions, getState] = useCounterActions(c, getProps().initialValue),

      [v, using] = wrap({
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
