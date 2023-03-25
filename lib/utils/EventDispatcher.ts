export class EventDispatcher<IEventType extends Record<string, unknown>> {
  private _listeners: Partial<Record<keyof IEventType, Array<(data: unknown, type: keyof IEventType) => void>>> = {}

  /**
   * 添加事件监听
   * @param type 事件類型
   * @param listener 回调函数
   * @returns 取消回调函数方法
   */
  addEventListener<K extends keyof IEventType>(type: K, listener: (data: IEventType[K], type: K) => void) {
    if (!this._listeners) this._listeners = {}
    const listeners = this._listeners

    if (!listeners[type]) {
      listeners[type] = []
    }

    const funcList = listeners[type] as Array<(data: IEventType[K], type: K) => void>

    if (funcList.indexOf(listener) !== -1) {
      throw new Error('不要添加相同的function:' + listener.toString())
    }

    funcList.push(listener)

    return () => this.removeEventListener(type, listener)
  }

  /**
   * 是否存在事件监听
   * @param type 事件类型
   * @param listener 事件回调方法
   * @returns 是否存在当前事件类型的回调
   */
  hasEventListener<K extends keyof IEventType>(type: K, listener: (data: IEventType[K], type: K) => void) {
    if (!this._listeners) return false
    const listeners = this._listeners

    const listenerArray = listeners[type] as Array<(data: IEventType[K], type: K) => void> | undefined

    return listenerArray && listenerArray.indexOf(listener) !== -1
  }

  /**移除监听 */
  removeEventListener<K extends keyof IEventType>(type: K, listener: (data: IEventType[K], type: K) => void) {
    if (!this._listeners) return false

    const listeners = this._listeners
    if (!listeners[type]) return false

    const listenerArray = listeners[type] as Array<(data: IEventType[K], type: K) => void>

    if (listenerArray) {
      const index = listenerArray.indexOf(listener)

      if (index !== -1) {
        listenerArray.splice(index, 1)

        return true
      }
    }
    return false
  }

  /**事件调度 */
  dispatchEvent<K extends keyof IEventType>(type: K, dataFunc: () => IEventType[K], target: any) {
    if (!this._listeners) return

    const listeners = this._listeners
    const listenerArray = listeners[type]

    if (!listenerArray || !listenerArray.length) return

    const array = listenerArray.slice(0)

    for (let i = 0; i < array.length; i++) {
      // 每次调用回调函数都重新生成一次data避免回调函数中修改了data中的值影响后续的回调
      const data = dataFunc()
      array[i].call(target, data, type)
    }
  }
}

// e.stopPropagation
