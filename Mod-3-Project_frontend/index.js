
 document.addEventListener("DOMContentLoaded", function(event) {
    let htmlCanvas = document.getElementById('c');
    let context = htmlCanvas.getContext('2d');
    let playButton = document.getElementById('button1')

   resizeCanvas();
// function to resize canvas upon DOM Loaded
   function resizeCanvas() {
       document.getElementById("c").style.background = "url('images/home.jpg')";
       htmlCanvas.width = window.innerWidth;
       htmlCanvas.height = window.innerHeight;

    }
    function showSongMenu(){
        console.log("Hello")

    }

    playButton.addEventListener('click',hideshow);






});







//
