export default function toGetter<T>(it: T | (() => T)) {
  return typeof it === 'function' ? it : () => it
}
