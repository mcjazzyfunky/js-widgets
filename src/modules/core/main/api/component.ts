import Props from '../internal/types/Props'
import Component from './types/Component'
import Ctrl from './types/Ctrl'
import VirtualNode from './types/VirtualNode'
import defineComponent from '../internal/components/defineComponent'
import StatelessComponentConfig from './types/StatelessComponentConfig';
import StatefulComponentConfig from './types/StatefulComponentConfig';

type ConfigA<P extends Props = {}, D extends Partial<PickOptionalProps<P>> = {}> = {
  memoize?: boolean,
  validate?: (props: P) => boolean | null | Error,
  defaultProps?: D,
  render: (props: P & D) => any,
  init?: never
}

type ConfigB<P extends Props = {}, D extends Partial<PickOptionalProps<P>> = {}> = {
  memoize?: boolean,
  validate?: (props: P) => boolean | null | Error,
  defaultProps?: D,
  init: (c: Ctrl<P & D>) => (props: P) => any,
  render?: never
}

function component<P extends Props = {}>(
  config: StatelessComponentConfig<P>
): Component<P>

function component<P extends Props = {}>(
  config: StatefulComponentConfig<P>
): Component<P>

function component<P extends Props = {}>(
  displayName: string
): <D extends Partial<PickOptionalProps<P>>>(config: ConfigA<P> | ConfigB<P, D>) => any

function component(arg1: any): any {
  let ret: any

  if (typeof arg1 === 'string') {console.log(arg1)
    ret = (config: ConfigA<any> | ConfigB<any, any>) => {
      const cfg: any = {
        displayName: arg1,
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

      return defineComponent(cfg)
    }
  } else {
    ret = defineComponent(arg1)
  }

  return ret
}

// --- private ------------------------------------------------------

type PickOptionalProps<T> = {
  [K in keyof T]-?: T extends Record<K, T[K]> ? never : T[K]
}


// --- exports ------------------------------------------------------

export default component
