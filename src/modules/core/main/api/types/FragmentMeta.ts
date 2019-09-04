import Props from './Props'
import VirtualNode from './VirtualNode'
import Ctrl from './Ctrl'
import PickOptionalProps from '../../internal/types/PickOptionalProps'

type FragmentProps = {
  key?: string | number | null,
  children?: VirtualNode
}

type FragmentMeta = {
  displayName: 'Fragment',
  variant: 'Fragment',
  validate?(props: FragmentProps): boolean | null | Error,
  render(props: FragmentProps): VirtualNode
}

export default FragmentMeta
