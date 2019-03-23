import { createElement, defineComponent } from '../../../modules/core/main/index'
import { useOnMount, useOnUpdate, useProps, useState } from '../../../modules/hooks/main/index'
import { Spec } from 'js-spec'

type CounterProps = {
  label?: string,
  initialValue?: number
}

const Counter = defineComponent<CounterProps>({
  displayName: 'Counter',

  properties: {
    initialValue: {
      type: Number,
      defaultValue: 0,
      validate: Spec.integer
    },

    label: {
      type: String,
      defaultValue: 'Counter'
    }
  },

  init(c) {
    const
      getProps = useProps(c),
      [getCount, setCount] = useState(c, getProps().initialValue),
      onIncrement = () => setCount(count => count + 1)

    useOnMount(c, () => {
      console.log('Component has been mounted.')
    })

    useOnUpdate(c, () => {
      console.log('Component has been rendered.')
    })

    return props => {
      return (
        <div>
          <label>{props.label + ': '}</label> 
          <button onClick={onIncrement}>
            {getCount()}
          </button>
        </div>
      )
    }
  }
})

export default Counter()
