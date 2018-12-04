
 document.addEventListener("DOMContentLoaded", function(event) {

    let htmlCanvas = document.getElementById('c');
    let context = htmlCanvas.getContext('2d');
    let playButton = document.getElementById('button1');
    let home = document.getElementById('home-Button')
    let songs = document.getElementById("song-menu")
    let sound = document.querySelectorAll(".preview")
    let showStartButton = document.getElementById('start-button')
    let start = document.getElementById('start')

    let xRay = []
    for(i=100; i < 1300; i++){
      xRay.push(i)}

    let yRay = []
    for(i=100; i < 650; i++){
      yRay.push(i)}



// function to resize canvas upon DOM Loaded

   function resizeCanvas() {
       document.getElementById("c").style.background = "url('images/home.jpg')";
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
           red.graphics.beginFill("Red").drawCircle(0, 0, 35);
           red.x = xRay[Math.floor(Math.random()*xRay.length)];
           red.y = yRay[Math.floor(Math.random()*yRay.length)];
           stage.addChild(red);
           stage.update();
           setTimeout(ballTimeout, 1000)


           red.addEventListener("click", function(event){
                stage.removeChild(event.target);
                stage.update();
            }.bind(this));

            function ballTimeout(){
                stage.removeChild(red);
                stage.update();
                redCircle()
            }


       }

       function blueCircle(){
           let blue = new createjs.Shape();
           blue.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 35);
           blue.x = xRay[Math.floor(Math.random()*xRay.length)];
           blue.y = yRay[Math.floor(Math.random()*yRay.length)];
           stage.addChild(blue);
           stage.update();
           setTimeout(ballTimeout, 1500)

           blue.addEventListener("click", function(event){
                stage.removeChild(event.target);
                stage.update();
            }.bind(this));

            function ballTimeout(){
                stage.removeChild(blue);
                stage.update();
                blueCircle()
            }

       }

       function greenCircle(){
           var green = new createjs.Shape();
           green.graphics.beginFill("Green").drawCircle(0, 0, 35);
           green.x = xRay[Math.floor(Math.random()*xRay.length)];
           green.y = yRay[Math.floor(Math.random()*yRay.length)];
           stage.addChild(green);
           stage.update();
           setTimeout(ballTimeout, 2000)

           green.addEventListener("click", function(event){
                stage.removeChild(event.target);
                stage.update();
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
