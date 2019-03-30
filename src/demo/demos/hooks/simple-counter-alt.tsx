import { createElement, defineComponent } from '../../../modules/core/main/index'
import { useOnMount, useOnUpdate, useProviders, useState } from '../../../modules/hooks/main/index'

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
    const
      [getCount, setCount] = useState(c, getProps().initialValue)

    let [props, count] = useProviders(c,
      [getProps, getCount],
      (a, b) => { props = a, count = b })

    const onIncrement = () => setCount(count => count! + 1)

    useOnMount(c, () => {
      console.log('Component has been mounted.')
    })

    useOnUpdate(c, () => {
      console.log('Component has been rendered - props:', props, ' - count value: ', count)
    })

    return () => {
      return (
        <div>
          <label>{props.label + ': '}</label> 
          <button onClick={onIncrement}>
            {count} instead of {getCount() }
          </button>
        </div>
      )
    }
  }
})

export default <Counter/>
