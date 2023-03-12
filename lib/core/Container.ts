import { RENDER } from '../utils/const'
import { View } from './View'

export interface IContainerOptions {
  /** 挂载的dom节点 */
  dom: HTMLDivElement
  zoom?: number
}

export class Container {
  private _view = new View()

  private div: HTMLDivElement

  private canvas: HTMLCanvasElement

  private ctx: CanvasRenderingContext2D

  constructor(opt: IContainerOptions) {
    this.div = opt.dom

    this.div.style.userSelect = 'none'
    this.div.style.position = 'relative'

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
  }

  private initCanvas() {
    const rect = this.div.getBoundingClientRect()
  }

  render() {
    this._view[RENDER]()
  }

  dispose() {}
}

function createDivElement(dom: HTMLDivElement) {
  const rect = dom.getBoundingClientRect()

  const div = document.createElement('div')

  div.style.width = rect.width + 'px'
  div.style.height = rect.height + 'px'
  div.style.position = 'relative'
}
