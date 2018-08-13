function Pipe() {

    // Size of the space created, a random number bewteen 20 and window hight 2
    var space = random(28 , height / 4);
    // Where the space should be located on the screen
    var center = random(space, height - space);

    this.top = center - space / 2;
    this.bottom = height - (center + space / 2);
    this.x = width;
    this.w = 22;
    this.move = 4;

    this.highlight = false;

    // Checks if the bird has hit the pipes
    this.hits = function(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }       
                this.highlight = false;
                return false;
    }

    // Draws the Pipes and defines a random size of each opening
    this.show = function() {
        fill(255);
        if (this.highlight) {
            fill(255, 0, 0);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height-this.bottom, this.w, this.bottom);
    }

    this.update = function() {
        this.x -= this.move;
    }

    this.offscreen = function() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;

        }
    }
}