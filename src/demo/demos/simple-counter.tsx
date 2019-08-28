import { createElement, component } from '../../modules/core/main/index'
import { useGetters, useOnMount, useOnUpdate, useProps, useState } from '../../modules/hooks/main/index'

type CounterProps = {
  label?: string,
  initialValue?: number
}

const Counter = component<CounterProps>('Counter')
  .memoize()
  .defaultProps({
    initialValue: 0,
    label: 'Counter'
  })
  .init(c => {
    const
      getProps = useProps(c),
      [getCount, setCount] = useState(c, getProps().initialValue),
      using = useGetters(c, getProps, getCount),
      onIncrement = () => setCount(count => count! + 1)

    useOnMount(c, () => {
      console.log('Component has been mounted')
    })

    useOnUpdate(c, using((props, state) => {
      console.log('Component has been rendered - props:', props, ' - state:', state)
    }))

    return using((props, count) => {
      return (
        <div>
          <label>{props.label + ': '}</label> 
          <button onClick={onIncrement}>
            {count}
          </button>
        </div>
      )
    })
  })

export default <Counter/> 
