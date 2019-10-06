import { Ctrl, Context } from '../../../core/main/index'
import px from './px'

export default function useContext<T>(c: Ctrl, ctx: Context<T>) {
  px.bindValue(c.consumeContext(ctx))
}
