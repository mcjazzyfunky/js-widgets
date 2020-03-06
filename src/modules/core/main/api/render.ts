import VElement from './types/VElement'
import { render as dyoRender } from 'dyo'

export default function render(
  content: VElement<any>,
  target: HTMLElement | string
) {
  dyoRender(content, target)
}
