import { now } from "lib/utils/index"

// copy from three.js
export class Clock {
  autoStart: boolean
  startTime = 0
  oldTime = 0
  elapsedTime = 0
  running = false

  constructor(autoStart = true) {
    this.autoStart = autoStart
  }

  start() {
    this.startTime = now()

    this.oldTime = this.startTime
    this.elapsedTime = 0
    this.running = true
  }
  stop() {
    this.getElapsedTime()
    this.running = false
    this.autoStart = false
  }
  getElapsedTime() {
    this.getDelta()
    return this.elapsedTime
  }
  getDelta() {
    let diff = 0

    if (this.autoStart && !this.running) {
      this.start()
      return 0
    }

    if (this.running) {
      const newTime = now()

      diff = (newTime - this.oldTime) / 1000
      this.oldTime = newTime

      this.elapsedTime += diff
    }

    return diff
  }
}

