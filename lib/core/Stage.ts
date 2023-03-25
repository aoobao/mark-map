import { Clock } from 'lib/math/Clock'
import { Layer } from 'lib/index'
import { Vector2 } from 'lib/math/Vector2'
import { MARK_MAP_CLASSNAME, RENDER } from 'lib/utils/const'
import { View } from './View'
import { now } from 'lib/utils/index'
import { EventDispatcher } from 'lib/utils/EventDispatcher'
import { IStageEvent } from 'lib/types'
// window.devicePixelRatio
export interface IStageOptions {
  /** 挂载的dom节点 */
  dom: HTMLDivElement
  zoom?: number
  devicePixelRatio?: number
  autoClear?: boolean
}

export class Stage {
  private _view: View

  private div: HTMLDivElement

  private canvas: HTMLCanvasElement

  private ctx: CanvasRenderingContext2D

  private _disposeCancels: Array<() => void> = []

  private _devicePixelRatio: number

  private _clock = new Clock()

  private _event = new EventDispatcher<IStageEvent>()

  /**每一帧渲染自动清空画布 */
  autoClear = true

  /**像素分辨率比例(最终canvas的大小为div的宽高*分辨率比例) */
  get devicePixelRatio() {
    return this._devicePixelRatio
  }

  /**设置像素分辨率比例 */
  set devicePixelRatio(pixelRatio: number) {
    if (this._devicePixelRatio !== pixelRatio) {
      this._devicePixelRatio = pixelRatio
      this._initCanvasSize()
    }
  }

  /**缩放值,1为默认大小 必须大于0 */
  get zoom() {
    const scale = this._view.sx
    return scale
  }

  /**设置缩放值 (0,18] */
  set zoom(value: number) {
    this._view.scale = value
  }

  /**画布宽度 */
  get width() {
    return this.canvas.width
  }
  /**画布高度 */
  get height() {
    return this.canvas.height
  }

  /**挂载的所有layers */
  get layers() {
    return this._view.layers
  }

  constructor(opt: IStageOptions) {
    if (opt.autoClear === false) this.autoClear = false

    const zoom = opt.zoom || 1
    this._view = new View({ scale: new Vector2(zoom, zoom) })

    this._devicePixelRatio = opt.devicePixelRatio || window.devicePixelRatio

    this.div = opt.dom

    this.div.classList.add(MARK_MAP_CLASSNAME)

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!

    this._initCanvas()
  }

  /**
   * 添加图层
   * @param layers 图层
   * @returns
   */
  addLayer(...layers: Layer[]) {
    this._view.add(...layers)
    return this
  }

  /**
   * 移除图层
   * @param layers 图层
   * @returns this
   */
  removeLayer(...layers: Layer[]) {
    this._view.remove(...layers)
    return this
  }

  /**清空画布 */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  /**渲染画布 */
  render() {
    const timer = now()
    const delta = this._clock.getDelta()

    this.autoClear && this.clearCanvas()

    this._view[RENDER]({ delta, timer })
  }

  /**销毁 */
  destroy() {
    this._view.dispose()

    this.div.removeChild(this.canvas)
    this.div.classList.remove(MARK_MAP_CLASSNAME)

    this._disposeCancels.forEach(func => {
      func()
    })
  }

  private _initCanvasSize() {
    const { div, canvas } = this
    const rect = div.getBoundingClientRect()

    canvas.width = rect.width * this._devicePixelRatio
    canvas.height = rect.height * this._devicePixelRatio
  }

  private _initCanvas() {
    const { div, canvas } = this

    canvas.classList.add(MARK_MAP_CLASSNAME + '-canvas')
    div.appendChild(canvas)
    this._initCanvasSize()

    const resizeObserver = new ResizeObserver(entries => {
      this._initCanvasSize()
    })

    resizeObserver.observe(div)

    this._disposeCancels.push(() => {
      resizeObserver.unobserve(div)
    })
  }
}
