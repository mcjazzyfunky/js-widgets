export default function getterOf<T>(it: T) {
  return () => it
}
