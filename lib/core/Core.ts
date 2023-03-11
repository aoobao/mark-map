import { Vector2 } from '../math'
import { Matrix3 } from '../math/Matrix3'
import { generateUUID, isNotNull } from '../utils'
import { DEFAULT_Z_INDEX, MATRIX_SELF } from '../utils/const'

export interface ICoreOptions {
  id?: string
  name?: string | symbol
  position?: Vector2 | [number, number]
  scale?: Vector2 | [number, number]
  theta?: number
  alpha?: number
  visible?: boolean
  zIndex?: number
}

export class Core {
  /**通过type字段获得对象的类 */
  get type() {
    return 'Core'
  }

  readonly id: string

  /**名称 */
  name?: string | symbol

  private _position: Vector2

  private _scale: Vector2

  private _theta: number

  private _matrix: Matrix3 | undefined

  /**透明度[0,1] 1表示不透明 */
  alpha = 1
  /**是否显示 */
  visible = true
  /**显示层级 */
  zIndex = DEFAULT_Z_INDEX

  /**x轴位置 */
  get x() {
    return this._position.x
  }

  /**x轴位置 */
  set x(v: number) {
    if (v !== this._position.x) {
      this._position.x = v
      this._matrix = undefined
    }
  }

  /**y轴位置 */
  get y() {
    return this._position.y
  }

  /**y轴位置 */
  set y(v) {
    if (v !== this._position.y) {
      this._position.y = v
      this._matrix = undefined
    }
  }

  /**x轴缩放 */
  get sx() {
    return this._scale.x
  }
  /**x轴缩放 */
  set sx(v) {
    if (this._scale.x !== v) {
      this._scale.x = v
      this._matrix = undefined
    }
  }
  /**y轴方向缩放 */
  get sy() {
    return this._scale.y
  }
  /**y轴方向缩放 */
  set sy(v) {
    if (v !== this._scale.y) {
      this._scale.y = v
      this._matrix = undefined
    }
  }
  /**设置缩放值(x,y缩放相同) */
  set scale(value: number) {
    this.sx = value
    this.sy = value
  }

  constructor(options?: ICoreOptions) {
    const opt = options || {}
    this.id = opt.id || generateUUID()
    this.name = opt.name
    this._position = new Vector2(opt.position)
    if (opt.scale) {
      this._scale = new Vector2(opt.scale)
    } else {
      this._scale = new Vector2(1, 1)
    }

    this._theta = opt.theta || 0

    if (isNotNull(opt.alpha)) this.alpha = opt.alpha

    if (opt.visible === false) this.visible = false

    if (isNotNull(opt.zIndex)) this.zIndex = opt.zIndex
  }

  /**
   * 获取物体当前的缩放平移旋转状态(框架内部调用)
   * @returns 返回物体当前的缩放旋转平移矩阵,
   */
  get [MATRIX_SELF]() {
    if (!this._matrix) {
      this._matrix = new Matrix3().compose(this._position, this._scale, this._theta)
    }

    return this._matrix
  }
}
