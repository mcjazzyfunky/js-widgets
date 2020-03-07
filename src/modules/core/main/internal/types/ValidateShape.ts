type ValidateShape<T, Shape> =
  T extends Shape
    ? Exclude<keyof T, keyof Shape> extends never ? T : never
    : never

export default ValidateShape
