import Component from './Component'
import AltComponent from './Component
import Props from './Props'
import Key from './Key'

interface VirtualElement {
  type: string | Component | AltComponent,
  props: Props | null,
  key: Key,
}

export default VirtualElement
