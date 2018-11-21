// Ensure min <= value <= max
window.clamp = (min, value, max) => {
  return (value <= min) ? min :
         (value >= max) ? max :
          value
}

window.tween = (min, value, max) => {
  return min + value * (max - min)
}

window.randrange = (min, max) => {
  return tween(min, Math.random(), max)
}
