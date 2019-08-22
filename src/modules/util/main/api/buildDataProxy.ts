type ObjectOfGetters = { [key: string]: () => any }

export default function buildDataProxy<T extends ObjectOfGetters>(
  getters: T
): { [key in keyof T]: ReturnType<T[key]> } {
  const ret = new Proxy(() => Object.assign({}, ret), {
    get: (target, name) => getters[name as any](),
  })

  return ret as any
}
