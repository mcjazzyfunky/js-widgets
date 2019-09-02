import { h, component } from '../../modules/core/main/index'
import { div } from '../../modules/html/main/index'

type SayHelloProps = {
  name?: string
}

const SayHello = component<SayHelloProps>({
  displayName: 'SayHello',
  memoize: true,

  defaultProps: {
    name: 'world'
  },

  render({ name }) {
    return <div>Hello, {name}</div>
  }
})

export default
  div(
    SayHello(),
    SayHello({ name: "Jane Doe" }))
