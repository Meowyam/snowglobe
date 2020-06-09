let snowDepth = 0
let shakeComplete = false

const generateSnow = function() {
  let i = 0
  while (i < 15) {
    document.getElementById('snowbox').innerHTML += '<i class="fas fa-snowflake"></i>'
    i++
  }
}
generateSnow()

//swing the moon
// pendulum animation is easy
const moon = anime({
  // target anything. here: a css selector
  targets: '.moon',
  //animate css properties
  rotate: [30, -30],
  duration: 500,
  // Robert Penner's popular easing functions are built in
  // robertpenner.com/easing
  easing: 'easeInOutSine',
  direction: 'alternate',
  loop: true,
})

//animate svg
//use the path as a motion path,
//morph the path (shapes must have same number of points)
//and line drawing (path must have stroke, cf svg line animation in css
const house = anime({
  targets: '.house svg path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
})


const twinkle = anime({
  //property keyframes defined in property Object Array
  //property keyframes can overlap
  //here both size and colour change
  targets: '.fa-star',
  scale: [
    {value: 2},
    {value: 1},
    {value: 3},
    {value: 2},
  ],
  color: [
    {value: '#ffffff'},
    {value: '#b0ceff'},
    {value: '#ffffff'},
    {value: '#f2ff9c'},
  ],
  duration: 1000,
  // loop: can enter a number or true for infinite
  loop: true,
  // normal, reverse, or alternate
  direction: 'alternate',
  easing: 'easeInOutSine',
})


//add shaking
//once the instance is created, you can't change duration.
//you have to create a new animation from scratch.

//you can synch animations by adding animations on a timeline,
//by default they chain, each starts after the previous animation ends
//but you can add an offset
//but you can't dynamically add animations to occur simultaneously

//first define basic parameters: eg. duration, looping

const fallingSnow = anime.timeline({
  targets: '.fa-snowflake',
  autoplay: false,
  loop: true,
  duration: 800,
  easing: 'easeOutElastic(10,2)',
  // a callback is triggered on every frame
  // this callback is triggered when each loop ends
  loopComplete: function() {
    console.log(snowDepth)
    snowDepth++
    document.querySelector('#snowdepth').style.height = (snowDepth * 10) + 'px'
    if (snowDepth == 40) {
      anime.remove('.fa-snowflake')
    }
    return snowDepth
  },
})
//add other animations as children
// some parameters can be inherited: targets, easing, duration, delay, round (rounds up value)
// you can override the inherited parameters when you declare new ones in the children

//shake the globe
  .add({
    targets: '.snowglobe',
  // animation keyframes
  // keyframes are defined in an Array
    keyframes: [
      {translateX: 100},
      {translateX: -100},
      {translateX: 80},
      {translateX: -80},
      {translateX: 60},
      {translateX: -60},
      {translateX: 40},
      {translateX: 40},
      {translateX: 0}
    ],
    duration: 200,
  // easing spring(mass, stiffness, damping, velocity)
  // the higher the mass, the 'stretchier'
    easing: 'spring(2, 2, 2, 10)',
    // callback triggered when animation is completed
    // looped timeline plays all children
    complete: function(anim) {
      if (anim.completed == true) {
        anime.remove('.snowglobe')
      }
    }
  })

  // make snow visible
  .add({
    targets: '#snowbox',
    opacity: 1,
    duration: 1,
    loop: true,
  })

  // when first animation ends
  // continue to next in timeline

  .add({
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
  })

  .add({
    //animate any Object with a numerical value
    snowCount: snowDepth,
    easing: 'easeOutElastic(10,2)',
    round: 1,
    update: function() {
      document.querySelector('.totalSnowfall').innerHTML = snowDepth
    }
  })

document.querySelector('.play').onclick = fallingSnow.play
document.querySelector('.pause').onclick = fallingSnow.pause

