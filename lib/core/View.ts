import { PARENT } from '../utils/const'
import { Core, ICoreOptions } from './Core'
import { Layer } from './layer'

export interface IViewOptions extends ICoreOptions {}

export class View extends Core {
  private _layers: Layer[] = []

  constructor(opt?: IViewOptions) {
    super(opt)
  }

  /**
   * 添加图层
   * @param layers 要添加的图层
   * @returns this
   */
  add(...layers: Layer[]) {
    if (!layers.length) return
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
   * @returns
   */
  remove(...layers: Layer[]) {
    if (!layers.length) return
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
}
