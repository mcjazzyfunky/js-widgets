# jsWidgets

Disclaimer: This is just an initial draft of README. A lot is missing yet....

### Motivation

What are the main difference to React's API?

* React's API is quite "optimized" for the use of JSX:

  While the following JSX syntax is really nice...

  ```jsx
  <FancyHeader>Some headline</FancyHeader>
  ```
  ... its non-JSX counterpart looks quite verbose ...

  ```javascript
  React.createElement(FancyHeader, null, 'Some headline')
  ```

  ... while it would be much nicer just to write ...
  
  ```javascript
  FancyHeader('Some headline')
  ```

  Be aware that you should ALWAYS use JSX with TypeScript
  the non-JSX usage is only meant for those who want to
  UIs in pure ECMAScript.

  In React's API, the main representation of component types are
  render functions (for function components) or component classes.
  Neither will component classes be instantiated by the user directly
  nor will render functions be called directly. The only useful
  usage of component types are that they will be passed as first argument to
  the `React.createElement` function. Same for context provider
  and consumers and the `Fragment` symbol.

  In jsWidgets things are different: Everything that can be used as first
  argument of the `createElement` function besides strings is a factory
  function that returns the result of a corresponding `createElement` call.
  Besides the second argument (`props`) of the `createElement` function
  and also for all the component factories is optional to provide a concice
  syntax: All component types, `Fragment`, context providers, context
  consumers are factory functions with an optional second `props` argument:

  ```jsx
  SomeComponent('some text')

  // or when using jsWidgets with JSX
  <SomeComponent>Some text</SomeComponent>
  ```

  ```jsx
  Fragment(
    SomeComponent('some text'),
    SomeComponent({ className: 'some-class'}, 'some text'))

  // or when using jsWidgets with JSX
  <>
    <SomeComponent>Some text</SomeComponent>
    <SomeComponent className="some-class">some text</SomeComponent>
  </>
  ```
  
  ```jsx
  Fragment({ key: someKey },
    SomeComponent(),
    SomeOtherComponent())
  
  // or when using jsWidgets with JSX
  <Fragment key={someKey}>
    <SomeComponent/>
    <SomeOtherComponent/>
  </>
  ```

  ```jsx
  SomeCtx.Provider({ value: someValue },
    SomeComponent(),
    SomeOtherComponent())
  
  // or when using jsWidgets with JSX
  <SomeCtx.Provider value={someValue}>
    <SomeComponent/>
    <SomeOtherComponent/>
  </SomeCtx.Provider>
  ```

  ```jsx
  SomeCtx.Consumer(value =>
    SomeComponent(value))
  
  // or when using jsWidgets with JSX
  <SomeCtx.Consumer>
    { it => <SomeComponent/> }
  </SomeCtx.Consumer>
  ```

* In React a virtual element is represented by an object of shape
  `{ $$typeof, type, props, key, ref, ... }`.
  To access `type` or `props` of a virtual elements you have to use
  `elem.type` and `elem.props`.<br>
  In jsWidgets on the other hand a virtual element is considered
  an opaque data structure. To access `type` and `props` of a virtual
  element you have to use `typeOf(elem)` and `propsOf(elem)`.

* In React the property `children` of `props` is a opaque datastructure.
  To handle that React provides a singleton Object called `Children`
  that provides some helper functions to work with `children`
  (`Children.map`, `Children.forEach`, `Children.count` etc.).<br>
  In jsWidgets `children` are also represented as a opaque data
  structure. Similar to React, jsWidgets also has several helper functions
  to work with `children` (`mapChildren`, `forEachChild`, `childCount` etc.)

* Reacts provides the possibility for a sophisticated validation of the
  components' properties, which is great.
  Normally for that purpose a add-on library called "props-types".
  While it's great that "props-types" is not part of React itself, yet
  unfortunatelly all the validation function of "props-types" are only
  meant to be used with React, it's not meant as a general purpose validation
  library as the signature of the validation functions are very React-specific.
  This has some advantages of course (maybe shorter error messages and a bit
  smaller production bundle sizes) but the disadvantage that you cannot just use
  a general purpose validation library are really heavy.
  jsWidgets on the other hand allows the use of such general-purpose validation
  libraries - while it recommended to use the jsWidgets independent validation
  library ["js-spec"](https://github.com/js-works/js-spec).

* In jsWidgets component types are represented by a corresponding factory
  function (that does create a virtual element by using the `createElement` function).
  That's simplifies the implemention of user interfaces in pure ECMAScript
  if desired - nevertheless it is recommended to use JSX as this is the
  de-facto standard in React-like UI development.

### Current API (not complete yet)

#### Module "_js-widgets_"

* `createElement(type, props?, ...children)`
* `defineComponent(componentConfig)`
* `defineContext(contextConfig)`
* `Fragment(props?, ...children)`

### Modules "_js-widgets/dom" ###

* `mount(content, container)`
* `unmount(container)`

### Modules "__js-widgets/use":
* `useCallback(...)`
* `useContext(...)`
* `useEffect(...)`
* `useForceUpdate(...)`
* `useMethods(...)`
* `usePrevious(...)`
* `useRef(...)`
* `useState(...)`

### Modules "__js-widgets/util":
* `isElement(it)`
* `isNode(it)`
* `propsOf(element)`
* `typeOf(element)`
* `childCount(children)`
* `forEachChild(children, callback)`
* `mapChildren(children, mapper)`
* `onlyChild(children)`
* `toChildArray(element)`
* `withChildren(f)`

#### Module "_js-widgets/html_"

Factory functions for all HTML entities (to be used in non-JSX context: `div('some text')`)

#### Module "_js-widgets/svg_"

Factory functions for all SVG entities

### Project status

**Important**: This project is in a very early state and it is not meant 
to be used in production.
