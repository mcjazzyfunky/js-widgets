import { h, component, Ctrl } from '../../modules/core/main/index'
import { useOnUnmount, useState } from '../../modules/hooks/main/index'

function useTimer(c: Ctrl, milliseconds: number = 1000) {
  const [getTime, setTime] = useState(c, new Date())

  let intervalId: any = null

  intervalId = setInterval(() => {
    setTime(new Date())
  }, milliseconds)

  useOnUnmount(c, () => {
    clearInterval(intervalId)
    intervalId = null
  })

  return getTime
}

const Clock = component({
  displayName: 'Clock',
  memoize: true,

  init(c) {
    const getTime = useTimer(c)

    return () => (
      <div>
        Current time: {getTime().toLocaleTimeString()}
      </div>
    )
  }
})

export default <Clock />
