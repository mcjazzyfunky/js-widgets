import { Component } from '../../../core/main/index'

export default function useForceUpdate(c: Component) {
  const [, setState] = c.handleState(false)
  
  return () => setState(state => !state) 
}
