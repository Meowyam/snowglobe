const generateSnow = function() {
  let i = 0
  console.log(i)
  while (i < 6) {
    document.getElementById('snowglobe').innerHTML += '<i class="fas fa-snowflake fa-2x"></div>'
    i++
  }
}
generateSnow()

function fallingSnow() {
  anime({
    targets: '.fa-snowflake',
    translateY: 350,
    duration: 2000,
    easing: 'linear',
  })
}

document.addEventListener("DOMContentLoaded", fallingSnow())
