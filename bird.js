function Bird() {
    this.y = height / 2;
    // Margin-left from the side of the screen
    this.x = 64;

    this.fall = 0.5;
    this.fly = -12;
    this.speed = 0;

    // Shape and size of the acual flying object
    this.show = function() {
        fill(255);
        noStroke();
        // noStroke Removes the red outlines created by the slider threshold function
        ellipse(this.x, this.y, 52, 20);
    }

    this.up = function() {
        this.speed += this.fly;
    }

    this.update = function() {
        this.speed += this.fall;
        // Prevets it from flying to high when spamming spce (adds weight)
        this.speed *= 0.9;
        this.y += this.speed;

        // Prevents you from falling under the map / canvas area
        if (this.y > height) {
            this.y = height;
            this.speed = 0;
        }
        // Prevents you from flying above the set canvas
        if (this.y < 0) {
            this.y = height;
            this.speed = 0;
        }
    }
}