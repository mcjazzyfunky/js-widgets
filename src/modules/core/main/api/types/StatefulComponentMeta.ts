import Props from '../../api/types/Props'

type StatefulComponentMeta<T extends Props> = {
  readonly type: 'component',
  readonly name: string,
  readonly stateful: true,
  readonly memo: boolean // TODO
  readonly init: Function // TODO
}

export default StatefulComponentMeta
