import { Spec } from 'js-spec'

import Props from './types/Props'
import Component from './types/Component'
import Ctrl from './types/Ctrl'
import h from './h'
import StatelessComponentConfig from '../../../core/main/api/types/StatelessComponentConfig'
import StatefulComponentConfig from '../../../core/main/api/types/StatefulComponentConfig'
import createInternalComponent from '../internal/helpers/createInternalComponent'
import StatefulComponentMeta from '../internal/types/StatefulComponentMeta'
import StatelessComponentMeta from '../internal/types/StatelessComponentMeta'

function component<P extends Props = {}>(
  config: StatelessComponentConfig<P>
): Component<P>

function component<P extends Props = {}>(
  config: StatefulComponentConfig<P>
): Component<P>

function component(config: any): any {
  const
    ret = defineComponent(config),
    internalType = createInternalComponent(config)

  Object.defineProperty(internalType, '__internal_original', {
    value: ret
  }),

  Object.defineProperty(ret, '__internal_type', {
    writable: true, // TODO
    value: internalType
  })

  return ret
}

// --- locals ---------------------------------------------------

const
  REGEX_DISPLAY_NAME = /^([a-z]+:)*[A-Z]/,

  specOfComponentConfig =
    Spec.or(
      {
        when: Spec.hasOwnProp('render'),
        
        then: Spec.exact({
          displayName: Spec.match(REGEX_DISPLAY_NAME),
          validate: Spec.nullableOptional(Spec.function),
          memoize: Spec.optional(Spec.boolean),
          render: Spec.function
        })
      }, 
      {
        when: Spec.hasOwnProp('init'),

        then: Spec.exact({
          displayName: Spec.match(REGEX_DISPLAY_NAME),
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
    ret.render = config.render
  } else {
    ret.init = config.init
  }

  return Object.freeze(ret)
}

function defineComponent<P extends Props = {}>(
  config: StatelessComponentConfig<P>
): Component<P>

function defineComponent<P extends Props = {}>(
  config: StatefulComponentConfig<P>
): Component<P>

function defineComponent<P extends Props = {}>(
  config: StatefulComponentConfig<P> | StatelessComponentConfig<P>
): Component<P> {
  if (process.env.NODE_ENV === 'development' as any) {
    const error = validateComponentConfig(config)

    if (error) {
      throw new Error(
        `[component] ${error.message}`)
    }
  }

  let createComponentElement: Function | null = null

  const ret: Component<P> =
    Object.assign(
      function (/* arguments */) {
        return createComponentElement!.apply(null, arguments)
      },
      {
        meta: null! as (StatefulComponentMeta<P> | StatelessComponentMeta<P>) 
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

// --- exports ------------------------------------------------------

export default component
