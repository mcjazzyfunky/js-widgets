import { createContext } from 'react'

import Context from './types/Context'

export default function context<T>(displayName: string) {
  return new ContextBuilder<T>(displayName)
}

// --- private ------------------------------------------------------

type Validator<T> = (value: T) => boolean | null | Error

class BuilderAttrs<T> {
  displayName?: string
  validate?: Validator<T>
  
  copy(): BuilderAttrs<T> {
    const ret: BuilderAttrs<T> = new BuilderAttrs()

    ret.displayName = this.displayName
    ret.validate = this.validate

    return ret
  }
}

class ContextBuilder<T> {
  private _attrs: BuilderAttrs<T>

  constructor(displayName: string) {
    this._attrs = new BuilderAttrs()
    this._attrs.displayName = displayName 
  }

  validate(validator: Validator<T>): ValidateBuilder<T> {
    return new ValidateBuilder<T>(validator, this._attrs)
  }

  defaultValue(value: T): Context<T> {
    return buildContext(value, this._attrs)
  }
}

class ValidateBuilder<T> {
  private _attrs: BuilderAttrs<T>

  constructor(validator: Validator<T>, attrs: BuilderAttrs<T>) {
    this._attrs = attrs.copy()
    this._attrs.validate = validator
  }

  defaultValue(value: T): Context<T> {
    return buildContext(value, this._attrs)
  }
}

function buildContext<T>(defaultValue: T, attrs: BuilderAttrs<T>): Context<T> {
  const
    ret = createContext(defaultValue),
    provider: any = ret.Provider,
    validate = attrs.validate

  provider.displayName = attrs.displayName

  Object.defineProperty(provider, '__internal_defaultValue', {
    value: defaultValue 
  })

  if (validate) {
    provider.propTypes = {
      value: (props: any) => {
        const
          result = validate(props.value),

          errorMsg =
            result === false
              ? 'Invalid value'
              : result instanceof Error
                ? result.message
                : null

        return !errorMsg
          ? null
          : new TypeError(
            'Validation error for provider of context '
            + `"${attrs.displayName}" => ${errorMsg}`)
      }
    }
  }

  return ret
}
