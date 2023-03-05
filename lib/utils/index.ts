import { v4 } from 'uuid'

export const generateUUID = () => {
  return v4()
}

export const callMethod = (callback: () => void, delayTime = 0) => {
  let _promise: Promise<void> | undefined

  const func = () => {
    if (!_promise) {
      _promise = new Promise<void>((resolve, reject) => {
        delay(delayTime).then(() => {
          try {
            callback()
            resolve()
          } catch (error) {
            reject(error)
          } finally {
            _promise = undefined
          }
        })
      })
    }

    return _promise
  }

  func.getPromise = () => {
    return _promise
  }

  return func
}

export const delay = (number = 0) => {
  return new Promise<void>(resolve => {
    if (!number) {
      resolve()
    } else {
      setTimeout(() => {
        resolve()
      }, number)
    }
  })
}

export const isNotNull = <T>(val: T): val is Exclude<T, undefined | null> => {
  return val !== null && val !== undefined
}
