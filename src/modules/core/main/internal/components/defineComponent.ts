import Props from '../../api/types/Props'
import ComponentMeta from '../../api/types/ComponentMeta'
import Ctrl from '../../api/types/Ctrl'
import h from '../../api/h'
import Component from '../../api/types/Component'
import StatelessComponentConfig from '../../api/types/StatelessComponentConfig' 
import StatefulComponentConfig from '../../api/types/StatefulComponentConfig' 

import { Spec } from 'js-spec'

function defineComponent<P extends Props = {}>(config: StatelessComponentConfig<P>):
  Component<P>

function defineComponent<P extends Props = {}>(config: StatefulComponentConfig<P>):
  Component<P>

function defineComponent<P extends Props = {}>(
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

export default defineComponent

// --- locals ---------------------------------------------------

const
  REGEX_DISPLAY_NAME = /^([a-z]+:)*[A-Z][a-zA-Z0-9.]*$/,
  REGEX_PROP_NAME = /^[a-z][a-zA-Z0-9]*$/,

  specOfDisplayName = 
    Spec.match(REGEX_DISPLAY_NAME),

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
          displayName: specOfDisplayName,
          defaultProps: Spec.optional(specOfDefaultProps),
          validate: Spec.nullableOptional(Spec.function),
          memoize: Spec.optional(Spec.boolean),
          render: Spec.function
        })
      }, 
      {
        when: Spec.hasOwnProp('init'),

        then: Spec.exact({
          displayName: specOfDisplayName,
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
