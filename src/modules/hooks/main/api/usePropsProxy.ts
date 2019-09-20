import { Ctrl, Props } from '../../../core/main/index'
import toProxy from '../../../util/main/api/toProxy'

export default function useProps<P extends Props>(c: Ctrl<P>): P {
  return toProxy(c.getProps)
}
