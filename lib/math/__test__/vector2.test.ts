import { Vector2 } from '../Vector2'

describe('vector2 test', () => {
  it('vector constructor', () => {
    const vec = new Vector2()

    expect({ x: vec.x, y: vec.y }).toEqual({ x: 0, y: 0 })

    const vec2 = new Vector2(vec)

    expect(vec2).not.toBe(vec)
    expect(vec2).toEqual(vec)

    const vec3 = new Vector2(vec.x, vec.y)

    expect(vec3).not.toBe(vec)
    expect(vec3).toEqual(vec)

    const vec4 = new Vector2([vec.x, vec.y])

    expect(vec4).not.toBe(vec)
    expect(vec4).toEqual(vec)
  })

  it('vector properties', () => {
    const vec = new Vector2()

    vec.x = 1
    vec.y = 2

    const x = vec.x
    const y = vec.y

    expect(vec).toEqual(new Vector2(1, 2))
    expect({ x: vec.x, y: vec.y }).toEqual({ x, y })
  })

  it('vector static methods', () => {
    const vec1 = new Vector2(3, 2)
    const vec2 = new Vector2(2, 3)
    const add = Vector2.addVectors(vec1, vec2)

    expect(add).toEqual(new Vector2(5, 5))
    expect(vec1).toEqual(new Vector2(3, 2))
    expect(vec2).toEqual(new Vector2(2, 3))

    const sub = Vector2.subVectors(vec1, vec2)
    expect(sub).toEqual(new Vector2(1, -1))

    const arr = Vector2.parseFromArray(vec1.toArray())

    expect(arr).toEqual(vec1)

    const arr1 = Vector2.parseFromArray([])
    expect(arr1).toEqual(new Vector2())
  })

  it('vector methods', () => {
    const vec = new Vector2(1, 2)

    const vec1 = vec.clone().add(new Vector2(1, 2))

    expect(vec1).toEqual(new Vector2(2, 4))

    const v = vec.addValue(1)
    expect(v).toBe(vec)
    expect(v).toEqual(new Vector2(2, 3))

    const vec2 = new Vector2(1.3, -1.6).ceiling()

    expect(vec2).toEqual(new Vector2(2, -1))

    v.copy(vec1)
    expect(v).toEqual(new Vector2(2, 4))

    const crossValue = v.cross(new Vector2(2, 5))
    expect(crossValue).toBe(2 * 5 - 4 * 2)

    v.divide(new Vector2(2, 1))
    expect(v).toEqual(new Vector2(1, 4))

    v.divideScalar(0.5)
    expect(v).toEqual(new Vector2(2, 8))

    const dotValue = v.dot(new Vector2(2, 1))

    expect(dotValue).toBe(v.x * 2 + v.y * 1)

    expect(v.equals(new Vector2(2, 8))).toBeTruthy()

    const lengthSq = v.lengthSq()

    expect(lengthSq).toBe(2 * 2 + 8 * 8)

    const length = v.length()

    expect(length).toBe(Math.sqrt(lengthSq))

    v.max(new Vector2(3, 3))
    expect(v).toEqual(new Vector2(3, 8))

    v.min(new Vector2(4, 5))
    expect(v).toEqual(new Vector2(3, 5))

    v.set(5, 6)
    expect(v).toEqual(new Vector2(5, 6))

    v.multiply(new Vector2(2, 0.5))
    expect(v).toEqual(new Vector2(10, 3))

    v.normalize()
    expect(v.length()).toBe(1)

    v.set(2, 3)
    v.multiplyScalar(2)
    expect(v).toEqual(new Vector2(4, 6))

    v.set(2.4, 3.6).round()

    expect(v).toEqual(new Vector2(2, 4))

    v.sub(new Vector2(-1, 1))
    expect(v).toEqual(new Vector2(3, 3))

    v.set(3.33333, 4.55555)

    v.toFixed(2)

    expect(v).toEqual(new Vector2(3.33, 4.56))

    const str = v.toString()
    expect(str).toBe('3.33,4.56')

    v.set(0, 0)
    v.normalize()
    expect(v).toEqual(new Vector2(0, 0))
  })
})
