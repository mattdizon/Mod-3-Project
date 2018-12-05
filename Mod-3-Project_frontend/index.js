
 document.addEventListener("DOMContentLoaded", function(event) {
     //canvas materials
    let htmlCanvas = document.getElementById('c');
    let stage = new createjs.Stage(htmlCanvas);
    let context = htmlCanvas.getContext('2d');
    //html elements
    let playButton = document.getElementById('button1');
    let home = document.getElementById('home-Button')
    let songs = document.getElementById("song-menu")
    let sound = document.querySelectorAll(".preview")
    let showStartButton = document.getElementById('start-button')
    let start = document.getElementById('start')
    let gameScore = document.getElementById('percent')
    let gameBoard = document.getElementById('gameBoard')
    //game object logic
    let songPlaying = true
    let score = 0
    let ball = 0

    let xRay = []
    for(i=100; i < 1300; i++){
      xRay.push(i)}

    let yRay = []
    for(i=100; i < 650; i++){
      yRay.push(i)}

// function to resize canvas upon DOM Loaded

   function resizeCanvas() {
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
            songReset()
            document.getElementById("audio-1").play()
        }
        //160 bpm
        else if (event.target.classList.contains('2')){
            start.setAttribute('class', "song-2")
            showStartButton.classList.remove('hide')
            songReset()
            document.getElementById("audio-2").play()
        }
        //160 bpm
        else if (event.target.classList.contains('3')){
            start.setAttribute('class', "song-3")
            showStartButton.classList.remove('hide')
            songReset()
            document.getElementById("audio-3").play()
        }
        else if (event.target.classList.contains('4')){
            start.setAttribute('class', "song-4")
            showStartButton.classList.remove('hide')
            songReset()
            document.getElementById("audio-4").play()
        }
    }


    function playGame(){
        songReset()
        songs.classList.add('hide')
        showStartButton.classList.add('hide')
        gameScore.classList.remove('hide')
            if (start.classList.contains('song-1')){
                let aud = document.getElementById("audio-1");
                aud.play()
                //set timeout for song length
                //then segue to show song grade
                //show grade should have form to enter name.
                // after user enter name segue to Thank You screen where user can be asked to return home.
                aud.onplaying = function() {

                    generateCircle()
                }
                aud.onended = function() {
                    songPlaying = false
                    let scorePercent = score/ball
                    gameBoard.innerHTML =
                        `
                        <h1> ${score}</h1>
                        <h2 id = "calculation">Calculation: ${score} * ${scorePercent}</h2>
                        <hr>
                        <h2 >Number of Hits ${score}</h2>
                        <h2>Total number of Balls ${ball}</h2>
                        `
                    gameBoard.classList.remove('hide')
                }

            }






            else if (start.classList.contains('song-2')){
                let aud = document.getElementById("audio-2");
                aud.play()
                aud.onplaying = function() {

                    generateCircle()
                }
                aud.onended = function() {
                    songPlaying = false
                }

            }
            else if (start.classList.contains('song-3')){
                let aud = document.getElementById("audio-3");
                aud.play()
                aud.onplaying = function() {

                    generateCircle()
                }
                aud.onended = function() {
                    songPlaying = false

                }

            }
            else if (start.classList.contains('song-4')){
                let aud = document.getElementById("audio-4");
                aud.play()
                aud.onplaying = function() {

                    generateCircle()
                }
                aud.onended = function() {
                    songPlaying = false
                    gameBoard.innerHTML =
                        `
                        <h1> ${score}</h1>
                        `
                    gameBoard.classList.remove('hide')
                }

            }

    }


    function songReset(){
        sound.forEach(song => {
            song.pause()
            song.currentTime = 0;
        })
    }


    function generateCircle(){
        if (songPlaying === true){
            setTimeout(redCircle, 2000)
            setTimeout(blueCircle, 2500)
            setTimeout(greenCircle, 3000)
        }else{
            songReset()

        }

    }

    function redCircle(){
        let gamePercent = (score/ball) * 100
        let red = new createjs.Shape();
        red.graphics.beginFill("Red").drawCircle(0, 0, 35);
        red.x = xRay[Math.floor(Math.random()*xRay.length)];
        red.y = yRay[Math.floor(Math.random()*yRay.length)];

        stage.addChild(red);
        stage.update();
        ball += 1
        if(songPlaying === true){
            setTimeout(ballTimeout, 1800)
            red.addEventListener("click", function(event){
                 stage.removeChild(event.target);
                 stage.update();
                 score += 1
                 gameScore.innerHTML =
                 `
                    <h1> ${score} </h1>
                    <br>
                    <h1> ${gamePercent.toFixed(2)}%</h1>
                 `
                 console.log(ball)
                 console.log(score)
             }.bind(this));
        }
        else{
            stage.removeAllChildren();
            stage.update();
        }

         function ballTimeout(){
             stage.removeChild(red);
             stage.update();
             redCircle()
         }


    }


    function blueCircle(){
        let gamePercent = (score/ball) * 100
        let blue = new createjs.Shape();
        blue.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 35);
        blue.x = xRay[Math.floor(Math.random()*xRay.length)];
        blue.y = yRay[Math.floor(Math.random()*yRay.length)];
        stage.addChild(blue);
        stage.update();
        ball += 1
        if(songPlaying === true){
            setTimeout(ballTimeout, 1800)
            blue.addEventListener("click", function(event){
                 stage.removeChild(event.target);
                 stage.update();
                 score += 1
                 gameScore.innerHTML =
                 `
                    <h1> ${score} </h1>
                    <br>
                    <h1> ${gamePercent.toFixed(2)}%</h1>
                 `
                 console.log(ball)
                 console.log(score)
             }.bind(this));
        }
        else{
            stage.removeAllChildren();
            stage.update();
        }





         function ballTimeout(){
             stage.removeChild(blue);
             stage.update();
             blueCircle()
         }


    }


    function greenCircle(){
        let gamePercent = (score/ball) * 100
        var green = new createjs.Shape();
        green.graphics.beginFill("Green").drawCircle(0, 0, 35);
        green.x = xRay[Math.floor(Math.random()*xRay.length)];
        green.y = yRay[Math.floor(Math.random()*yRay.length)];
        stage.addChild(green);
        stage.update();
        ball += 1

        if(songPlaying === true){
            setTimeout(ballTimeout, 2000)
            green.addEventListener("click", function(event){
                 stage.removeChild(event.target);
                 stage.update();
                 score += 1
                 gameScore.innerHTML =
                 `
                    <h1> ${score} </h1>
                    <br>
                    <h1> ${gamePercent.toFixed(2)}%</h1>
                 `
                 console.log(ball)
                 console.log(score)
             }.bind(this));
        }
        else{
            stage.removeAllChildren();
            stage.update();
        }

         function ballTimeout(){
             stage.removeChild(green);
             stage.update();
             greenCircle()
         }

    }

    function clearGame(){

        console.log("hhee")
    }

    resizeCanvas();
    playButton.addEventListener('click',showSongMenu)
    songs.addEventListener('click', songChoice)
    start.addEventListener('click', playGame)


});







//
