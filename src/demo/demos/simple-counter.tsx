import { createElement, defineComponent } from '../../modules/core/main/index'
import { withState } from '../../modules/handlers/main/index'

type CounterProps = {
  label?: string,
  initialValue?: number
}

const Counter = defineComponent<CounterProps>({
  displayName: 'Counter',

  init(c) {
    const
      //[useCount, setCount] = withState(c, (n: number) => n),
      [getCount, setCount] = c.handleState(0),
      onIncrement = () => setCount(count => count + 1)

    return ({ label = 'Counter', initialValue = 0 }) => {
      //const count = useCount(initialValue)
      const count = getCount()

      return (
        <div>
          <label>{label + ': '}</label> 
          <button onClick={onIncrement}>
            {count}
          </button>
        </div>
      )
    }
  }
})

export default Counter()
/*
import { defineComponent } from '../../modules/core/main/index'
import { useEffect, useState } from '../../modules/use/main/index'
import { button, div, label } from '../../modules/html/main/index'

type CounterProps = {
  label?: string,
  initialValue?: number
}

const Counter = defineComponent<CounterProps>({
  displayName: 'Counter',

  defaultProps: {
    label: 'Counter',
    initialValue: 0
  },

  init(c) {
    const
      [getCount, setCount] = useState<number>(c),
      onIncrement = () => setCount(it => it + 1),

      logInfo = useEffect(c, (count: number) => {
        console.log(count)
      })

    return props => {
      const count = getCount(props.initialValue)

      logInfo(count)

      return (
        div(null,
          label(null, props.label + ': '),
          button({ onClick: onIncrement }, count))
      )
    }
  }
})

export default Counter()
*/