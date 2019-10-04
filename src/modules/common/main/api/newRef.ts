export default function newRef<T>(initialValue: T) {
  return { current: initialValue }
}