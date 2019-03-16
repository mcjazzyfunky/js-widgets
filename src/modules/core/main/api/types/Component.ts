import Context from './Context'
import Props from './Props'
import Methods from './Methods'

type Listener = () => void
type Unsubscribe = () => void

export default interface Component<P extends Props = {}> {
  getProps(): P,
  handleState<T>(initialValue: T): [() => T, (newValue: T) => void],
  consumeContext<T>(ctx: Context<T>): () => T,
  onUpdate(listener: Listener): Unsubscribe,
  onDispose(listener: Listener): Unsubscribe,
  // plus some more methods (mostly for lifecycle)
}
