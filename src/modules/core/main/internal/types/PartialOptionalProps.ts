type OmitNeverProps<T extends object> = Pick<T, {
  [K in keyof T]: T[K] extends never ? never : K
}[keyof T]>

type PickOptionalProps<T extends object> = OmitNeverProps<{
  [K in keyof T]: T extends Record<K, T[K]> ? never : T[K]
}>

type PartialOptionalProps<T extends Object> = Partial<PickOptionalProps<T>>

export default PartialOptionalProps
