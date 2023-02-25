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
  })

  // it('vector ')
})
