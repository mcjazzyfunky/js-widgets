import { demo } from './utils'
import { component, h } from '../modules/core/main/index'
import { useValue } from '../modules/hooks/main/index'

export default { title: 'Counters' }

const SimpleCounter = component({
  name: 'Counter',

  defaults: {
    initialCount: 0,
    label: 'Counter'
  },

  main(c, props) {
    const
      [count, setCount] = useValue(c, props.initialCount),
      onIncrement = () => setCount(it => it + 1)

    return () => (
      <div>
        <label>{props.label}: </label>
        <button onClick={onIncrement}>
          {count.value}
        </button>
      </div>
    )
  }
})


const Test = component({
  name: 'Test',

  render() {
    return <div>Test</div>
  }
})

export const simpleCounter1 = demo(<SimpleCounter/>)
export const simpleCounter2 = demo(<SimpleCounter label="Custom counter" initialCount={100}/>)