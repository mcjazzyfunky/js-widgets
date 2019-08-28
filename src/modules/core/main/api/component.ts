import React, { FunctionComponent, ReactElement, ReactNode, RefAttributes } from 'react'

import defineComponent from './defineComponent'
import Props from '../internal/types/Props'
import Component from './types/Component'
import ComponentFactory from './types/ComponentFactory'
import VirtualNode from './types/VirtualNode'

export default function component<P extends Props = {}>(displayName: string) {
  return new ComponentBuilder<P>(displayName)
}

// --- private ------------------------------------------------------

type Renderer<P extends Props> = (props: P) => VirtualNode 

type PickOptionalProps<T> = {
  [K in keyof T]-?: T extends Record<K, T[K]> ? never : T[K]
}

type PropsValidator<P extends Props> = (props: P) => boolean | null | Error

class BuilderAttrs<P extends Props, D extends Partial<PickOptionalProps<P>> = {}> {
  displayName?: string
  memoize?: boolean
  validate?: PropsValidator<P>
  defaultProps?: D
  
  copy(): BuilderAttrs<P,D> {
    const ret: BuilderAttrs<P, D> = new BuilderAttrs()

    ret.displayName = this.displayName
    ret.memoize = this.memoize
    ret.validate = this.validate
    ret.defaultProps = this.defaultProps

    return ret
  }
}

class ComponentBuilder<P extends Props> {
  private _attrs: BuilderAttrs<P>

  constructor(displayName: string) {
    this._attrs = new BuilderAttrs()
    this._attrs.displayName = displayName 
  }

  validate(validator: (props: P) => boolean | null | Error): ValidateBuilder<P> {
    return new ValidateBuilder<P>(validator, this._attrs)
  }

  memoize(value: boolean = true): MemoizeBuilder<P> {
    return new MemoizeBuilder<P>(value, this._attrs)
  }

  defaultProps<D extends Partial<PickOptionalProps<P>>>(defaultProps: D): DefaultPropsBuilder<P, D> {
    return new DefaultPropsBuilder<P, D>(defaultProps, this._attrs)
  }

  render(renderer: Renderer<P>): ComponentFactory<P> {
    return createSimpleComponent<P>(renderer, this._attrs)
  }
  
  init(initializer: (c: Component<P>) => (props: P) => VirtualNode): ComponentFactory<P> {
    return createComplexComponent(initializer, this._attrs)
  }
}

class ValidateBuilder<P extends Props> {
  private _attrs: BuilderAttrs<P>

  constructor(validator: PropsValidator<P>, attrs: BuilderAttrs<P>) {
    this._attrs = attrs.copy()
    this._attrs.validate = validator
  }

  memoize(value: boolean = true): MemoizeBuilder<P> {
    return new MemoizeBuilder<P>(value, this._attrs)
  }

  defaultProps<D extends Partial<PickOptionalProps<P>>>(defaultProps: D): DefaultPropsBuilder<P, D> {
    return new DefaultPropsBuilder(defaultProps, this._attrs)
  }

  render(renderer: Renderer<P>): ComponentFactory<P> {
    return createSimpleComponent(renderer, this._attrs)
  }

  init(initializer: (c: Component<P>) => (props: P) => VirtualNode): ComponentFactory<P> {
    return createComplexComponent(initializer, this._attrs)
  }
}

class MemoizeBuilder<P extends Props> {
  private _attrs: BuilderAttrs<P>

  constructor(value: boolean = true, attrs: BuilderAttrs<P>) {
    this._attrs = attrs.copy()
    this._attrs.memoize = value
  }
  
  defaultProps<D extends Partial<PickOptionalProps<P>>>(defaultProps: D): DefaultPropsBuilder<P, D> {
    return new DefaultPropsBuilder<P, D>(defaultProps, this._attrs)
  }

  render(renderer: Renderer<P>): ComponentFactory<P> {
    return createSimpleComponent(renderer, this._attrs)
  }

  init(initializer: (c: Component<P>) => (props: P) => VirtualNode): ComponentFactory<P> {
    return createComplexComponent(initializer, this._attrs)
  }
}

class DefaultPropsBuilder<P extends Props, D extends Partial<PickOptionalProps<P>>> {
  private _attrs: BuilderAttrs<P>

  constructor(defaultProps: D, attrs: BuilderAttrs<P>) {
    this._attrs = attrs.copy()
    this._attrs.defaultProps = defaultProps
  }

  render(renderer: Renderer<P & D>): ComponentFactory<P> {
    return createSimpleComponent(renderer as any, this._attrs)
  }

  init(initializer: (c: Component<P & D>) => (props: P & D) => VirtualNode): ComponentFactory<P> {
    return createComplexComponent(initializer as any, this._attrs)
  }
}

function createSimpleComponent<P extends Props, D extends Partial<PickOptionalProps<P>> = {}>(
  render: (props: P & D) => any, attrs: BuilderAttrs<P, D>
): ComponentFactory<P> {
  return defineComponent({ ...attrs, render } as any)
}

function createComplexComponent<P extends Props, D extends Partial<PickOptionalProps<P>> = {}>(
  initializer: (c: Component<P & D>) => (props: P & D) => VirtualNode, attrs: BuilderAttrs<P, D>
): ComponentFactory<P> {
  return defineComponent({ ...attrs, init: initializer } as any)
}
