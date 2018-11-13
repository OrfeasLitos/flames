const RADIUS = 30
const N = 100
const G = 10
const SPEED = 0.001

const W = 600
const H = 600

const boundingBox = new Rect(new Vector(0, 0), new Vector(W, H))

let t = new Date() | 0

const particles = []

const img = new Image()

function genesis() {
  for (let i = 0; i < N; i++) {
    const pos = new Vector(W/2, H/2 - Math.random()*H/2)
    const particle = new Particle(pos, RADIUS)
    particles.push(particle)
  }
}

function rebirth(id) {
  particles[id] = new Particle(new Vector(W/2, H/2), RADIUS)
}


function integrateParticle(particle, id, dt) {
  const a = new Vector(0, -G)
  particle.u = particle.u.add(a.scale(dt))
  particle.r = particle.r.add(particle.u.scale(dt))

  if (!boundingBox.intersectsCircle(particle)) {
    rebirth(id)
  }
}

function integrate() {
  render()
  let dt = (new Date() | 0) - t
  t += dt
  dt *= SPEED

  for (let i in particles) {
    integrateParticle(particles[i], i, dt)
  }

  requestAnimationFrame(integrate)
}

function startAnimation() {
  genesis()
  integrate()
}

img.onload = startAnimation
img.src = "particle.png"
