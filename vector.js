class Vector {
  constructor(x, y, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  get u() {
    return this.x
  }

  get v() {
    return this.y
  }

  set u(u) {
    this.x = u
  }

  set v(v) {
    this.y = v
  }

  perspectiveProject(planeDistance, fov) {
    return new Vector(
      this.x / (fov * this.z + planeDistance),
      this.y / (fov * this.z + planeDistance),
      this.z
    )
  }

  scale(s) {
    return new Vector(
      s * this.x,
      s * this.y,
      s * this.z
    )
  }

  add(other) {
    return new Vector(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z
    )
  }

  subtract(other) {
    return this.add(other.flip())
  }

  flipVertical() {
    return new Vector(this.x, -this.y, this.z)
  }

  flipHorizontal() {
    return new Vector(-this.x, this.y, this.z)
  }

  flip() {
    return this.scale(-1)
  }

  rotateX(theta) {
    return new Vector(
      this.x,
      Math.cos(theta) * this.y - Math.sin(theta) * this.z,
      Math.sin(theta) * this.y + Math.cos(theta) * this.z
    )
  }

  rotateY(theta) {
    return new Vector(
      Math.cos(theta) * this.x + Math.sin(theta) * this.z,
      this.y,
      -Math.sin(theta) * this.x + Math.cos(theta) * this.z
    )
  }

  rotateZ(theta) {
    return new Vector(
      Math.cos(theta) * this.x - Math.sin(theta) * this.y,
      Math.sin(theta) * this.x + Math.cos(theta) * this.y,
      this.z
    )
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  normalize() {
    return this.scale(1 / this.length())
  }

  cross(other) {
    return new Vector(
      this.y * other.z - this.z * other.y,
      -(this.x * other.z - this.z * other.x),
      this.x * other.y - this.y * other.x
    )
  }

  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z
  }
}
