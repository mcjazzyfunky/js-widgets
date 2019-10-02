import { h, Component, context, Ctrl } from '../../modules/core/main/index'
import { useEffect, useTime } from '../../modules/hooks/main/index'
import { classic as component } from '../../modules/variants/main/index'

const LocaleCtx = context({
  displayName: 'LocaleCtx',
  defaultValue: 'en'
})

type CounterProps = {
  initialValue?: number,
  label?: string
}

const Counter: Component<CounterProps> = component({
  displayName: 'Counter',

  defaultProps: {
    initialValue: 0,
    label: 'Counter'
  },

  context: {
    locale: LocaleCtx
  },

  initState: props => ({
    count: props.initialValue
  }),

  main(c, props, state, ctx, update) {
    const
      onIncrement = () => update({ count: state.count + 1 }),
      onDecrement = () => update({ count: state.count - 1 })

    useEffect(c, () => {
      console.log('Updated - count:', state.count)
    })

    return () => (
      <div>
        <div>Locale: {ctx.locale}</div>
        <br/>
        <label>{props.label}: </label>
        <button onClick={onDecrement}>-</button>
        <span> {state.count} </span>
        <button onClick={onIncrement}>+</button>
      </div>
    )
  }
})

export default <Counter/>
