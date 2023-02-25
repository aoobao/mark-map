import { generateUUID } from '../index'

describe('utils func test', () => {
  it('generate uuid not equals', () => {
    const first = generateUUID()
    const second = generateUUID()

    expect(first !== second).toBe(true)
  })
})
