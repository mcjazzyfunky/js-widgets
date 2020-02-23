type ContextMeta<T> = {
  readonly type: 'context',
  readonly name: string,
  readonly default: T
}

export default ContextMeta
