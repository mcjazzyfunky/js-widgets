import { demo } from './utils'
import { component, h } from '../modules/core/main/index'
import * as Spec from 'js-spec/validators'

type SayHelloProps = {
  salutation?: string,
  name?: string
}

const SayHello = component<SayHelloProps>({
  name: 'Hello',

  validate: Spec.checkProps({
    optional: {
      salutation: Spec.string,
      name: Spec.string
    }
  }),

  render({
    salutation = 'Hello',
    name = 'world'
  }) {
    return <div>{salutation} {name}!</div>
  }
})

const SayHello2 = component<SayHelloProps>('SayHello2', props => {
  return <div>{props.salutation} {props.name}!</div>
})

const SayHello3 = component<SayHelloProps>('SayHello2', {
  defaults: {
    salutation: 'Wuzzup',
    name: 'Dude'
  }
}, props => {
  return <div>{props.salutation} {props.name}!</div>
})


export default { title: 'HelloWorld' }

export const sayHello1 = demo(<SayHello/>)
export const sayHello2 = demo(<SayHello salutation="Hi" name="dude"/>)
export const sayHello3 = demo(SayHello({ salutation: 'Howdy', name: 'stranger' }))
export const sayHello4 = demo(SayHello2({ salutation: 'Hey', name: 'you' }))
export const sayHello5 = demo(SayHello3())