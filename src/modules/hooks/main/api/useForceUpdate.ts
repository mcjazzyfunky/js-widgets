import { Ctrl } from '../../../core/main/index'

export default function useForceUpdate(c: Ctrl) {
  const [, setState] = c.handleState(false)
  
  return () => setState(state => !state) 
}
