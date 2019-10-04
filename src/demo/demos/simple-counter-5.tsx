import { h, component, context, useEffect, Component }
  from '../../modules/common/main/index'

const LocaleCtx = context({
  displayName: 'LocaleCtx',
  defaultValue: 'en'
})

type CounterProps = {
  initialValue?: number,
  label?: string
}

type CounterState = {
  count: number
}

type CounterDefaults = {
  initialValue: number,
  label: string
}

type CounterContext = {
  locale: typeof LocaleCtx
}

const HelloWorld = component({
  displayName: 'HelloWorld',

  context: {
    locale: LocaleCtx
  },

  render(props, ctx) {
    return <div>Hello world (locale: {ctx.locale})</div>
  }
})

const Counter: Component<CounterProps> = component({
  displayName: 'Counter',

  defaultProps: {
    initialValue: 0,
    label: 'Counter'
  },

  context: {
    locale: LocaleCtx
  },

  initState(props): CounterState {
    return {
      count: props.initialValue
    }
  },

  main(c, props, state, ctx, update) {
    const
      onIncrement = () => update({ count: state.count + 1 }),
      onDecrement = () => update({ count: state.count - 1 })

    useEffect(c, () => {
      console.log('Updated - count:', state.count)
    })

    return () => (
      <div>
        <div><HelloWorld/></div>
        <br/>
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
