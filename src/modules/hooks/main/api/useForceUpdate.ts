import { Component } from '../../../core/main/index'

export default function useForceUpdate(c: Component) {
  return () => c.forceUpdate()
}
