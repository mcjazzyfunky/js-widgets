import Ref from './types/Ref'

export default function asRef<T>(getter: () => T): Ref<T> {
  return {
    get current() {
      return getter()
    }
  }
}
