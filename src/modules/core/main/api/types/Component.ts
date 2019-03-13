import Context from './Context'
import Props from './Props'
import Methods from './Methods'

type Listener = () => void
type Unsubscribe = () => void

export default interface Component {
  handleState<T>(initialValue: T): [() => T, (newValue: T) => void],
  consumeContext<T>(ctx: Context<T>): () => T,
  onDidMount(listener: Listener): Unsubscribe,
  onDidUpdate(listener: Listener): Unsubscribe,
  onWillUnmount(listener: Listener): Unsubscribe,
  // plus some more methods (mostly for lifecycle)
}
