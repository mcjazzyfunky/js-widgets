import Props from '../../api/types/Props'
import Key from '../../api/types/Key'
import VElement from '../../api/types/VElement'
import StatelessComponentMeta from './StatefulComponentMeta'

type StatelessComponent<P extends Props = {}> = {
  (props?: P & { key?: Key }, ...children: any[]): VElement<P>
  readonly meta: StatelessComponentMeta<P>
}

export default StatelessComponent
