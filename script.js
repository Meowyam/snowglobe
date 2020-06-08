const generateSnow = function() {
  let i = 0
  let snowArr = []
  while (i < 6) {
    document.getElementById('snowglobe').innerHTML += '<i class="fas fa-snowflake fa-2x"></i>'
    i++
  }
}

function shakeGlobe(strength) {
  anime({
    targets: '#snowglobe',
    // animation keyframes
    keyframes: [
      {translateX: strength},
      {translateX: -strength},
      {translateX: strength},
      {translateX: -strength},
      {translateX: 0}
    ],
    duration: 500,
    // elastic easing (amplitude, how many times curve goes back and forth)
    easing: 'easeInOutElastic(1,1)',
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
      value: [0, 350],
      // random integer
      duration: function() {
        return anime.random(1000, 3000)
      },
      // stagger multiple elements with follow through and overlapping action
      delay: anime.stagger(100),
      easing: 'linear',
      loop: true,
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
        value: [0, strength],
        duration: 100,
        easing: 'linear',
      },
      {
        value: [strength, -(strength/10)],
        duration: 100,
        easing: 'linear',
      },
      {
        value: [-strength/10, strength],
        duration: 150,
        easing: 'linear',
      },
      {
        value: [strength, 0],
        duration: 150,
        easing: 'linear',
      },
      //'If there is no duration specified inside the keyframes, each keyframe duration will be equal to the animation's total duration divided by the number of keyframes.'
      {
        value: 0,
        easing: 'easeInOutQuad',
      },
    ],
    // a callback is triggered on every frame
    // complete callback is triggered when animation is completed
    // there's also a begin callback
    complete: function(anim) {
      if (loopable == false) {
      }
    },
    loop: loopable
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
}

document.addEventListener("DOMContentLoaded", startSnow())
