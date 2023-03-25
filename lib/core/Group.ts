import { Matrix3 } from 'lib/math/Matrix3'
import { Core, ICoreOptions } from 'lib/core/Core'
import { MATRIX_WORLD } from 'lib/utils/const'

export interface IGroupOptions extends ICoreOptions {}

export class Group extends Core {
  override get type() {
    return 'Group'
  }

  private _parent: Core | undefined

  private _matrixWorld: Matrix3 | undefined

  // get [MATRIX_WORLD]() {
  //   this.updateMatrix()
  // }

  private _children: Group[] = []

  private _sortChildren: Group[] | undefined

  /**子节点 */
  get children() {
    if (!this._sortChildren) {
      this._sortChildren = this._getSortChildren()
    }
    return this._sortChildren.slice(0)
  }

  constructor(options?: IGroupOptions) {
    super(options)
  }

  override clearMatrix(): void {
    super.clearMatrix()
    this._matrixWorld = undefined
    this._children.forEach(child => child.clearMatrix)
  }

  updateMatrixWorld() {}

  private _getSortChildren() {
    const children = this._children.slice(0)

    children.sort((a, b) => a.zIndex - b.zIndex)

    return children
  }
}
