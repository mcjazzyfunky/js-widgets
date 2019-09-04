import Component from './Component'
import Props from './Props'
import Key from './Key'

interface VirtualElement {
  $kind: 'VirtualElement',
  type: string | Component,
  props: Props | null,
  key: Key,
}

export default VirtualElement
