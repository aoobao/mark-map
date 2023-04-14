import { NETWORK_STATE } from 'lib/types'
import { downloadImage } from 'lib/utils/common'
import { TO_CUSTOM_RENDER } from 'lib/utils/const'
import { ILayerOptions, Layer } from './default'

export interface IImageLayerOptions extends ILayerOptions {}

export class ImageLayer extends Layer {
  override get type() {
    return 'ImageLayer'
  }

  private _image?: HTMLImageElement

  private _status: NETWORK_STATE = NETWORK_STATE.INIT

  /**图片是否加载完成 */
  get isComplete() {
    return this._status === NETWORK_STATE.SUCCESS
  }

  get src() {
    if (!this._image) return null

    return this._image.src
  }

  set src(href: string | null) {
    if (!href) {
      this._image = undefined
      this._status = NETWORK_STATE.INIT
      return
    }

    if (this.src === href) return

    this._status = NETWORK_STATE.WAIT
    const img = (this._image = new Image())

    img.onload = () => {
      if (this._image !== img) return
      this._status = NETWORK_STATE.SUCCESS
    }

    img.onerror = () => {
      if (img !== this._image) return
      this._status = NETWORK_STATE.ERROR
    }

    img.onabort = () => {
      if (img !== this._image) return
      this._status = NETWORK_STATE.ABORT
    }

    img.src = href
  }

  get width() {
    if (!this._image) return 0

    return this._image.naturalWidth
  }

  get height() {
    if (!this._image) return 0
    return this._image.naturalHeight
  }

  constructor(opt?: IImageLayerOptions) {
    super(opt)

    this[TO_CUSTOM_RENDER] = options => {
      // options.
      if (!this.isComplete) return

      const { ctx, alpha } = options

      ctx.drawImage(this._image!, 0, 0, this.width, this.height)
    }
  }
}
