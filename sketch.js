var bird;
var pipes = [];

// Creating the sketch canvas (size of the play area window)
function setup() {
  createCanvas(1425, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);

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
  if (frameCount % 120 == 0) {
    pipes.push(new Pipe());
  }
}

// Function controlling which key you press to move the bird.js object
function keyPressed() {
  if (key == ' ') {
    bird.up();
    console.log("SPACE HAS BEEN PUSHED!")
  }
}