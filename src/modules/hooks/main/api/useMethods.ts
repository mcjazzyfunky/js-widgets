import { Ctrl, Ref } from '../../../core/main/index'

// TODO!!!!! - this is not working at all!
export default function useMethods<M extends Record<string, (...args: any[]) => any>>(
  c: Ctrl,
  getRef: () => Ref<M> | undefined,
  methods: M
) {
  const ref = getRef()

  if (ref && typeof ref === 'object') {
    ref.current = methods
  }
}
