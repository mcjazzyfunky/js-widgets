import Component from './Component'

export default interface Context<T> {
  Provider: Component<{ value: T }>,
  Consumer: Component<{}>
}
