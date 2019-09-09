import { h, component, VirtualElement }
  from '../../modules/core/main/index'

  import { useEffect, useForceUpdate, useProps }
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

const Tile = component<TileProps>('Tile')({
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

const TileRow = component<TypeRowProps>('TileRow')({
  render({
    tileWidth = 3,
    columnCount = prefs.columnCount,
    colors = prefs.colors
  }) {
    const tiles = []

    for (let x = 0; x < columnCount; ++x) {
      const
        colorIdx = Math.floor(Math.random() * colors.length),
        color = colors[colorIdx]

      tiles.push(<Tile width={tileWidth} color={color} key={x}/>)
    }

    return <div style={{ clear: 'both' }}>{tiles}</div>
  }
})

type SpeedTestProps = {
  columnCount: number,
  rowCount: number,
  tileWidth?: number,
  framesPerSecond?: number
}

const SpeedTest = component<SpeedTestProps>('SpeedTest')({
  defaultProps: {
    tileWidth: 3,
    rowCount: prefs.rowCount,
    columnCount: prefs.columnCount,
    framesPerSecond: prefs.framesPerSecond
  },
  
  init(c) {
    let 
      intervalId = null as any,
      startTime = Date.now(),
      frameCount = 0,
      actualFramesPerSecond = '0'

    const
      getProps = useProps(c),
      forceUpdate = useForceUpdate(c),

      rows: VirtualElement[] = [],
      
      style = {
        marginTop: 40,
        marginLeft: 40
      }

    useEffect(c, () => {
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

    for (let y = 0; y < getProps().rowCount; ++y) {
      rows.push(
        <TileRow
          tileWidth={getProps().tileWidth}
          columnCount={getProps().columnCount}
          key={y}
        />)
    }
  
    return props => (
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
})

export default
  <SpeedTest
    tileWidth={prefs.tileWidth}
    columnCount={prefs.columnCount}
    rowCount={prefs.rowCount}
  />