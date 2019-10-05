import { h, component, useTime, Ctrl } from '../../modules/root/main/index'

const Clock = component({
  displayName: 'Clock',
  memoize: true,

  init(c) {
    const getTime = useTime(c)

    return () => (
      <div>
        Current time: {getTime().toLocaleTimeString()}
      </div>
    )
  }
})

export default <Clock />
