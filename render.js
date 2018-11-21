const gamma = require("gamma-distribution")

const GAMMA_K = 1.9
const GAMMA_THETA = 1
const SCALE = 5

window.IMGS_NO = 2

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const img = []
const imgLoaded = []
const imgBackground = new Image()
imgBackground.src = 'background.jpg'

/*
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
    // opacity += particle.fade
    opacity = clamp(0, opacity, 1)
  }
  return opacity
}
*/

function renderParticle(particle) {
  const x = particle.r.x - particle.radius
  const y = particle.r.y - particle.radius
  const size = 2*particle.radius

  ctx.save()

  ctx.translate(particle.r.x, particle.r.y)
  ctx.rotate(particle.theta)
  ctx.translate(-particle.radius, -particle.radius)
  ctx.globalAlpha = particle.opacity // getOpacity(particle)
  ctx.drawImage(img[particle.spriteIndex], 0, 0, size, size)
  ctx.beginPath()
  ctx.arc(particle.r.x, particle.r.y, particle.radius, 0, 2*Math.PI)
  ctx.strokeStyle = "rgba(0,0,0,0)"
  ctx.stroke()

  ctx.restore()
}

window.render = function () {
  const imgsLoaded = imgLoaded.every(x => x)

  if (imgsLoaded) {
    ctx.clearRect(0, 0, W, H)
    ctx.drawImage(imgBackground, 0, 0, imgBackground.width, imgBackground.height)
    for (const particle of particles) {
      renderParticle(particle)
    }
  }
}

for (let i = 0; i < IMGS_NO; i++) {
  const image = new Image()
  img.push(image)
  imgLoaded.push(false)

  image.onload = function () {
    imgLoaded[i] = true
  }
  image.src = "particle" + i + ".png"
}
imgLoaded.push(false)

imgBackground.onload = function () {
  imgLoaded[IMGS_NO] = true
}
