import { createElement, component } from '../../modules/core/main/index'
import { useOnMount, useOnUpdate, usePropsProxy, useStateProxy } from '../../modules/hooks/main/index'

type CounterProps = {
  label?: string,
  initialValue?: number
}

const Counter = component<CounterProps>('Counter')
  .memoize()
  .defaultProps({
    initialValue: 0,
    label: 'Counter'
  })
  .init(c => {
    const
      props = usePropsProxy(c),
      [state, update] = useStateProxy(c, { count: props.initialValue }),
      onIncrement = () => update({ count: state.count! + 1 })

    useOnMount(c, () => {
      console.log('Component has been mounted', )
    })

    useOnUpdate(c, () => {
      console.log(`Component has been rendered - ${props.label}: ${state.count}`)
    })
    
    return () => {
      return (
        <div>
          <label>{props.label + ': '}</label> 
          <button onClick={onIncrement}>
            {state.count}
          </button>
        </div>
      )
    }
  })

export default <Counter/>
