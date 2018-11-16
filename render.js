const BRIGHTEST = 0.7

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const img = new Image()
let imgLoaded = false

function getOpacity(particle) {
  const y = particle.r.y
  const range = H - particle.radius
  let opacity

  if (y > range) {
    opacity = 0
  } else if (y > range*BRIGHTEST) {
    const a = Math.PI/2/(range*(1-BRIGHTEST))
    opacity = Math.sin(a*(range - y))
  } else {
    opacity = 0
  }
  return opacity
}

function renderParticle(particle) {
  const x = particle.r.x - particle.radius
  const y = particle.r.y - particle.radius
  const size = 2*particle.radius

  ctx.save()

  ctx.translate(particle.r.x, particle.r.y)
  ctx.rotate(particle.theta)
  ctx.translate(-particle.radius, -particle.radius)
  ctx.globalAlpha = getOpacity(particle)
  ctx.drawImage(img, 0, 0, size, size)
  ctx.beginPath()
  ctx.arc(particle.r.x, particle.r.y, particle.radius, 0, 2*Math.PI)
  ctx.strokeStyle = "rgba(0,0,0,0)"
  ctx.stroke()

  ctx.restore()
}

function render() {
  if (imgLoaded) {
    ctx.clearRect(0, 0, W, H)
    for (let particle of particles) {
      renderParticle(particle)
    }
  }
}

function setImgLoaded() {
  imgLoaded = true
}

img.onload = setImgLoaded
img.src = "particle.png"
