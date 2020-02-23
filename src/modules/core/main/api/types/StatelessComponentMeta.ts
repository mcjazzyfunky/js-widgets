import Props from '../../api/types/Props'

type StatelessComponentMeta<P extends Props> = {
  readonly type: 'component',
  readonly name: string,
  readonly stateful: false,
  readonly memo: boolean // TODO
  readonly render: Function // TODO
}

export default StatelessComponentMeta
