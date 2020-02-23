import { render } from 'dyo'
import { VElement } from '../modules/core/main/index'

let counter = 0

export function demo(content: VElement<any>) {
  return () => {
    const elem = document.createElement('div')

    render(content, elem)

    return elem
  }
}
