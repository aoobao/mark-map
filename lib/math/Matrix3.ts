import { Vector2 } from './Vector2'

export type Matrix3Tuple = [number, number, number, number, number, number, number, number, number]

/**
 * 3x3 matriix copy with three
 */
export class Matrix3 {
  elements: Matrix3Tuple

  constructor() {
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]
  }

  /**
   * 行主序的顺序赋值
   * n11,n12,n13
   * n21,n22,n23
   * n31,n32,n33
   * @param n11
   * @param n12
   * @param n13
   * @param n21
   * @param n22
   * @param n23
   * @param n31
   * @param n32
   * @param n33
   * @returns this
   */
  set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number) {
    const te = this.elements

    te[0] = n11
    te[1] = n21
    te[2] = n31
    te[3] = n12
    te[4] = n22
    te[5] = n32
    te[6] = n13
    te[7] = n23
    te[8] = n33

    return this
  }

  /**
   * 还原标准矩阵
   * @returns this
   */
  identity() {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1)

    return this
  }

  /**
   * 复制矩阵
   * @param m 目标矩阵
   * @returns this
   */
  copy(m: Matrix3) {
    const te = this.elements
    const me = m.elements

    te[0] = me[0]
    te[1] = me[1]
    te[2] = me[2]
    te[3] = me[3]
    te[4] = me[4]
    te[5] = me[5]
    te[6] = me[6]
    te[7] = me[7]
    te[8] = me[8]

    return this
  }

  /**
   * 将 a x b 赋值给自己
   * @param a
   * @param b
   * @returns this
   */
  multiplyMatrices(a: Matrix3, b: Matrix3) {
    const ae = a.elements
    const be = b.elements
    const te = this.elements

    const a11 = ae[0],
      a12 = ae[3],
      a13 = ae[6]
    const a21 = ae[1],
      a22 = ae[4],
      a23 = ae[7]
    const a31 = ae[2],
      a32 = ae[5],
      a33 = ae[8]

    const b11 = be[0],
      b12 = be[3],
      b13 = be[6]
    const b21 = be[1],
      b22 = be[4],
      b23 = be[7]
    const b31 = be[2],
      b32 = be[5],
      b33 = be[8]

    te[0] = a11 * b11 + a12 * b21 + a13 * b31
    te[3] = a11 * b12 + a12 * b22 + a13 * b32
    te[6] = a11 * b13 + a12 * b23 + a13 * b33

    te[1] = a21 * b11 + a22 * b21 + a23 * b31
    te[4] = a21 * b12 + a22 * b22 + a23 * b32
    te[7] = a21 * b13 + a22 * b23 + a23 * b33

    te[2] = a31 * b11 + a32 * b21 + a33 * b31
    te[5] = a31 * b12 + a32 * b22 + a33 * b32
    te[8] = a31 * b13 + a32 * b23 + a33 * b33

    return this
  }
  /**
   * this x m
   * @param m matrix3
   * @returns this
   */
  multiply(m: Matrix3) {
    return this.multiplyMatrices(this, m)
  }

  /**
   * m * this
   * @param m matrix3
   * @returns this
   */
  premultiply(m: Matrix3) {
    return this.multiplyMatrices(m, this)
  }

  /**
   * 逆矩阵
   * @returns this
   */
  invert() {
    const te = this.elements,
      n11 = te[0],
      n21 = te[1],
      n31 = te[2],
      n12 = te[3],
      n22 = te[4],
      n32 = te[5],
      n13 = te[6],
      n23 = te[7],
      n33 = te[8],
      t11 = n33 * n22 - n32 * n23,
      t12 = n32 * n13 - n33 * n12,
      t13 = n23 * n12 - n22 * n13,
      det = n11 * t11 + n21 * t12 + n31 * t13

    if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0)

    const detInv = 1 / det

    te[0] = t11 * detInv
    te[1] = (n31 * n23 - n33 * n21) * detInv
    te[2] = (n32 * n21 - n31 * n22) * detInv

    te[3] = t12 * detInv
    te[4] = (n33 * n11 - n31 * n13) * detInv
    te[5] = (n31 * n12 - n32 * n11) * detInv

    te[6] = t13 * detInv
    te[7] = (n21 * n13 - n23 * n11) * detInv
    te[8] = (n22 * n11 - n21 * n12) * detInv

    return this
  }

  /**
   * 转置矩阵
   * @returns this
   */
  transpose() {
    let tmp
    const m = this.elements

    tmp = m[1]
    m[1] = m[3]
    m[3] = tmp
    tmp = m[2]
    m[2] = m[6]
    m[6] = tmp
    tmp = m[5]
    m[5] = m[7]
    m[7] = tmp

    return this
  }

  /**
   * 缩放
   * @param sx
   * @param sy
   * @returns this
   */
  scale(sx: number, sy: number) {
    this.premultiply(_m3.makeScale(sx, sy))

    return this
  }

  /**
   * 旋转
   * @param theta
   * @returns
   */
  rotate(theta: number) {
    this.premultiply(_m3.makeRotation(-theta))

    return this
  }

  /**
   * 平移
   * @param tx x轴方向平移
   * @param ty y轴方向平移
   * @returns
   */
  translate(tx: number, ty: number) {
    this.premultiply(_m3.makeTranslation(tx, ty))

    return this
  }

  /**
   * 标准矩阵 x 偏移量x,y
   * @param x x轴方向偏移
   * @param y y轴方向偏移
   * @returns
   */
  makeTranslation(x: number, y: number) {
    this.set(1, 0, x, 0, 1, y, 0, 0, 1)

    return this
  }

  /**
   * 标准矩阵 x 旋转theta
   * @param theta 弧度
   * @returns this
   */
  makeRotation(theta: number) {
    // counterclockwise

    const c = Math.cos(theta)
    const s = Math.sin(theta)

    this.set(c, -s, 0, s, c, 0, 0, 0, 1)

    return this
  }

  /**
   * 标准矩阵 x 缩放
   * @param x x轴方向缩放
   * @param y y轴方向缩放
   * @returns
   */
  makeScale(x: number, y: number) {
    this.set(x, 0, 0, 0, y, 0, 0, 0, 1)

    return this
  }

  /**
   * 判断两个矩阵是否相等
   * @param matrix matrix
   * @returns
   */
  equals(matrix: Matrix3) {
    const te = this.elements
    const me = matrix.elements

    for (let i = 0; i < 9; i++) {
      if (te[i] !== me[i]) return false
    }

    return true
  }

  /**
   * 从读取数组(数组为列主序)
   * @param array
   * @param offset 偏移值
   * @returns
   */
  fromArray(array: number[], offset = 0) {
    for (let i = 0; i < 9; i++) {
      this.elements[i] = array[i + offset]
    }

    return this
  }

  clone() {
    return new Matrix3().fromArray(this.elements)
  }

  compose(position: Vector2, scale: Vector2, theta: number) {
    return this.identity().translate(position.x, position.y).scale(scale.x, scale.y).rotate(theta)
  }
}

const _m3 = new Matrix3()
