// export const Symbol_Position = Symbol('position')
// export const Symbol_Scale = Symbol('scale')
// export const Symbol_theta = Symbol('theta')

/**自身矩阵 */
export const MATRIX_SELF = Symbol('matrix')
/**父节点 */
export const PARENT = Symbol('parent')
/**世界矩阵 */
export const MATRIX_WORLD = Symbol('matrix_world')

// 渲染方法名
export const RENDER = Symbol('render')

// 子类各自实现的不同渲染
export const TO_CUSTOM_RENDER = Symbol('to_custom_render')

// 根据zIndex严格排序的children 方法名
export const GET_SORT_CHILDREN = Symbol('get_sort_children')

// 默认zIndex
export const DEFAULT_Z_INDEX = 100

export const MARK_MAP_CLASSNAME = 'mark-map'

