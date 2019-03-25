import { createElement, defineComponent } from '../../../modules/core/main/index'
import { useMethods, useProps, useState } from '../../../modules/hooks/main/index'

type CounterProps = {
  label?: string,
  initialValue?: number,
  ref?: any // TODO
}

type CounterMethods = {
  reset(n: number): void
}

const Counter = defineComponent<CounterProps>({
  displayName: 'Counter',

  defaultProps: {
    label: 'Counter',
    initialValue: 0
  },

  init(c) {
    const
      getProps = useProps(c), 
      [getCount, setCount] = useState(c, getProps().initialValue!),
      onIncrement = () => setCount(it => it + 1),
      onDecrement = () => setCount(it => it - 1)

    useMethods(c, getProps().ref, {
      reset(n: number) {
        setCount(n)
      }
    })

    return props => (
      <div>
        <label>{props.label}: </label>
        <button onClick={onDecrement}>-</button>
        {` ${getCount()} `}
        <button onClick={onIncrement}>+</button>
      </div>
    )
  }
})

const Demo = defineComponent({
  displayName: 'Demo',

  init() {
    const
      counterRef = { current: null as any },
      onResetTo0 = () => counterRef.current.reset(0),
      onResetTo100 = () => counterRef.current.reset(100)

    return () => (
      <div>
        <Counter ref={counterRef}/>
        <br/>
        <div>
          <button onClick={onResetTo0}>Set to 0</button>
          {' '}
          <button onClick={onResetTo100}>Set to 100</button>
        </div>
      </div>
    )
  }
})

export default <Demo/>