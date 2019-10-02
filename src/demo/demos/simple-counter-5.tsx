import { h, Component, context, Ctrl } from '../../modules/core/main/index'
import { useEffect } from '../../modules/hooks/main/index'
import { classic as component } from '../../modules/variants/main/index'

const LocaleCtx = context({
  displayName: 'LocaleCtx',
  defaultValue: 'en'
})

const useDummy = (c: Ctrl) => () => 'Juhu'


type CounterProps = {
  initialValue?: number,
  label?: string
}

const Counter: Component<CounterProps> = component('Counter', {
  defaultProps: {
    initialValue: 0,
    label: 'Counter'
  },

  contexts: {
    locale: LocaleCtx,
    dummy: useDummy
  },

  initState: props => ({
    count: props.initialValue
  }),

  main(c, props, state, contexts, update) {
    const
      onIncrement = () => update({ count: state.count + 1 }),
      onDecrement = () => update({ count: state.count - 1 })

    useEffect(c, () => {
      console.log('Updated - count:', state.count)
    })

    return () => (
      <div>
        {contexts.dummy}
        <label>{props.label}: </label>
        <button onClick={onDecrement}>-</button>
        <span> {state.count} </span>
        <button onClick={onIncrement}>+</button>
      </div>
    )
  }
})

export default <Counter/>
