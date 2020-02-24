import { demo } from './utils'
import { component, h, Component } from '../modules/core/main/index'

type SayHelloProps = {
  salutation?: string,
  name?: string
}

const SayHello: Component<SayHelloProps> = component({
  name: 'Hello',
 
  defaults: {
    salutation: 'Hello',
    name: 'world'
  },

  render(props) {
    return <div>{props.salutation} {props.name}!</div>
  }
})

export default { title: 'HelloWorld' }

export const sayHello1 = demo(<SayHello/>)
export const sayHello2 = demo(<SayHello salutation="Hi" name="dude"/>)
export const sayHello3 = demo(SayHello({ salutation: 'Howdy', name: 'stranger' }))