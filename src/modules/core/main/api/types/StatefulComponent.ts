import Props from '../../api/types/Props'
import Key from '../../api/types/Key'
import VElement from '../../api/types/VElement'
import StatefulComponentMeta from './StatefulComponentMeta'

type StatefulComponent<P extends Props = {}> = {
  (props?: P & { key?: Key }, ...children: any[]): VElement<P>
  readonly meta: StatefulComponentMeta<P>
}

export default StatefulComponent
