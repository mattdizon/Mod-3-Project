
 document.addEventListener("DOMContentLoaded", function(event) {

    let htmlCanvas = document.getElementById('c');
    // let particleCanvas = document.getElementById('p');
    let filter = document.getElementById('#filter');
    let context = htmlCanvas.getContext('2d');
    let playButton = document.getElementById('button1');
    let home = document.getElementById('home-Button')
    let songs = document.getElementById("song-menu")
    let sound = document.querySelectorAll(".preview")
    let showStartButton = document.getElementById('start-button')
    let start = document.getElementById('start')
    let score = 0
    let ball = 0

    let xRay = []
    for(i=100; i < 1300; i++){
      xRay.push(i)}

    let yRay = []
    for(i=100; i < 650; i++){
      yRay.push(i)}

      anime.timeline({loop: true})
        .add({
          targets: '.ml8 .circle-white',
          scale: [0, 3],
          opacity: [1, 0],
          easing: "easeInOutExpo",
          rotateZ: 360,
          duration: 1100
        }).add({
          targets: '.ml8 .circle-container',
          scale: [0, 1],
          duration: 1100,
          easing: "easeInOutExpo",
          offset: '-=1000'
        }).add({
          targets: '.ml8 .circle-dark',
          scale: [0, 1],
          duration: 1100,
          easing: "easeOutExpo",
          offset: '-=600'
        }).add({
          targets: '.ml8 .letters-left',
          scale: [0, 1],
          duration: 1200,
          offset: '-=550'
        }).add({
          targets: '.ml8 .bang',
          scale: [0, 1],
          rotateZ: [45, 15],
          duration: 1200,
          offset: '-=1000'
        }).add({
          targets: '.ml8',
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1400
        });

      anime({
        targets: '.ml8 .circle-dark-dashed',
        rotateZ: 360,
        duration: 8000,
        easing: "linear",
        loop: true
      });

// function to add particles(fireworks)----------------------
window.human = false;

var ctx = htmlCanvas.getContext('2d');
var numberOfParticules = 30;
var pointerX = 0;
var pointerY = 0;
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

function setCanvasSize() {
  htmlCanvas.width = window.innerWidth * 2;
  htmlCanvas.height = window.innerHeight * 2;
  htmlCanvas.style.width = window.innerWidth + 'px';
  htmlCanvas.style.height = window.innerHeight + 'px';
  htmlCanvas.getContext('2d').scale(2, 2);
}

function updateCoords(e) {
  pointerX = e.clientX || e.touches[0].clientX;
  pointerY = e.clientY || e.touches[0].clientY;
}

function setParticuleDirection(p) {
  var angle = anime.random(0, 360) * Math.PI / 180;
  var value = anime.random(50, 180);
  var radius = [-1, 1][anime.random(0, 1)] * value;
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

function createParticule(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = colors[anime.random(0, colors.length - 1)];
  p.radius = anime.random(16, 32);
  p.endPos = setParticuleDirection(p);
  p.draw = function() {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  return p;
}

function createCircle(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = '#FFF';
  p.radius = 0.1;
  p.alpha = .5;
  p.lineWidth = 6;
  p.draw = function() {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.lineWidth = p.lineWidth;
    ctx.strokeStyle = p.color;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  return p;
}

function renderParticule(anim) {
  for (var i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
  }
}

function animateParticules(x, y) {
  var circle = createCircle(x, y);
  var particules = [];
  for (var i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y));
  }
  anime.timeline().add({
    targets: particules,
    x: function(p) { return p.endPos.x; },
    y: function(p) { return p.endPos.y; },
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule
  })
    .add({
    targets: circle,
    radius: anime.random(80, 160),
    lineWidth: 0,
    alpha: {
      value: 0,
      easing: 'linear',
      duration: anime.random(600, 800),
    },
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule,
    offset: 0
  });
}

var render = anime({
  duration: 2000,
  update: function() {
    ctx.clearRect(0, 0, htmlCanvas.width, htmlCanvas.height);
  }
});

document.addEventListener(tap, function(e) {
  window.human = true;
  // render.play();
  updateCoords(e);
  animateParticules(pointerX, pointerY);
}, false);

var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;


setCanvasSize();
window.addEventListener('resize', setCanvasSize, false);

// function to resize canvas upon DOM Loaded-------------------------------------

   function resizeCanvas() {
       // document.getElementById("c").style.background = "url('images/home.jpg')";
       htmlCanvas.width = window.innerWidth;
       htmlCanvas.height = window.innerHeight;

    }


    function showSongMenu(){
        home.classList.add('hide')
        songs.classList.remove('hide')

    }


    function songChoice(event){

        if (event.target.classList.contains('1')){
            start.setAttribute('class', "song-1")
            showStartButton.classList.remove('hide')
            //170 bpm
            sound.forEach(song => {
                song.pause()
                song.currentTime = 0;
            })
            document.getElementById("audio-1").play()
        }
        //160 bpm
        else if (event.target.classList.contains('2')){
            start.setAttribute('class', "song-2")
            showStartButton.classList.remove('hide')
            sound.forEach(song => {
                song.pause()
                song.currentTime = 0;
            })
            document.getElementById("audio-2").play()
        }
        //160 bpm
        else if (event.target.classList.contains('3')){
            start.setAttribute('class', "song-3")
            showStartButton.classList.remove('hide')
            sound.forEach(song => {
                song.pause()
                song.currentTime = 0;
            })
            document.getElementById("audio-3").play()
        }
    }


    function playGame(){
        sound.forEach(song => {
            song.pause()
            song.currentTime = 0;
        })
        songs.classList.add('hide')
        showStartButton.classList.add('hide')
        let stage = new createjs.Stage("c");
            if (start.classList.contains('song-1')){
                document.getElementById("audio-1").play()
                generateCircle()

            }
            else if (start.classList.contains('song-2')){
                document.getElementById("audio-2").play()
                generateCircle()
            }
            else if (start.classList.contains('song-3')){
                document.getElementById("audio-3").play()
                generateCircle()
            }

    }



      function generateCircle() {

       let stage = new createjs.Stage("c");



       function redCircle(){
           let red = new createjs.Shape();
           let red2 = new createjs.Shape();
           let red3 = new createjs.Shape();
           red.graphics.beginFill("Red").drawCircle(0, 0, 45);
           red.x = xRay[Math.floor(Math.random()*xRay.length)];
           red.y = yRay[Math.floor(Math.random()*yRay.length)];
           red2.graphics.beginFill("Red").drawCircle(0, 0, 45);
           red2.x = red.x+80;
           red2.y = red.y+80;
           red3.graphics.beginFill("Red").drawCircle(0, 0, 45);
           red3.x = red.x+160;
           red3.y = red.y+160;
           stage.addChild(red);
           stage.addChild(red2);
           stage.addChild(red3);
           stage.update();
           ball += 3
           setTimeout(ballTimeout, 3000)



           red.addEventListener("click", function(event){
                stage.removeChild(event.target);
                stage.update();
                score += 1
                console.log(ball)
                console.log(score)
            }.bind(this));
            red2.addEventListener("click", function(event){
                 stage.removeChild(event.target);
                 stage.update();
                 score += 1
                 console.log(ball)
                 console.log(score)
             }.bind(this));
             red3.addEventListener("click", function(event){
                  stage.removeChild(event.target);
                  stage.update();
                  score += 1
                  console.log(ball)
                  console.log(score)
              }.bind(this));


            function ballTimeout(){
                stage.removeChild(red);
                stage.removeChild(red2);
                stage.removeChild(red3);
                stage.update();
                redCircle()
            }


       }

       function blueCircle(){
           let blue = new createjs.Shape();
           let blue2 = new createjs.Shape();
           let blue3 = new createjs.Shape();
           blue.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 45);
           blue.x = xRay[Math.floor(Math.random()*xRay.length)];
           blue.y = yRay[Math.floor(Math.random()*yRay.length)];
           blue2.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 45);
           blue2.x = blue.x;
           blue2.y = blue.y-100;
           blue3.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 45);
           blue3.x = blue.x;
           blue3.y = blue.y-200;
           stage.addChild(blue);
           stage.addChild(blue2);
           stage.addChild(blue3);
           stage.update();
           ball += 3
           setTimeout(ballTimeout, 1800)

           blue.addEventListener("click", function(event){
                stage.removeChild(event.target);
                stage.update();
                score += 1
                console.log(ball)
                console.log(score)
            }.bind(this));
            blue2.addEventListener("click", function(event){
                 stage.removeChild(event.target);
                 stage.update();
                 score += 1
                 console.log(ball)
                 console.log(score)
             }.bind(this));
             blue3.addEventListener("click", function(event){
                  stage.removeChild(event.target);
                  stage.update();
                  score += 1
                  console.log(ball)
                  console.log(score)
              }.bind(this));


            function ballTimeout(){
              stage.removeChild(blue);
              stage.removeChild(blue2);
              stage.removeChild(blue3);
              stage.update();
              blueCircle()
            }

       }

       function greenCircle(){
           var green = new createjs.Shape();
           green.graphics.beginFill("Green").drawCircle(0, 0, 55);
           green.x = xRay[Math.floor(Math.random()*xRay.length)];
           green.y = yRay[Math.floor(Math.random()*yRay.length)];
           stage.addChild(green);
           stage.update();
           ball += 1
           setTimeout(ballTimeout, 1000)

           green.addEventListener("click", function(event){
                stage.removeChild(event.target);
                stage.update();
                score += 1
                console.log(ball)
                console.log(score)
            }.bind(this));
            function ballTimeout(){
                stage.removeChild(green);
                stage.update();
                greenCircle()
            }

       }

        redCircle()
        blueCircle()
        greenCircle()
    }




    resizeCanvas();
    playButton.addEventListener('click',showSongMenu)
    songs.addEventListener('click', songChoice)
    start.addEventListener('click', playGame)


});







//
