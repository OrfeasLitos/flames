const RADIUS = 30
const N = 100
const G = 10
const SPEED = 0.001

let W, H

let boundingBox = new Rect(new Vector(0, 0), new Vector(W, H))
let t = new Date() | 0

let particles = []

let running = !document.hidden

window.addEventListener("resize", initializeDimensions)

function initializeDimensions() {
  W = window.innerWidth
  H = window.innerHeight
  canvas.width = W
  canvas.height = H
  particles = []
  boundingBox = new Rect(new Vector(0, 0), new Vector(W, H))
  genesis()
}

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
  if (running) {
    render()
    let dt = (new Date() | 0) - t
    t += dt
    dt *= SPEED

    for (let i in particles) {
      integrateParticle(particles[i], i, dt)
    }
    requestAnimationFrame(integrate)
  }
}

function pause() {
  running = false
}

function play() {
  t = (new Date() | 0)
  running = true
  integrate()
}

function handleVisibilityChange() {
  if (document.hidden) {
    pause();
  } else {
    play();
  }
}

document.addEventListener("visibilitychange", handleVisibilityChange);

initializeDimensions()
integrate()
