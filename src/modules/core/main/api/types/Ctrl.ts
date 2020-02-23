import Context from './Context'

type Ctrl = {
  isMounted(): boolean,
  update(runOnceBeforeUpdate?: () => void): void,
  consumeContext<T>(ctx: Context<T>): () => T,
  afterMount(action: () => void): void,
  beforeUpdate(action: () => void): void,
  afterUpdate(action: () => void): void,
  beforeUnmount(action: () => void): void
}

export default Ctrl
