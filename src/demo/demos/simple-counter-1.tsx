import { h, component, useOnMount, useOnUpdate, useValue, Component }
  from '../../modules/root/main/index'

import { Spec } from 'js-spec'

type CounterProps = {
  initialValue?: number,
  label?: string
}

const Counter: Component<CounterProps> = component({
  displayName: 'Counter',
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

  main(c, props) {
    const
      [count, setCount] = useValue(c, props.initialValue),
      onIncrement = () => setCount(count.value + 1)

    useOnMount(c, () => {
      console.log('Component has been mounted')

      return () => console.log('Component will be unmounted')
    })

    useOnUpdate(c, () => {
      console.log(`Component has been rendered - ${props.label}: ${count.value}`)
    })

    return () => {
      return (
        <div>
          <label>{props.label}: </label> 
          <button onClick={onIncrement}>
            {count}
          </button>
        </div>
      )
    }
  }
})

export default <Counter/> 
