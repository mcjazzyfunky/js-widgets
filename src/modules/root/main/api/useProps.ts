import { Ctrl, Props } from '../../../core/main/index'
import useBoundData from './useBoundData'
import PickOptionalProps from '../internal/types/PickOptionalProps'

export default function useProps<P extends Props>(
  c: Ctrl<P>,
  defaultProps?: Partial<PickOptionalProps<P>>
): [P, () => P] {
  const
    getProps = c.consumeProps(),

    getDefaultedProps = defaultProps
      ? () => Object.assign({}, defaultProps, getProps())
      : getProps

  return [useBoundData(c, getDefaultedProps), getDefaultedProps]
}