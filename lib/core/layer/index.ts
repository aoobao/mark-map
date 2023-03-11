import { PARENT } from '../../utils/const'
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
}
