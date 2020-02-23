import { Fragment as DyoFragment } from 'dyo'
import h from './h'
import setHiddenProp from '../internal/setHiddenProp'
import component from './component'
import Children from './types/Children'
import Component from './types/Component'

type FragmentProps = {
  children?: Children
}

const Fragment: Component<FragmentProps> = component({
  name: 'Fragment',

  render(props) {
    const { children, ...propsWithoutChildren } = props

    return h(Fragment, propsWithoutChildren, ...children)
  }
})

setHiddenProp(Fragment, '__type', DyoFragment)

export default Fragment
