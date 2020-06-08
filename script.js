let snowDepth = 0

const generateSnow = function() {
  let i = 0
  let snowArr = []
  while (i < 15) {
    document.getElementById('snowglobe').innerHTML += '<i class="fas fa-snowflake"></i>'
    i++
  }
}

function shakeGlobe(strength) {
  anime({
    targets: '#snowglobe',
    // animation keyframes
    keyframes: [
      {translateX: strength/5},
      {translateX: -strength/5},
      {translateX: strength/5},
      {translateX: -strength/5},
      {translateX: 0}
    ],
    duration: 500,
    // easing spring(mass, stiffness, damping, velocity)
    // the higher the mass, the 'stretchier'
    easing: 'spring(2, 2, 2, 10)',
  })
}

function fallingSnow(strength,loopable) {
  anime({
    // target anything. here: a css selector
    targets: '.fa-snowflake',
    // css values. here: opacity
    opacity: {
      value: 0,
      duration: 3000,
      easing: 'linear',
    },
    // css properties. here: transform, rotate
    translateY: {
      // from, to
      value: [0, 450],
      // random integer
      duration: function() {
        return anime.random(2000, 3000)
      },
      // stagger multiple elements with follow through and overlapping action
      delay: anime.stagger(50),
      easing: 'linear',
    },
    rotateZ: {
    // specific property parameters
      value: 360,
      duration: 3000,
      direction: 'alternate',
      easing: 'linear',
      loop: true,
    },
    // keyframes are defined in an Array
    // keyFrames for property translateX
    translateX: [
      {
        value: strength,
        duration: 100,
        easing: 'linear',
      },
      {
        value: -strength,
        duration: 100,
        easing: 'linear',
      },
      {
        value: strength,
        duration: 150,
        easing: 'linear',
      },
      {
        value: -strength,
        duration: 150,
        easing: 'linear',
      },
      //'If there is no duration specified inside the keyframes, each keyframe duration will be equal to the animation's total duration divided by the number of keyframes.'
      {
        value: 0,
        easing: 'linear',
      },
    ],
    // a callback is triggered on every frame
    // begin callback is triggered when animation is started
    loopBegin: function(anim) {
      snowDepth++
      showSnowdepth(snowDepth)
    },
    // complete callback
    loopComplete: function(anim) {
      totalSnow(snowDepth)
    },
    loop: loopable
  })
}

function showSnowdepth(snowDepth) {
  anime({
    targets: '.snowdepth',
    height: snowDepth * 10,
    // delay in milliseconds
    delay: 2000,
  })
}


//animate any Object with a numerical value

let snowfallObj = {
  snowCount: 0,
}

function totalSnow(snowDepth) {
  console.log(snowDepth)
  anime({
    targets: snowfallObj,
    snowCount: snowDepth,
    easing: 'easeOutElastic(10,2)',
    round: 1,
    update: function() {
      document.querySelector('.totalSnowfall').innerHTML = snowfallObj.snowCount
    }
  })
}

generateSnow()

function startSnow() {
  let strength = 0
  fallingSnow(strength,true)
}

//add shaking
//once the instance is created, you can't change the duration.
//you have to create a new animation from scratch.

//you can CHAIN animations by adding animations on a timeline,
//but not dynamically add animations to occur simultaneously

function shake() {
  console.log('shake')
  strength = 50
  fallingSnow(strength,false)
  shakeGlobe(strength)
}

document.addEventListener("DOMContentLoaded", startSnow())
