window.IMGS_NO = 2

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const img = []
const imgLoaded = []

function renderParticle(particle) {
  const x = particle.r.x - particle.radius
  const y = particle.r.y - particle.radius
  const size = 2*particle.radius

  ctx.save()

  ctx.translate(particle.r.x, particle.r.y)
  ctx.rotate(particle.theta)
  ctx.translate(-particle.radius, -particle.radius)
  ctx.globalAlpha = particle.opacity
  ctx.drawImage(img[particle.spriteIndex], 0, 0, size, size)
  ctx.beginPath()
  ctx.arc(particle.r.x, particle.r.y, particle.radius, 0, 2*Math.PI)
  ctx.strokeStyle = "rgba(0,0,0,0)"
  ctx.stroke()

  ctx.restore()
}

function render() {
  const imgsLoaded = imgLoaded.every(x => x)

  if (imgsLoaded) {
    ctx.clearRect(0, 0, W, H)
    const aspectRatio1 = W / imgBackground.width
    const aspectRatio2 = H / imgBackground.height
    let aspectRatio

    if (aspectRatio1 * imgBackground.height < H) {
      aspectRatio = aspectRatio1
    }
    else {
      aspectRatio = aspectRatio2
    }
    const imageW = aspectRatio * imgBackground.width
    const imageH = aspectRatio * imgBackground.height

    ctx.drawImage(
      imgBackground,
      W / 2 - imageW / 2, H / 2 - imageH / 2,
      imageW, imageH
    )
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

const imgBackground = new Image()
imgBackground.src = 'background.jpg'
imgLoaded.push(false)

imgBackground.onload = function () {
  imgLoaded[IMGS_NO] = true
}
