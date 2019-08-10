interface ContextConfig<T> {
  displayName: string,
  validate?: (value: T) => boolean | null | Error
  defaultValue: T
}

export default ContextConfig
