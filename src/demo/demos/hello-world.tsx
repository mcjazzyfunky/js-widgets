import { component } from '../../modules/core/main/index'
import { div } from '../../modules/html/main/index'
import { Spec } from 'js-spec'

type SayHelloProps = {
  name?: string
}

const SayHello = component<SayHelloProps>('SayHello')({
  memoize: true,

  validate: Spec.checkProps({
    optional: {
      name: Spec.string
    }
  }),

  defaultProps: {
    name: 'world'
  },

  render({ name }) {
    return div(null, `Hello, ${name}`)
  }
})

export default
  div(null,
    SayHello(),
    SayHello({ name: "Jane Doe" }))
