const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

function renderParticle(particle) {
  ctx.beginPath()
  ctx.arc(particle.r.x, particle.r.y, particle.radius, 0, 2*Math.PI)
  ctx.fillStyle = "white"
  ctx.fill()
  ctx.strokeStyle = "white"
  ctx.stroke()
}

function render() {
  ctx.clearRect(0, 0, W, H)
  for (let particle of particles) {
    renderParticle(particle)
  }
}
