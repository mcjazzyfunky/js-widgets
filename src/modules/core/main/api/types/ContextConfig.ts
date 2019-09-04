interface ContextConfig<T> {
  defaultValue: T
  validate?: (value: T) => boolean | null | Error
}

export default ContextConfig
