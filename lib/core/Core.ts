import { generateUUID } from '../utils'

export interface ICoreOptions {
  id?: string
}

export class Core {
  readonly type = 'Core'

  readonly id: string

  constructor(options?: ICoreOptions) {
    const opt = options || {}
    this.id = opt.id || generateUUID()
    
  }
}
