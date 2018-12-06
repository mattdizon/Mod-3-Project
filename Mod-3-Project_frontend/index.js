
 document.addEventListener("DOMContentLoaded", function(event) {
     //canvas materials
    let htmlCanvas = document.getElementById('c');
    let stage = new createjs.Stage(htmlCanvas);
    let context = htmlCanvas.getContext('2d');
    //html elements
    let playButton = document.getElementById('button1');
    let scoreButton = document.getElementById('button2')
    let home = document.getElementById('home-Button')
    let songs = document.getElementById("song-menu")
    let sound = document.querySelectorAll(".preview")
    let showStartButton = document.getElementById('start-button')
    let start = document.getElementById('start')
    let gameStats = document.getElementById('gameStats')
    let gameBoard = document.getElementById('gameBoard')
    let songScoreMenu = document.getElementById('songScoreMenu')
    let songScoreboard = document.getElementById('songScoreboard')
    let songScoreboardTable = document.getElementById('songScoreboardTable')
    let songList = document.getElementById('song-list')
    let songScoreSelector = document.getElementById('songScoreSelector')
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
    }
// function to start song.
    function playGame(){
        songReset()
        songs.classList.add('hide')
        start.classList.add('hide')
        gameStats.classList.remove('hide')
            if (start.classList.contains('song-1')){
                let songId = 1
                let aud = document.getElementById("audio-1");
                aud.play()
                aud.onplaying = function() {
                    generateCircle()
                }
                aud.onended = function() {
                    stopGame(songId)
                }
            }
            else if (start.classList.contains('song-2')){
                let songId = 2
                let aud = document.getElementById("audio-2");
                aud.play()
                aud.onplaying = function() {
                    generateCircle()
                }
                aud.onended = function() {
                    stopGame(songId)
                }
            }
            else if (start.classList.contains('song-3')){
                let songId = 3
                let aud = document.getElementById("audio-3");
                aud.play()
                aud.onplaying = function() {
                    generateCircle()
                }
                aud.onended = function() {
                    stopGame(songId)
                }
            }

    }
// helper function to reset song after a game and after previewing song
    function songReset(){
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
            setTimeout(greenCircleFunc, 3000)
        }
        else{
            songReset()
        }
    }
// function to make ball disappear if user does not click
    function ballTimeout(color,generateColorCircleFunction){
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
        let red = new createjs.Shape();
        red.graphics.beginFill("Red").drawCircle(0, 0, 35);
        red.x = xRay[Math.floor(Math.random()*xRay.length)];
        red.y = yRay[Math.floor(Math.random()*yRay.length)];

        stage.addChild(red);
        stage.update();
        ball += 1
        let gamePercent = (score/ball) * 100
        if(songPlaying === true){
            setTimeout(function()
                {
                    ballTimeout(red,redCircleFunc)
                }, 1800)
            red.addEventListener("click", function(event){
                 stage.removeChild(event.target);
                 stage.update();
                 score += 1
//refactor
                 gameStats.innerHTML =
                 `
                    <h1> ${score} </h1>

                    <h1 id = "health"> ${gamePercent.toFixed(2)}%</h1>
                 `
             }.bind(this));
        }
        else{
            clearCircle()
        }

    }


// blue ball generator function
    let blueCircleFunc = function blueCircle(){
        let gamePercent = (score/ball) * 100
        let blue = new createjs.Shape();
        blue.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 35);
        blue.x = xRay[Math.floor(Math.random()*xRay.length)];
        blue.y = yRay[Math.floor(Math.random()*yRay.length)];
        stage.addChild(blue);
        stage.update();
        ball += 1
        if(songPlaying === true){
            setTimeout(function (){
                ballTimeout(blue,blueCircleFunc)
            }, 1800)
            blue.addEventListener("click", function(event){
                 stage.removeChild(event.target);
                 stage.update();
                 score += 1
                 //refactor
                 gameStats.innerHTML =
                 `
                    <h1> ${score} </h1>
                    <br>
                    <h1 id = "health"> ${gamePercent.toFixed(2)}%</h1>
                 `
                 console.log(ball)
                 console.log(score)
             }.bind(this));
        }
        else{
            clearCircle()
        }
    }

// green ball generator
    let greenCircleFunc = function greenCircle(){
        let gamePercent = (score/ball) * 100
        var green = new createjs.Shape();
        green.graphics.beginFill("Green").drawCircle(0, 0, 35);
        green.x = xRay[Math.floor(Math.random()*xRay.length)];
        green.y = yRay[Math.floor(Math.random()*yRay.length)];
        stage.addChild(green);
        stage.update();
        ball += 1

        if(songPlaying === true){
            setTimeout(function(){
                ballTimeout(green,greenCircleFunc)
            }, 2000)
            green.addEventListener("click", function(event){
                 stage.removeChild(event.target);
                 stage.update();
                 score += 1
                 //refactor
                 gameStats.innerHTML =
                 `
                    <h1> ${score} </h1>
                    <br>
                    <h1 id = "health"> ${gamePercent.toFixed(2)}%</h1>
                 `
             }.bind(this));
        }
        else{
            clearCircle()
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
        submitBtn.addEventListener('submit', addScore)

        function addScore(e){

            let playerName = document.querySelector('#playerOne').value

            fetch(`http://localhost:3000/scores`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({name: playerName, points: showScore, song_id: songId})
            })
        }
    }
// function to toggle song scoreboard selection menu
    function showSongScoreMenu(){
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
        return fetch(`http://localhost:3000/songs/${songId}/scores`)
        .then(resp => resp.json())

    }

    function getSongs(){
        return fetch(`http://localhost:3000/songs`)
        .then(resp => resp.json())
    }




    resizeCanvas();
    playButton.addEventListener('click',showSongMenu)
    scoreButton.addEventListener('click', showSongScoreMenu)
    songs.addEventListener('click', songChoice)
    start.addEventListener('click', playGame)


});







//
