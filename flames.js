const RADIUS = 30
const N = 100
const G = 10
const SPEED = 0.001

let W = 600
let H = 600

const boundingBox = new Rect(new Vector(0, 0), new Vector(W, H))
let t = new Date() | 0

let particles = []

window.addEventListener("resize", () => {
  W = window.innerWidth
  H = window.innerHeight
  particles = []
  genesis()
})

function genesis() {
  for (let i = 0; i < N; i++) {
    const pos = new Vector(W/2, H - Math.random()*H - RADIUS)
    const particle = new Particle(pos, RADIUS)
    particles.push(particle)
  }
}

function rebirth(id) {
  particles[id] = new Particle(new Vector(W/2, H - RADIUS), RADIUS)
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

genesis()
integrate()
