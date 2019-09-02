import h from './h'
import VirtualElement from './types/VirtualElement'
import StatelessComponentMeta from './types/StatelessComponentMeta'
import Component from './types/Component'

let createFragment: (...args: any[]) => VirtualElement = null!

type FragmentProps = {
  key?: number | string
}

function Fragment(props?: FragmentProps, ...args: any[]): VirtualElement {
  if (!createFragment) {
    createFragment = h.bind(null, Fragment as any)
  }

  return createFragment(...args)
}

export default Fragment as Component<FragmentProps>


const meta: StatelessComponentMeta<{ key?: any }> = Object.freeze({
  displayName: 'Fragment',
  memoize: false,
  type: 'statelessComponent' as any,
  defaultProps: null,
  validate: null,
  render: Fragment
})

Object.defineProperty(Fragment, 'meta', {
  value: meta
})
