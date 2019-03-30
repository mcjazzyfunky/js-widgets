import { createElement, defineComponent } from '../../../modules/core/main/index'
import { useOnMount, useOnUpdate, useState } from '../../../modules/hooks/main/index'

type CounterProps = {
  label?: string,
  initialValue?: number
}

const Counter = defineComponent<CounterProps>({
  displayName: 'Counter',
  memoize: true,

  defaults: {
    initialValue: 0,
    label: 'Counter'
  },

  init(c, getProps) {
    let
      props: CounterProps,
      count: number | undefined

    const
      [getCount, setCount] = useState(c, getProps().initialValue),
      onIncrement = () => setCount(count => count! + 1)

    useOnMount(c, () => {
      console.log('Component has been mounted - props:', props)
    })

    useOnUpdate(c, () => {
      console.log('Component has been rendered - props:', props, ' - count value:', count)
    })
    
    return () => {
      [props, count] = [getProps(), getCount()]

      return (
        <div>
          <label>{props.label + ': '}</label> 
          <button onClick={onIncrement}>
            {count}
          </button>
        </div>
      )
    }
  }
})

export default <Counter/>
