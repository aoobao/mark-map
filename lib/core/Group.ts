import { Matrix3 } from 'lib/math/Matrix3'
import { Core, ICoreOptions } from 'lib/core/Core'
import { GET_SORT_CHILDREN, MATRIX_SELF, MATRIX_WORLD, PARENT, RENDER, TO_CUSTOM_RENDER } from 'lib/utils/const'
import { IGroupRenderEvent } from 'lib/types'
import { getAlpha } from 'lib/utils/common'

export interface IGroupOptions extends ICoreOptions {}

export class Group extends Core {
  override get type() {
    return 'Group'
  }

  /**子节点 */
  private _children: Group[] = []
  /**排序后的子节点 zIndex 大的排在后面 ，避免在每次render的时候，对子节点重新排一次顺序 */
  private _sortedChildren: Group[] | undefined;

  [GET_SORT_CHILDREN]() {
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
  /**
   * 添加子对象
   * @param objects 等待添加的子对象
   * @returns this
   */
  add(...objects: Group[]) {
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
  remove(...objects: Group[]) {
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
   * 更新世界矩阵
   * @param force 是否强制更新
   * @returns 是否进行了更新
   */
  override updateMatrixWorld(force = false) {
    const update = super.updateMatrixWorld(force)

    if (update) {
      this.children.map(child => (child[MATRIX_WORLD] = undefined))
    }

    return update
  }

  [TO_CUSTOM_RENDER]?: (options: IGroupRenderEvent) => void;

  [RENDER](options: IGroupRenderEvent) {
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
