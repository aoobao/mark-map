import { IViewRenderEvent } from 'lib/types'
import { PARENT, RENDER } from '../utils/const'
import { Core, ICoreOptions } from './Core'
import { Layer } from './layers'

export interface IViewOptions extends ICoreOptions {}

export class View extends Core {
  override get type() {
    return 'View'
  }

  private _layers: Layer[] = []

  /**所有加载的图层 */
  get layers() {
    return this._layers.slice(0)
  }

  constructor(opt?: IViewOptions) {
    super(opt)
  }

  /**
   * 添加图层
   * @param layers 要添加的图层
   * @returns this
   */
  add(...layers: Layer[]) {
    if (!layers.length) return this
    const layer = layers[0]

    if (layer[PARENT] && layer[PARENT] === this) {
      console.warn('layer is added in view', layer)
    } else {
      layer[PARENT]?.remove(layer)
      this._layers.push(layer)
      layer[PARENT] = this
    }

    if (layers.length > 1) {
      layers.slice(1).forEach(layer => {
        this.add(layer)
      })
    }

    return this
  }

  /**
   * 移除图层
   * @param layers 要移除的图层
   * @returns this
   */
  remove(...layers: Layer[]) {
    if (!layers.length) return this
    const layer = layers[0]
    const index = this._layers.indexOf(layer)
    if (index > -1) {
      this._layers.splice(index, 1)
    }
    if (layer[PARENT] === this) layer[PARENT] = undefined

    if (layers.length > 1) {
      layers.slice(1).forEach(layer => {
        this.remove(layer)
      })
    }
    return this
  }

  /**
   * 清空图层
   * @returns this
   */
  clear() {
    if (this._layers.length) this.remove(...this.layers)
    return this
  }

  [RENDER](opt: IViewRenderEvent) {
    if (!this.visible) return
    const alpha = this.alpha
    this.updateMatrixWorld()
    const layers = this._layers.filter(t => t.visible).sort((a, b) => a.zIndex - b.zIndex)

    layers.forEach(layer => {
      const event = {
        ...opt,
        alpha
      }

      layer[RENDER](event)
    })
  }

  dispose() {
    this.clear()
  }
}
