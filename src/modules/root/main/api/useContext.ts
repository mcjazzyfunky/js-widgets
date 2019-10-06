import { Ctrl, Context } from '../../../core/main/index'
import useBoundValue from './useBoundValue'

export default function useContext<T>(c: Ctrl, ctx: Context<T>) {
  return useBoundValue(c, c.consumeContext(ctx))
}
