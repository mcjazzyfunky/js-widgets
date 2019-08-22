import { createElement, defineComponent } from '../../modules/core/main/index'
import { useOnMount, useOnUpdate, usePropsProxy, useStateProxy } from '../../modules/hooks/main/index'
import { buildDataProxy } from '../../modules/util/main/index'

type CounterProps = {
  label?: string,
  initialValue?: number
}

const Counter = defineComponent<CounterProps>({
  displayName: 'Counter',
  memoize: true,

  defaultProps: {
    initialValue: 0,
    label: 'Counter'
  },

  init(c) {
    const
      props = usePropsProxy(c),
      [state, update] = useStateProxy(c, { count: props.initialValue }),
      onIncrement = () => update({ count: (state as any).count + 1 })

    useOnMount(c, () => {
      console.log('Component has been mounted - props:', props())
    })

    useOnUpdate(c, () => {
      console.log('Component has been rendered - props:', props(), ' - state:', state())
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
  }
})

export default <Counter/>
