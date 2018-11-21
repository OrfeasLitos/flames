const RADIUS = 30
const N = 100
const G = 10
const SPEED = 0.002

let W, H

let boundingBox = new Rect(new Vector(0, 0), new Vector(W, H))
let t = new Date() | 0

let particles = []

let running = !document.hidden
let animationFrameRequested = false

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
    const particle = new Particle(new Vector(0, -RADIUS), RADIUS, Math.random()*2*Math.PI)
    particle.totalLifetime = Math.random() * 50
    particles.push(particle)
  }
}

function rebirth(id) {
  const pos = new Vector(W/2 - RADIUS, 2*H/3 - RADIUS)
  particles[id] = new Particle(pos, RADIUS, Math.random()*2*Math.PI)
}

function integrateParticle(particle, id, dt) {
  const a = particle.a.add(new Vector(0, -G))
  particle.u = particle.u.add(a.scale(dt))
  particle.r = particle.r.add(particle.u.scale(dt))
  particle.lifetime += dt

  if (particle.lifetime <= particle.appearLifetime) {
    particle.opacity = Math.sin(particle.lifetime * (Math.PI / 2) / particle.appearLifetime)
  }
  else if (particle.lifetime <= particle.appearLifetime
         + particle.disappearLifetime) {
    particle.opacity = Math.cos((particle.lifetime - particle.appearLifetime) * (Math.PI / 2) / particle.disappearLifetime)
  }
  if (particle.lifetime > particle.totalLifetime) {
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
    animationFrameRequested = true
  } else {
    animationFrameRequested = false
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    running = false
  } else {
    t = (new Date() | 0)
    running = true
    if (!animationFrameRequested) {
      integrate()
    }
  }
}

document.addEventListener("visibilitychange", handleVisibilityChange);

initializeDimensions()
integrate()
