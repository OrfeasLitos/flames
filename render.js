const gamma = require("gamma-distribution")

const GAMMA_K = 1.9
const GAMMA_THETA = 1
const SCALE = 5

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const img = new Image()
let imgLoaded = false

function clamp(value, min, max) {
  return (value <= min) ? min :
         (value >= max) ? max :
          value
}

function getOpacity(particle) {
  const y = particle.r.y
  const range = H - particle.radius
  const scale = SCALE*(range - y)/range
  let opacity

  if (y >= range || y <= -particle.radius) {
    opacity = 0
  } else {
    const amp = 1/((GAMMA_K - 1) * GAMMA_THETA)
    opacity = amp*gamma.pdf(scale, GAMMA_K, GAMMA_THETA)
    opacity += particle.fade
    opacity = clamp(opacity, 0, 1)
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
img.src = "betterParticle.png"
