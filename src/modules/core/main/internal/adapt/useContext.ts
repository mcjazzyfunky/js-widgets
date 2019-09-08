import { useContext } from 'dyo'

export default (ctx: any): any => {
  let ret

  const { Provider } = ctx

  ret = useContext(Provider)

  if (ret === undefined) {
    ret === Provider.__internal_defaultContextValue
  }

  return ret
}