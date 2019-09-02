import { Ctrl, Context } from '../../../core/main/index'

export default function useProps<P>(c: Ctrl<P>): () => P {
  return () => c.getProps()
}
