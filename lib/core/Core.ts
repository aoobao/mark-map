import { Vector2 } from '../math'
import { Matrix3 } from '../math/Matrix3'
import { generateUUID, isNotNull } from '../utils'
import { DEFAULT_Z_INDEX, MATRIX_SELF, MATRIX_WORLD, PARENT } from '../utils/const'

export interface ICoreOptions {
  id?: string
  name?: string
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
  name?: string

  private _position: Vector2

  private _scale: Vector2

  private _theta: number;

  /**
   * 自身矩阵会在自身发生变化时删除，等待下次需要调用时生成
   */
  [MATRIX_SELF]: Matrix3 | undefined;

  /**
   * 世界矩阵 = 父节点的世界矩阵 X 自身矩阵
   */
  [MATRIX_WORLD]: Matrix3 | undefined;

  /**父节点 */
  [PARENT]: Core | undefined

  /**透明度[0,1] 1表示不透明 允许超过1的值,最终透明度为父节点透明度*自身透明度的值渲染在画布上 */
  alpha = 1
  /**是否显示 */
  visible = true
  /**显示层级 */
  zIndex = DEFAULT_Z_INDEX

  /**子节点 */
  private _children: Core[] = []

  /**排序后的子节点 zIndex 大的排在后面 ，避免在每次render的时候，对子节点重新排一次顺序 */
  private _sortedChildren: Core[] | undefined

  private _getsortedChildren() {
    if (this._sortedChildren) {
      return this._sortedChildren
    } else {
      const children = this.children

      children.sort((a, b) => {
        return a.zIndex - b.zIndex
      })

      this._sortedChildren = children

      return this._sortedChildren
    }
  }

  get children() {
    return [...this._children]
  }

  /**x轴位置 */
  get x() {
    return this._position.x
  }

  /**x轴位置 */
  set x(v: number) {
    if (v !== this._position.x) {
      this._position.x = v
      this.clearMatrix()
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
      this.clearMatrix()
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
      this.clearMatrix()
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
      this.clearMatrix()
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
   * 添加子对象
   * @param objects 等待添加的子对象
   * @returns this
   */
  add(...objects: Core[]) {
    if (!objects.length) return this
    const object = objects[0]
    if (object[PARENT] && object[PARENT] === this) {
      console.warn('object is mount in self', object, this)
    } else {
      object[PARENT]?.remove(object) // 如果之前已经挂载在其他对象上的，取消挂载
      object[MATRIX_WORLD] = undefined // 设置世界矩阵为空，等下次渲染的时候重新计算
      this._children.push(object)
      this._sortedChildren = undefined
      object[PARENT] = this
    }

    if (objects.length > 1) {
      objects.slice(1).forEach(object => {
        this.add(object)
      })
    }

    return this
  }

  /**
   * 移除子节点
   * @param objects 要移除的对象
   */
  remove(...objects: Core[]) {
    if (!objects.length) return this
    const object = objects[0]

    if (object[PARENT] === this) {
      const index = this._children.indexOf(object)

      if (index > -1) {
        this._children.splice(index, 1)
        this._sortedChildren = undefined
      }
      object[MATRIX_WORLD] = undefined
      object[PARENT] = undefined
    } else {
      console.warn('object is not mount in self', object, this)
    }

    if (objects.length > 1) {
      objects.slice(1).forEach(object => {
        this.remove(object)
      })
    }

    return this
  }

  /**
   * 清除矩阵
   */
  clearMatrix() {
    this[MATRIX_SELF] = undefined

    this[MATRIX_WORLD] = undefined
  }

  /**
   * 更新自身矩阵
   * @param force 是否强制更新
   * @returns 是否进行了更新
   */
  updateMatrix(force = false) {
    if (!this[MATRIX_SELF] || force) {
      this[MATRIX_SELF] = new Matrix3().compose(this._position, this._scale, this._theta)

      return true
    }
    return false
  }

  /**
   * 更新世界矩阵
   * @param force 是否强制更新
   * @returns 是否进行了更新
   */
  updateMatrixWorld(force = false) {
    const updateSelf = this.updateMatrix()
    const matrix = this[MATRIX_SELF]!
    if (updateSelf || !this[MATRIX_WORLD] || force) {
      if (!this[PARENT]) {
        // 没有父节点的时候，自身矩阵就等于世界矩阵
        this[MATRIX_WORLD] = matrix.clone()
      } else {
        this[PARENT].updateMatrixWorld()
        const parentMatrixWorld = this[PARENT][MATRIX_WORLD]!

        this[MATRIX_WORLD] = new Matrix3().multiplyMatrices(parentMatrixWorld, matrix)
      }

      return true
    }

    return false
  }
}
