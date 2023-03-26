export const createSubscribe = <T>() => {
  type Func = (data: T) => void

  type FuncType = {
    func: Func
    index: number
  }

  const funcs: FuncType[] = []

  const subscribe = (func: Func, index: number = Infinity) => {
    // console.log('注册', func)
    funcs.push({ func, index })

    if (index < Infinity) {
      funcs.sort((a, b) => {
        return a.index - b.index
      })
    }

    return () => unsubscribe(func)
  }

  const unsubscribe = (func?: Func) => {
    if (!func) return clear()
    for (let i = funcs.length - 1; i >= 0; i--) {
      const f = funcs[i]
      if (f.func === func) {
        funcs.splice(i, 1)

      }
    }
  }

  const clear = () => {
    funcs.splice(0)
  }

  const publish = (opt: T) => {
    if (!funcs.length) return

    funcs.forEach(t => {
      const func = t.func
      func(opt)
    })
  }

  return [publish, subscribe, unsubscribe, clear] as const
}
