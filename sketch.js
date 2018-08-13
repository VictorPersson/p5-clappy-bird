var bird;
var pipes = [];
var mic;

// Creating the sketch canvas (size of the play area window)
function setup() {
  createCanvas(1000, 600);
  // Creating a new mic audio input-in object
  mic = new p5.AudioIn();
  // Gets the mic to start listening
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  var vol= mic.getLevel();

    // For all pipes in the array, spawn them and update them.
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        console.log("Gameover");
      }
      // Removes old/offscreen pipes from the array due to memory
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

  bird.update();
  bird.show();

  // Adds a new pipe to the array every 120th frames
  if (frameCount % 112 == 0) {
    pipes.push(new Pipe());
  }

  if (vol > 0.2) {
    bird.up();
  } 
  // Drawing a rectangle which will fill up with a green color wehn volume is picked up
  fill(0, 190 , 0);
  var y = map(vol, 0, 2, height, 0);
  rect(width - 50, y, 50, height - y);
  
}

// Function controlling which key you press to move the bird.js object
function keyPressed() {
  //if (key == ' ') {
    if (vol > 0.2) { 
      bird.up();
  }
}