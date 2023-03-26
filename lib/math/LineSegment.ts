import { Vector2 } from './Vector2'

export class LineSegment {
  start: Vector2
  end: Vector2

  constructor(start: Vector2, end: Vector2) {
    this.start = start
    this.end = end
  }

  length() {
    return Vector2.subVectors(this.end, this.start).length()
  }
}
