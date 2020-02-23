import { Context, Ctrl } from '../../../core/main/index'

export default function useContext<T>(c: Ctrl, ctx: Context<T>): { value: T } {
  const
    getContext = c.consumeContext(ctx),
    ret = { value: getContext() }
console.log('A')
  c.beforeUpdate(() => {
      console.log('B', getContext())
    ret.value = getContext()
  })

  return ret
}
