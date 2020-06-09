let snowDepth = 0
let snowObj = {
  snowedIn: '0%'
}

const eachSnow = function() {
  let i=0;
  while (i<15) {
    let rand = Math.floor(Math.random() * (385-15) + 15)
    document.querySelector('.snowbox').innerHTML += '<i class="fas fa-snowflake" style="left:' + rand + 'px"></i>'
    i++
  }
}

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
  easing: 'linear',
  // a callback is triggered on every frame
  // this callback is triggered when each loop ends
})

fallingSnow
//add other animations as children
// some parameters can be inherited: targets, easing, duration, delay, round (rounds up value)
// you can override the inherited parameters when you declare new ones in the children

// animate any numerical Object
//shake the globe
  .add({
    targets: '#snowglobe',
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
      anime.remove('#snowglobe')
    },
  })

  // when first animation ends
  // continue to next in timeline

  .add({
    eachSnow: eachSnow(),
    // css properties. here: transform, rotate
    translateY: {
      // from, to
      value: [0, 450],
      duration: 3000,
      // stagger multiple elements with follow through and overlapping action
      delay: anime.stagger(500),
      easing: 'linear',
    },
    rotateZ: {
      // specific property parameters
      value: 360,
      // random integer
      duration: function() {
        return anime.random(2000, 3000)
      },
      direction: 'alternate',
      easing: 'linear',
    },
    update: function() {
      snowDepth++
      document.querySelector('#snowdepth').style.height = (snowDepth/10) + 'px'
      if (snowDepth == 4000) {
        anime.remove('.fa-snowflake')
      }
      anime({
      targets: snowObj,
      snowedIn: (snowDepth/40),
      round: 2,
      easing: 'linear',
      update: function() {
        document.querySelector('.totalSnowfall').innerHTML = snowObj.snowedIn;
      },
    })
    return snowDepth
  },
}, '-=1000')



document.querySelector('.play').onclick = fallingSnow.play
document.querySelector('.pause').onclick = fallingSnow.pause

