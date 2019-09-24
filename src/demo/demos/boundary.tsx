import { h, component, Boundary }  from '../../modules/core/main/index'
import { useState, useOnUpdate } from '../../modules/hooks/main/index'

const ErrorTrigger = component({
  displayName: 'ErrorTrigger',

  init(c) {
    const
      [getErrorMsg, setErrorMsg] = useState<string | null>(c, null),
      onButtonClick = () => setErrorMsg('Simulated error!')

    useOnUpdate(c, () => {
      const errorMsg = getErrorMsg()

      if (errorMsg) {
        throw new Error(errorMsg)
      }
    })

    return () => (
      <button onClick={onButtonClick}>
        Click to trigger errror
      </button>
    )
  }
})

const ErrorBoundary = component({
  displayName: 'ErrorBoundary',

  init(c) {
    const
      [getError, setError] = useState<Error | null>(c, null),
      
      onReset = () => {
        setError(null)
      },

      onError = (error: any) => {
        console.log(error)
        setError(error)
      }

    return () => { 
      const error = getError()

      return (
        <Boundary fallback={onError}>
          {
            error
              ? <div>
                  Catched error: <i>{error.message } </i>
                  <button onClick={onReset}>Reset</button>
                </div>
              : <ErrorTrigger/>
          }
        </Boundary>
      )
    }
  }
})

export default <ErrorBoundary/>
