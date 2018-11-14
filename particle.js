const MAX_SPREAD = 20
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
  }
}
