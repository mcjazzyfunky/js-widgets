import { h, component } from '../../modules/core/main/index'
import { useOnMount, useOnUpdate, useProps, useState } from '../../modules/hooks/main/index'
import { wrapGetters } from '../../modules/util/main/index'

type CounterProps = {
  label?: string,
  initialValue?: number
}

const Counter = component<CounterProps>('Counter')({
  memoize: true,

  defaultProps: {
    initialValue: 0,
    label: 'Counter'
  },

  init(c) {
    const
      getProps = useProps(c),
      [getCount, setCount] = useState(c, getProps().initialValue),

      [$, using] = wrapGetters({
        props: getProps,
        count: getCount
      }),

      onIncrement = () => setCount(it => it! + 1)

    useOnMount(c, () => {
      console.log('Component has been mounted')
    })

    useOnUpdate(c, ()=> {
      console.log(`Component has been rendered - ${$.props.label}: ${$.count}`)
    })

    return using(({ props, count }) => {
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
