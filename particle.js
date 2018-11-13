const MAX_SPREAD = 20
class Particle {
  constructor(r, radius) {
    this.r = r
    this.radius = radius
    this.m = 1

    this.u = new Vector(
      Math.random()*MAX_SPREAD - MAX_SPREAD/2,
      Math.random()*MAX_SPREAD - MAX_SPREAD/2
    )
  }
}
