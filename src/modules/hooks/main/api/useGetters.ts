import { Component } from 'js-widgets'

// WHAT A MESS!!!!
// TODO - Fix typing
// TODO - make it component lifecyle dependent

type Getter = () => any
type Getters = [Getter] | [Getter, Getter] | [Getter, Getter, Getter] | [Getter, Getter, Getter, Getter]

type Values<G extends Getters> =
  G extends [Getter]
    ? [ReturnType<G[0]>]
    : G extends [Getter, Getter]
      ? [ReturnType<G[0]>, ReturnType<G[1]>]
      : G extends [Getter, Getter, Getter]
        ? [ReturnType<G[0]>, ReturnType<G[1]>, ReturnType<G[2]>]
        : G extends [Getter, Getter, Getter, Getter]
          ? [ReturnType<G[0]>, ReturnType<G[1]>, ReturnType<G[2]>, ReturnType<G[3]>]
          : never

export default function useGetters<G extends Getters>(C: Component, ...getters: G):
  (f: (...args: Values<G>) => any) => any {
  const ret: any = []

  return ((f: any) => {
    const args: any[] = []

    for (let i = 0; i < getters.length; ++i) {
      args.push(getters[i]())
    }

    return () => f(...args)
  }) as any
}
