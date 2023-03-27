import { TO_CUSTOM_RENDER } from 'lib/utils/const'
import { ILayerOptions, Layer } from './default'

export interface IImageLayerOptions extends ILayerOptions {}

export class ImageLayer extends Layer {
  override get type() {
    return 'ImageLayer'
  }

  private _image?: HTMLImageElement

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

    this[TO_CUSTOM_RENDER] = options => {}
  }
}
