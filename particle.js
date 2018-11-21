const MAX_SPREAD = 20
const MAX_ACC_DEV = 15
const MAX_FADE_DEV = 0.5

class Particle {
  constructor(r, radius, theta = 0) {
    this.r = r
    this.radius = radius
    this.theta = theta
    this.m = 1

    this.u = new Vector(
      Math.random()*MAX_SPREAD - MAX_SPREAD/2,
      Math.random()*MAX_SPREAD - MAX_SPREAD/2
    )

    this.a = new Vector(0,
      Math.random()*MAX_ACC_DEV - MAX_ACC_DEV/2
    )

    this.lifetime = 0
    this.appearLifetime = 1 + Math.random() * 0.5
    this.disappearLifetime = 2 + Math.random() * 0.5
    this.totalLifetime = this.appearLifetime + this.disappearLifetime
    this.opacity = 0
    this.spriteIndex = Math.floor(Math.random() * IMGS_NO)
  }
}
