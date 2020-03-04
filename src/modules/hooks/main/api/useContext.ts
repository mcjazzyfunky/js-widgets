import { Context, Ctrl } from '../../../core/main/index'

export default function useContext<T>(c: Ctrl, ctx: Context<T>): { value: T } {
  const
    getContext = c.consumeContext(ctx),
    ret = { value: getContext() }
  
  c.beforeUpdate(() => {
    ret.value = getContext()
  })

  return ret
}
