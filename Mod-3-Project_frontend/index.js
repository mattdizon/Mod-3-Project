
 document.addEventListener("DOMContentLoaded", function(event) {
     //canvas materials
    let htmlCanvas = document.getElementById('c');
    let stage = new createjs.Stage(htmlCanvas);
    let context = htmlCanvas.getContext('2d');
    //html elements
    let playButton = document.getElementById('button1');
    let scoreButton = document.getElementById('button2')
    let start = document.getElementById('start')
    let home = document.getElementById('home-Button')
    let songs = document.getElementById("song-menu")


    let gameStats = document.getElementById('gameStats')
    let gameBoard = document.getElementById('gameBoard')

    let songScoreboard = document.getElementById('songScoreboard')



    //game object logic
    let songPlaying = true
    let score = 0
    let ball = 0

    let xRay = []
    for(i=100; i < 1200; i++){
      xRay.push(i)}

    let yRay = []
    for(i=197; i < 650; i++){
      yRay.push(i)}

// function to resize canvas upon DOM Loaded
   function resizeCanvas() {
       htmlCanvas.width = window.innerWidth;
       htmlCanvas.height = window.innerHeight;
    }
//function to toggle song menu and home screen
    function showSongMenu(){
        let songList = document.getElementById('song-list')
        home.classList.add('hide')
        songs.classList.remove('hide')
        getSongs().then(data => data.forEach(song => {
            songList.innerHTML +=
                `
                <li data-id = "${song.id}">${song.name}</li>
                `
        }))
    }


//song selection menu
    function songChoice(event){
        if (event.target.dataset.id === "1"){
            start.setAttribute('class', "song-1")
            start.classList.remove('hide')
            songReset()
            document.getElementById("audio-1").play()
        }
        //160 bpm
        else if (event.target.dataset.id === "2"){
            start.setAttribute('class', "song-2")
            start.classList.remove('hide')
            songReset()
            document.getElementById("audio-2").play()
        }
        //160 bpm
        else if (event.target.dataset.id === "3"){
            start.setAttribute('class', "song-3")
            start.classList.remove('hide')
            songReset()
            document.getElementById("audio-3").play()
        }
        else if (event.target.dataset.id === "4"){
            start.setAttribute('class', "song-4")
            start.classList.remove('hide')
            songReset()
            document.getElementById("audio-4").play()
        }
    }
// function to start song.
    function playGame(){
        songReset()
        songs.classList.add('hide')
        start.classList.add('hide')
        gameStats.classList.remove('hide')
            if (start.classList.contains('song-1')){
                let songId = 1
                c.style.backgroundImage = "url('images/kono.gif')"
                let aud = document.getElementById("audio-1");
                aud.play()
                aud.onplaying = function() {
                    generateCircle()
                }
                aud.onended = function() {
                    stopGame(songId)
                    c.style.backgroundImage = "url('images/home.jpg')"
                }
            }
            else if (start.classList.contains('song-2')){
                let songId = 2
                c.style.backgroundImage = "url('images/crazy.gif')"
                let aud = document.getElementById("audio-2");
                aud.play()
                aud.onplaying = function() {
                    generateCircle()
                }
                aud.onended = function() {

                    stopGame(songId)
                    c.style.backgroundImage = "url('images/home.jpg')"
                }
            }
            else if (start.classList.contains('song-3')){
                let songId = 3
                c.style.backgroundImage = "url('images/dance.gif')"
                let aud = document.getElementById("audio-3");
                aud.play()
                aud.onplaying = function() {
                    generateCircle()
                }
                aud.onended = function() {
                    stopGame(songId)
                    c.style.backgroundImage = "url('images/home.jpg')"
                }
            }
            else if (start.classList.contains('song-4')){
                let songId = 4
                c.style.backgroundImage = "url('https://media.giphy.com/media/2A0jMKmXiAixKTrITQ/giphy.gif')"
                let aud = document.getElementById("audio-4");
                aud.play()
                aud.onplaying = function() {
                    generateCircle()
                }
                aud.onended = function() {
                    stopGame(songId)
                    c.style.backgroundImage = "url('images/home.jpg')"
                }
            }


    }
// helper function to reset song after a game and after previewing song
    function songReset(){
        let sound = document.querySelectorAll(".preview")
        sound.forEach(song => {
            song.pause()
            song.currentTime = 0;
        })
    }
//function to generate all the circles
    function generateCircle(){

        if (songPlaying === true){
            setTimeout(redCircleFunc, 2000)
            setTimeout(blueCircleFunc, 2500)
            setTimeout(yellowCircleFunc, 3000)
        }
        else{
            songReset()
        }
    }
// function to make ball disappear if user does not click
    function ballTimeout(color,color2,generateColorCircleFunction){
        stage.removeChild(color2);
        stage.removeChild(color);
        stage.update();
        generateColorCircleFunction()
    }


    function clearCircle(){
        stage.removeAllChildren();
        stage.update();
    }
// red ball generator
    let redCircleFunc = function redCircle(){
     let gamePercent = (score/ball) * 100
     let red = new createjs.Shape();
     let redCircle1 = new createjs.Shape();
     let redCircle2 = new createjs.Shape();

      generateLayers(red, redCircle1, redCircle2);

      function generateLayers(red, redCircle1, redCircle2){
        red.graphics.beginFill("red").drawCircle(0, 0, 30);
        red.x = xRay[Math.floor(Math.random()*xRay.length)];
        red.y = yRay[Math.floor(Math.random()*yRay.length)];
        redCircle1.graphics.beginFill("red").drawCircle(0, 0, 40);
        redCircle1.x = red.x;
        redCircle1.y = red.y;
        stage.addChild(redCircle1);
        thirdLayerRed(redCircle1);
        redCircle2.graphics.beginFill("red").drawCircle(0, 0, 30);
        redCircle2.x = red.x;
        redCircle2.y = red.y;
        stage.addChild(redCircle2);
        secondLayerRed(redCircle2);
        stage.update();
        ball += 1

        if(songPlaying === true){
            setTimeout(function(){
                ballTimeout(redCircle1,redCircle2,redCircleFunc)
            }
            , 1500)
            redCircle1.addEventListener("click", function(event){
                let percent = document.getElementById('percent')
               stage.removeChild(event.target);
               stage.update();
               score += 1
               if(gamePercent.toFixed(2) < 60){
                   percent.setAttribute('color', 'red')
               }
               gameStats.innerHTML =
               `
                <h1> ${score} </h1>
                <br>
                <h1> ${gamePercent.toFixed(2)}%</h1>
               `
               console.log(ball)
               console.log(score)
           }.bind(this));

           redCircle2.addEventListener("click", function(event){
                stage.removeChild(event.target);
                stage.update();
                score += 1
                gameStats.innerHTML =
                `
                 <h1> ${score} </h1>
                 <br>
                 <h1 id="health"> ${gamePercent.toFixed(2)}%</h1>
                `
                console.log(ball)
                console.log(score)
            }.bind(this));

        }
        else{
          clearCircle()
        }
      }

      function thirdLayerRed(redCircle1){
        createjs.Tween.get(redCircle1, {loop: true})
        .to({alpha: 0}, 1500)
        .to({ alpha:0.6},1800, createjs.Ease.getPowInOut(2))
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
      }

      function secondLayerRed(redCircle2){
        createjs.Tween.get(redCircle2, {loop: false})
        .to({alpha: 0})
        .to({ alpha:1},1100, createjs.Ease.getPowInOut(2))
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
      }
   }


// blue ball generator function
    let blueCircleFunc = function blueCircle(){
     let gamePercent = (score/ball) * 100
     let blue = new createjs.Shape();
     let blueCircle1 = new createjs.Shape();
     let blueCircle2 = new createjs.Shape();

      generateLayers(blue, blueCircle1, blueCircle2);

      function generateLayers(blue, blueCircle1, blueCircle2){
        blue.graphics.beginFill("Purple").drawCircle(0, 0, 30);
        blue.x = xRay[Math.floor(Math.random()*xRay.length)];
        blue.y = yRay[Math.floor(Math.random()*yRay.length)];
        blueCircle1.graphics.beginFill("Purple").drawCircle(0, 0, 40);
        blueCircle1.x = blue.x;
        blueCircle1.y = blue.y;
        stage.addChild(blueCircle1);
        thirdLayerBlue(blueCircle1);
        blueCircle2.graphics.beginFill("Purple").drawCircle(0, 0, 30);
        blueCircle2.x = blue.x;
        blueCircle2.y = blue.y;
        stage.addChild(blueCircle2);
        secondLayerBlue(blueCircle2);
        stage.update();
        ball += 1

        if(songPlaying === true){
            setTimeout(function(){
                ballTimeout(blueCircle1,blueCircle2,blueCircleFunc)
            }
            , 2000)
            blueCircle1.addEventListener("click", function(event){
               stage.removeChild(event.target);
               stage.update();
               score += 1
               gameStats.innerHTML =
               `
                <h1> ${score} </h1>
                <br>
                <h1 id="health"> ${gamePercent.toFixed(2)}%</h1>
               `
               console.log(ball)
               console.log(score)
           }.bind(this));

           blueCircle2.addEventListener("click", function(event){
                stage.removeChild(event.target);
                stage.update();
                score += 1
                gameStats.innerHTML =
                `
                 <h1> ${score} </h1>
                 <br>
                 <h1 id="health"> ${gamePercent.toFixed(2)}%</h1>
                `
                console.log(ball)
                console.log(score)
            }.bind(this));

        }
        else{
          clearCircle()
        }
      }

      function thirdLayerBlue(blueCircle1){
        createjs.Tween.get(blueCircle1, {loop: true})
        .to({alpha: 0}, 1500)
        .to({ alpha:0.6},1800, createjs.Ease.getPowInOut(2))
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
      }

      function secondLayerBlue(blueCircle2){
        createjs.Tween.get(blueCircle2, {loop: false})
        .to({alpha: 0})
        .to({ alpha:1},1100, createjs.Ease.getPowInOut(2))
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
      }
   }

// green ball generator
let yellowCircleFunc = function yellowCircle(){
 let gamePercent = (score/ball) * 100
 let yellow = new createjs.Shape();
 let yellowCircle1 = new createjs.Shape();
 let yellowCircle2 = new createjs.Shape();

  generateLayers(yellow, yellowCircle1, yellowCircle2);

  function generateLayers(yellow, yellowCircle1, yellowCircle2){
    yellow.graphics.beginFill("Yellow").drawCircle(0, 0, 30);
    yellow.x = xRay[Math.floor(Math.random()*xRay.length)];
    yellow.y = yRay[Math.floor(Math.random()*yRay.length)];
    yellowCircle1.graphics.beginFill("Yellow").drawCircle(0, 0, 40);
    yellowCircle1.x = yellow.x;
    yellowCircle1.y = yellow.y;
    stage.addChild(yellowCircle1);
    thirdLayeryellow(yellowCircle1);
    yellowCircle2.graphics.beginFill("Yellow").drawCircle(0, 0, 30);
    yellowCircle2.x = yellow.x;
    yellowCircle2.y = yellow.y;
    stage.addChild(yellowCircle2);
    secondLayeryellow(yellowCircle2);
    stage.update();
    ball += 1

    if(songPlaying === true){
        setTimeout(function(){
            ballTimeout(yellowCircle1,yellowCircle2,yellowCircleFunc)
        }
        , 1800)
        yellowCircle1.addEventListener("click", function(event){
           stage.removeChild(event.target);
           stage.update();
           score += 1
           gameStats.innerHTML =
           `
            <h1> ${score} </h1>
            <br>
            <h1 id="health"> ${gamePercent.toFixed(2)}%</h1>
           `
           console.log(ball)
           console.log(score)
       }.bind(this));

       yellowCircle2.addEventListener("click", function(event){
            stage.removeChild(event.target);
            stage.update();
            score += 1
            gameStats.innerHTML =
            `
             <h1> ${score} </h1>
             <br>
             <h1 id="health"> ${gamePercent.toFixed(2)}%</h1>
            `
            console.log(ball)
            console.log(score)
        }.bind(this));

    }
    else{
      clearCircle()
    }
  }

  function thirdLayeryellow(yellowCircle1){
    createjs.Tween.get(yellowCircle1, {loop: true})
    .to({alpha: 0}, 1500)
    .to({ alpha:0.6},1800, createjs.Ease.getPowInOut(2))
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
  }

  function secondLayeryellow(yellowCircle2){
    createjs.Tween.get(yellowCircle2, {loop: false})
    .to({alpha: 0})
    .to({ alpha:1},1100, createjs.Ease.getPowInOut(2))
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
  }
}

// end game function
    function stopGame(songId) {
        songPlaying = false
        gameStats.classList.add('hide')
        let scorePercent = score/ball
        let showScore = (score * scorePercent.toFixed(2)) * 100
        gameBoard.innerHTML =
            `
            <h1> ${showScore.toFixed(0)}</h1>
            <h2 id = "calculation">Calculation: ${score} * ${scorePercent.toFixed(2)} * 100</h2>
            <hr>
            <h2 >Number of Hits ${score}</h2>
            <hr>
            <h2>Accuracy: ${scorePercent.toFixed(2)*100}%</h2>
            <hr>
            <form id = "submitName">
            <h2>Name:</h2> <input id="playerOne" type="text" name="fname"><br>
             <input id="submit-btn" type="submit" value="Submit">
            </form>
            `
        gameBoard.classList.remove('hide')

        let submitBtn = document.querySelector('#submitName')
        submitBtn.addEventListener('submit',function (e){
            addScore().then(selectedSongScore(songId))
        })

        function addScore(e){
            let playerName = document.querySelector('#playerOne').value

            fetch(`https://osu-backend.herokuapp.com/scores`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({name: playerName, points: showScore, song_id: songId})
            })
        }
    }
// function to toggle song scoreboard selection menu
    function showSongScoreMenu(){
        let songScoreMenu = document.getElementById('songScoreMenu')
        let songScoreSelector = document.getElementById('songScoreSelector')
        songScoreMenu.classList.remove('hide')
        home.classList.add('hide')
        getSongs().then(data => data.forEach(song => {
            songScoreSelector.innerHTML +=
                `
                <li data-id = ${song.id}>${song.name}</li>
                `
        }))
        songScoreSelector.addEventListener('click',function(e){
            songScoreboard.classList.remove('hide')
            songScoreMenu.classList.add('hide')
            selectedSongScore(e.target.dataset.id)

        })

    }


// function to toggle specific song scoreboard
    function selectedSongScore(songId){
        let songScoreboardTable = document.getElementById('songScoreboardTable')
        let songName = document.getElementById('songName')
        let i = 0
        getScores(songId).then(data => data.forEach(person => {
            i += 1

            songScoreboardTable.innerHTML +=
            `

              <tr data-id = ${person.id}>
                <td>${i}</td>
                <td>${person.name}</td>
                <td>${person.points}</td>

              </tr>

            `
        }
        ))
    }


    function getScores(songId){
        return fetch(`https://osu-backend.herokuapp.com/songs/${songId}/scores`)
        .then(resp => resp.json())

    }

    function getSongs(){
        return fetch(`https://osu-backend.herokuapp.com/songs`)
        .then(resp => resp.json())
    }


    //fireworks particle
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
      duration: Infinity,
      update: function() {
        ctx.clearRect(pointerX-150, pointerY-150, 300, 300);
      }
    });

    document.addEventListener(tap, function(e) {
      window.human = true;
      updateCoords(e);

      animateParticules(pointerX, pointerY);
      render.play();
    }, false);

    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;


    resizeCanvas();
    playButton.addEventListener('click',showSongMenu)
    scoreButton.addEventListener('click', showSongScoreMenu)
    songs.addEventListener('click', songChoice)
    start.addEventListener('click', playGame)


});







//
