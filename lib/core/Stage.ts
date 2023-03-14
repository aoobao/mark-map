import { MARK_MAP_CLASSNAME, RENDER } from '../utils/const'
import { View } from './View'

export interface IStageOptions {
  /** 挂载的dom节点 */
  dom: HTMLDivElement
  zoom?: number
}

export class Stage {
  private _view = new View()

  private div: HTMLDivElement

  private canvas: HTMLCanvasElement

  private ctx: CanvasRenderingContext2D

  private _disposeCancels: Array<() => void> = []

  constructor(opt: IStageOptions) {
    this.div = opt.dom

    this.div.classList.add(MARK_MAP_CLASSNAME)

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!

    this._initCanvas()
  }

  private _initCanvas() {
    const { div, canvas } = this

    const rect = div.getBoundingClientRect()

    canvas.classList.add(MARK_MAP_CLASSNAME + '-canvas')
    canvas.width = rect.width
    canvas.height = rect.height

    div.appendChild(canvas)

    const resizeObserver = new ResizeObserver(entries => {
      console.log(entries)
    })

    resizeObserver.observe(div)

    this._disposeCancels.push(() => {
      resizeObserver.unobserve(div)
    })
  }

  render() {
    this._view[RENDER]()
  }

  destroy() {
    this._view.dispose()

    this.div.removeChild(this.canvas)
    this.div.classList.remove(MARK_MAP_CLASSNAME)

    this._disposeCancels.forEach(func => {
      func()
    })
  }
}
