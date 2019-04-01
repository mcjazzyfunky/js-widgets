import { createElement, defineComponent } from '../../../modules/core/main/index'
import { useOnMount, useOnUpdate, useState } from '../../../modules/hooks/main/index'
import { prepareView } from '../../../modules/util/main/index'

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
      props = getProps(),
      count = props.initialValue

    const
      [getCount, setCount] = useState(c, count),
      onIncrement = () => setCount(count => count! + 1),
      
      view = prepareView(() => {
        props = getProps()
        count = getCount()
      })

    useOnMount(c, () => {
      console.log('Component has been mounted - props:', props)
    })

    useOnUpdate(c, () => {
      console.log('Component has been rendered - props:', props, ' - count value:', count)
    })
    
    return view(() => {
      return (
        <div>
          <label>{props.label + ': '}</label> 
          <button onClick={onIncrement}>
            {count}
          </button>
        </div>
      )
    })
  }
})

export default <Counter/>
