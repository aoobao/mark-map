/**2维向量或者坐标 */
export class Vector2 {
  private _x = 0
  private _y = 0
  readonly type = 'Vector2'

  /**
   * x轴坐标
   */
  get x() {
    return this._x
  }
  /**
   * 设置x轴坐标
   */
  set x(value) {
    this._x = value
  }
  /**
   * y轴坐标
   */
  get y() {
    return this._y
  }
  /**
   * 设置y轴坐标
   */
  set y(value) {
    this._y = value
  }

  /**
   * 返回两个向量的叠加
   * @param vec1 向量1
   * @param vec2 向量2
   * @returns 返回vec = vec1+vec2
   */
  static addVectors(vec1: Vector2, vec2: Vector2) {
    return vec1.clone().add(vec2)
  }

  /**
   * 两个坐标相减
   * @param target 被减坐标
   * @param vec 要减去的坐标
   * @returns 返回vec = target-vec
   */
  static subVectors(target: Vector2, vec: Vector2) {
    return target.clone().sub(vec)
  }

  /**
   * 根据数组实例化坐标对象
   * @param array [x,y]
   * @returns vec(x,y)
   */
  static parseFromArray(array: number[]) {
    const vec = new Vector2()
    vec.x = array[0] || 0
    vec.y = array[1] || 0

    return vec
  }

  /**
   * 2维向量
   * @param x x轴
   * @param y y轴
   */
  constructor(x?: number | [number, number] | Vector2, y?: number) {
    if (typeof x === 'number') {
      this.x = x || 0
      this.y = y || 0
    } else if (x instanceof Vector2) {
      this.x = x.x
      this.y = x.y
    } else if (Array.isArray(x)) {
      this.x = x[0] || 0
      this.y = x[1] || 0
    } else {
      this.x = 0
      this.y = y || 0
    }
  }

  /**
   * 设置向量x,y坐标
   * @param x x轴坐标
   * @param y y轴坐标
   * @returns this
   */
  set(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }

  /**
   * 复制目标vec的x,y
   * @param vec 目标向量
   * @returns this
   */
  copy(vec: Vector2) {
    this.x = vec.x
    this.y = vec.y
    return this
  }

  /**
   * 返回一个完全相同的新向量
   * @returns new Vectors
   */
  clone() {
    return new Vector2(this.x, this.y)
  }

  /**
   * 向量相加
   * @param vec 向量
   * @returns this
   */
  add(vec: Vector2) {
    this.x += vec.x
    this.y += vec.y

    return this
  }

  /**
   * x,y同时增加数值num
   * @param num
   * @returns this
   */
  addValue(num: number) {
    this.x += num
    this.y += num
    return this
  }

  /**
   * 向量相减
   * @param vec 向量
   * @returns this
   */
  sub(vec: Vector2) {
    this.x -= vec.x
    this.y -= vec.y
    return this
  }

  /**
   * 向量相乘
   * @param vec 向量
   * @returns this
   */
  multiply(vec: Vector2) {
    this.x *= vec.x
    this.y *= vec.y
    return this
  }

  /**
   * 向量缩放.x,y同时乘以scalar
   * @param scalar 缩放值
   * @returns this
   */
  multiplyScalar(scalar: number) {
    this.x *= scalar
    this.y *= scalar

    return this
  }

  /**
   * 向量相除
   * @param vec 向量
   * @returns this
   */
  divide(vec: Vector2) {
    this.x /= vec.x
    this.y /= vec.y

    return this
  }

  /**
   * 向量除以缩放值
   * @param scalar 缩放值
   * @returns this
   */
  divideScalar(scalar: number) {
    return this.multiplyScalar(1 / scalar)
  }

  /**
   * 向量点乘 x*vec.x+y*vec.y
   * @param vec 向量
   * @returns 返回点乘标量值
   */
  dot(vec: Vector2) {
    return this.x * vec.x + this.y * vec.y
  }

  /**
   * 向量叉乘 :
   * x * vec.y - y * vec.x
   * @param vec 向量
   * @returns 返回向量叉乘值
   */
  cross(vec: Vector2) {
    return this.x * vec.y - this.y * vec.x
  }

  /**
   * 向量长度的平方
   * @returns x*x+y*y
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y
  }

  /**
   * 向量长度
   * @returns 向量长度值
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * 归一化(length = 1)
   * @returns 归一化的向量方向
   */
  normalize() {
    return this.divideScalar(this.length() || 1)
  }

  /**
   * 向量取整
   * @returns this
   */
  round() {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    return this
  }
  /**
   * 向量四舍五入
   * @param decimal 保留小数位数
   */
  toFixed(decimal = 0) {
    this.x = parseFloat(this.x.toFixed(decimal))
    this.y = parseFloat(this.y.toFixed(decimal))

    return this
  }

  /**
   * 向上取整 Math.ceil
   * @returns this
   */
  ceiling() {
    this.x = Math.ceil(this.x)
    this.y = Math.ceil(this.y)

    return this
  }

  /**
   * 两个坐标取小值
   * @param vec 坐标
   * @returns this
   */
  min(vec: Vector2) {
    this.x = Math.min(this.x, vec.x)
    this.y = Math.min(this.y, vec.y)
    return this
  }

  /**
   * 坐标取最大值
   * @param vec 坐标
   * @returns this
   */
  max(vec: Vector2) {
    this.x = Math.max(this.x, vec.x)
    this.y = Math.max(this.y, vec.y)

    return this
  }

  /**
   * 向量是否相同
   * @param vec 向量
   * @returns 是否相同
   */
  equals(vec: Vector2) {
    return vec.x === this.x && vec.y === this.y
  }

  /**
   * 坐标转数组 [x,y]
   * @returns [x,y]
   */
  toArray(): [number, number] {
    return [this.x, this.y]
  }

  /**
   * 转字符串
   * @returns x,y
   */
  toString() {
    return `${this.x},${this.y}`
  }
}
