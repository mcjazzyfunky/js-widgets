import h from './h'
import VirtualElement from './types/VirtualElement'
import FragmentMeta from './types/FragmentMeta'
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

const meta: FragmentMeta = Object.freeze({
  displayName: 'Fragment',
  variant: 'Fragment',
  validate: () => null, // TODO
  render: (props: FragmentProps) => h(Fragment, props) // TODO
})

Object.defineProperty(Fragment, 'meta', {
  value: meta
})
