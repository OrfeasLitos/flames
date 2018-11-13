const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

function renderParticle(particle) {
  const x = particle.r.x - particle.radius
  const y = particle.r.y - particle.radius
  const size = 2*particle.radius
  ctx.drawImage(img, x, y, size, size)
  ctx.beginPath()
  ctx.arc(particle.r.x, particle.r.y, particle.radius, 0, 2*Math.PI)
  ctx.strokeStyle = "rgba(0,0,0,0)"
  ctx.stroke()
}

function render() {
  ctx.clearRect(0, 0, W, H)
  for (let particle of particles) {
    renderParticle(particle)
  }
}
