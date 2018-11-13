class Rect {
  constructor(begin, end) {
    this.begin = begin
    this.end = end
  }

  intersectsCircle(circle) {
    return circle.r.x + circle.radius > this.begin.x
        && circle.r.x - circle.radius < this.end.x
        && circle.r.y + circle.radius > this.begin.y
        && circle.r.y - circle.radius < this.end.y
  }
}
