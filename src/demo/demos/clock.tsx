import { h, component, useTime, Ctrl } from '../../modules/root/main/index'

const Clock = component({
  displayName: 'Clock',
  memoize: true,

  init(c) {
    const $time = useTime(c)

    return () => (
      <div>
        Current time: {$time.value.toLocaleTimeString()}
      </div>
    )
  }
})

export default <Clock />
