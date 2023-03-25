import { ILayerRenderEvent } from 'lib/types'
import { PARENT, RENDER } from '../../utils/const'
import { Core, ICoreOptions } from '../Core'
import { View } from '../View'

export interface ILayerOptions extends ICoreOptions {}

export class Layer extends Core {
  override get type() {
    return 'Layer'
  }

  [PARENT]: View | undefined

  constructor(opt?: ILayerOptions) {
    super(opt)
  }

  /**
   * 图层渲染(内部调用)
   * @param options 
   */
  [RENDER](options: ILayerRenderEvent) {
    const alpha = options.alpha * this.alpha
  }
}
