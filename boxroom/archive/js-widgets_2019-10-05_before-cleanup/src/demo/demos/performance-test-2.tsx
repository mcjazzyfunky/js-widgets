import { h, component, VirtualElement }
  from '../../modules/core/main/index'

  import { useOnMount, useForceUpdate, useProps }
  from '../../modules/hooks/main/index'

const prefs = {
  framesPerSecond: 240,
  colors: ['red', 'yellow', 'orange'],
  tileWidth: 5,
  columnCount: 20,
  rowCount: 20
}

type TileProps = {
  color?: string,
  width?: number
}

const Tile = component<TileProps>({
  displayName: 'Tile',

  render({
    color = 'white',
    width = 3
  }) {
    const
      style = {
        float: 'left',
        width: width + 'px',
        height: width + 'px',
        backgroundColor: color,
        padding: 0,
        margin: 0
      }
        
    return <div style={style as any}/> // TODO
  }
})

type TypeRowProps = {
  tileWidth?: number,
  columnCount?: number,
  colors?: string[],
}

const TileRow = component<TypeRowProps>({
  displayName: 'TileRow',

  render({
    tileWidth = 3,
    columnCount = prefs.columnCount,
    colors = prefs.colors
  }) {
    const tiles = []

    for (let x = 0; x < columnCount; ++x) {
      const
        colorIdx = Math.floor(  Math.random() * colors.length),
        color = colors[colorIdx]

        tiles.push(<Tile width={tileWidth} color={color} key={x}/>)
    }

    return <div style={{ clear: 'both' }}>{tiles}</div>
  }
})

type SpeedTestProps = {
  columnCount?: number,
  rowCount?: number,
  tileWidth?: number,
  framesPerSecond?: number
}

const SpeedTest = component<SpeedTestProps>({
  displayName: 'SpeedTest',
  
  init(c) {
    let 
      intervalId = null as any,
      startTime = Date.now(),
      frameCount = 0,
      actualFramesPerSecond = '0'

    const
      getProps = useProps(c, {
        tileWidth: 3,
        rowCount: prefs.rowCount,
        columnCount: prefs.columnCount,
        framesPerSecond: prefs.framesPerSecond
      }),

      forceUpdate = useForceUpdate(c),

      style = {
        marginTop: 40,
        marginLeft: 40
      }

    useOnMount(c, () => {
      intervalId = setInterval(() => {
        ++frameCount
        forceUpdate()

        if (frameCount % 10 === 0) {
          actualFramesPerSecond =
            (frameCount * 1000.0 /
              (Date.now() - startTime)).toFixed(2)
        }
      }, 1000 / getProps().framesPerSecond)

      return () => clearInterval(intervalId)
    })

  
    return () => {
      const
        props = getProps(),
        rows: VirtualElement[] = []
      
      for (let y = 0; y < props.rowCount; ++y) {
        rows.push(
          <TileRow
            tileWidth={props.tileWidth}
            columnCount={props.columnCount}
            key={y}
          />)
      }

      return (
        <div>
        <div> 
            Rows: {props.rowCount}, columns: {props.columnCount}
            <div style={style}>{rows}</div>
          </div>
          <br/>
          <div style={{ clear: 'both' }}>
            (actual frames per second: {actualFramesPerSecond})
          </div>
        </div>
      )
    }
  }
})

export default
  <SpeedTest
    tileWidth={prefs.tileWidth}
    columnCount={prefs.columnCount}
    rowCount={prefs.rowCount}
  />
