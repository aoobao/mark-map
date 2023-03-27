import { ILayerRenderEvent } from 'lib/types'
import { getAlpha } from 'lib/utils/common'
import { GET_SORT_CHILDREN, PARENT, RENDER, TO_CUSTOM_RENDER } from '../../utils/const'
import { Core, ICoreOptions } from '../Core'
import { Group } from '../Group'
import { View } from '../View'

export interface ILayerOptions extends ICoreOptions {}

export class Layer extends Group {
  override get type() {
    return 'Layer'
  }

  [PARENT]: View | undefined

  constructor(opt?: ILayerOptions) {
    super(opt)
  }

  [TO_CUSTOM_RENDER]?: (options: ILayerRenderEvent) => void;

  /**
   * 图层渲染(内部调用)
   * @param options
   */
  [RENDER](options: ILayerRenderEvent) {
    if (!this.visible) return

    const alpha = getAlpha(this.alpha, options.alpha)
    this.updateMatrixWorld()

    this[TO_CUSTOM_RENDER] && this[TO_CUSTOM_RENDER]({ ...options, alpha })

    const children = this[GET_SORT_CHILDREN]()

    for (let i = 0; i < children.length; i++) {
      const child = children[i]

      child[RENDER]({ ...options })
    }
  }
}
