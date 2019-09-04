import { Spec } from 'js-spec'

import Props from './types/Props'
import Component from './types/Component'
import Ctrl from './types/Ctrl'
import h from './h'
import StatelessComponentConfig from '../../../core/main/api/types/StatelessComponentConfig'
import StatefulComponentConfig from '../../../core/main/api/types/StatefulComponentConfig'
import ComponentMeta from './types/ComponentMeta'
import PickOptionalProps from '../internal/types/PickOptionalProps'

function component<P extends Props = {}>(
  displayName: string
): <D extends Partial<PickOptionalProps<P>>>(config: StatelessComponentConfig<P> | StatefulComponentConfig<P, D>) => any

function component(displayName: string): any {
  return (config: StatelessComponentConfig<any> | StatefulComponentConfig<any, any>) => {
    const cfg: any = {
      memoize: !!config.memoize,
      validate: config.validate || null,
    }

    if (config.init) {
      cfg.init = config.init
    } else {
      cfg.render = config.render
    }

    if (config.defaultProps) {
      cfg.defaultProps = config.defaultProps
    }

    return defineComponent(displayName, cfg)
  }
}

// --- locals -------------------------------------------------------

function defineComponent<P extends Props = {}>(
  displayName: string,
  config: StatelessComponentConfig<P>
): Component<P>

function defineComponent<P extends Props = {}>(
  displayName: string, 
  config: StatefulComponentConfig<P>
):
  Component<P>

function defineComponent<P extends Props = {}>(
  displayName: string,
  config: StatefulComponentConfig<P> | StatelessComponentConfig<P>
): Component<P> {

  if (process.env.NODE_ENV === 'development' as any) {
    const error = validateComponentConfig(config)

    if (error) {
      throw new Error(
        `[defineComponent] ${error.message}`)
    }
  }

  let createComponentElement: Function | null = null

  const ret: Component<P> =
    Object.assign(
      function (/* arguments */) {
        return createComponentElement!.apply(null, arguments)
      },
      {
        meta: null! as  ComponentMeta<P>
      })
  
  createComponentElement = h.bind(null, ret as any)

  Object.defineProperty(ret, 'js-widgets:kind', {
    value: 'componentFactory'
  })

  Object.defineProperty(ret, 'meta', {
    value: convertConfigToMeta(config)
  })

  return ret
}

// --- locals ---------------------------------------------------

const
  REGEX_DISPLAY_NAME = /^([a-z]+:)*[A-Z][a-zA-Z0-9.]*$/,
  REGEX_PROP_NAME = /^[a-z][a-zA-Z0-9]*$/,

  specOfDefaultProps =
    Spec.and(
      Spec.object,
      Spec.hasSomeKeys,
      Spec.keysOf(Spec.match(REGEX_PROP_NAME))),

  specOfComponentConfig =
    Spec.or(
      {
        when: Spec.hasOwnProp('render'),
        
        then: Spec.exact({
          defaultProps: Spec.optional(specOfDefaultProps),
          validate: Spec.nullableOptional(Spec.function),
          memoize: Spec.optional(Spec.boolean),
          render: Spec.function
        })
      }, 
      {
        when: Spec.hasOwnProp('init'),

        then: Spec.exact({
          defaultProps: Spec.optional(specOfDefaultProps),
          validate: Spec.nullableOptional(Spec.function),
          memoize: Spec.optional(Spec.boolean),
          init: Spec.function
        })
      })

function validateComponentConfig(config: any): null | Error {
  let ret = null
  const error = specOfComponentConfig.validate(config)

  if (error) {
    let errorMsg = 'Invalid configuration for component'

    if (config && typeof config.displayName === 'string'
      && config.displayName.match(REGEX_DISPLAY_NAME)) {

      errorMsg += ` "${config.displayName}"`
    }

    errorMsg += ` => ${error.message}`

    ret = new Error(errorMsg)
  }

  return ret
}

function convertConfigToMeta(config: any): any {
  const ret: any = {
    displayName: config.displayName,
    validate: config.validate || null,
    // plus key "render" or "init"
  }

  if (config.render) {
    if (!config.defaultProps) {
      ret.render = config.render
    } else {
      ret.render = (props: any) => {
        const defaultedProps = {...config.defaultProps, ...props}

        return config.render(defaultedProps)
      }
    }
  } else if (!config.defaultProps) {
    ret.init = config.init
  } else {
    ret.init = (c: Ctrl) => {
      const
        adjustedGetProps = () => {
          return { ...config.defaultProps, ...c.getProps() } // TODO - optimize
        },

        adjustedCtrl = {...c, getProps: adjustedGetProps }

      return config.init(adjustedCtrl)
    }
  }

  return Object.freeze(ret)
}


// --- exports ------------------------------------------------------

export default component
