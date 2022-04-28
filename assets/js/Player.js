class Player
{
    constructor()
    {
        this.windowSize = app.resolution;
        const startingPosition = new Vector2(this.windowSize.x * 0.5, this.windowSize.y * 0.6);
        this.position = new Vector2(startingPosition.x, startingPosition.y);

        const scaledPlayerSize = new Vector2(this.windowSize.x * 0.2, this.windowSize.y * 0.2);
        // Pick same smallest value for width and height to maintain image aspect ratio
        const scaledSize = Math.min(scaledPlayerSize.x, scaledPlayerSize.y);
        this.size = new Vector2(scaledSize, scaledSize);

        this.spritesheet = {
            texture: new Image(),
            textureRect: new Rectangle(0,0,80,80),
            origin: new Vector2(this.size.x * -0.5,this.size.y * -0.5), 
        };

        // Contains the various animations with pre-calculated animation frame values.
        // Interval for each animation (only need one for all)
        // Contains other necessary components for running animations, namely a timer and
        //  current index of the current animation to cycle through the frames.
        this.animation = {
            interval: 100, // in milliseconds
            timer: 0,
            frameIndex: 0,
            idle: {
                rectangle: new Rectangle(80 * 0, 80 * 0, 80, 80)
            },
            walkLeft: {
                rectangles: [
                    new Rectangle(80 * 0, 80 * 1, 80, 80),
                    new Rectangle(80 * 1, 80 * 1, 80, 80),
                    new Rectangle(80 * 2, 80 * 1, 80, 80),
                    new Rectangle(80 * 3, 80 * 1, 80, 80)
                ]
            },
            walkRight: {
                rectangles: [
                    new Rectangle(80 * 0, 80 * 2, 80, 80),
                    new Rectangle(80 * 1, 80 * 2, 80, 80),
                    new Rectangle(80 * 2, 80 * 2, 80, 80),
                    new Rectangle(80 * 3, 80 * 2, 80, 80)
                ]
            }
        };
        this.isMovingLeft = false;
        this.isMovingRight = false;

        this.spritesheet.texture.src = "assets/img/Player.png";

    }

    /**
     * Update the players position based on input.
     * @param {{ moveLeft: boolean, moveRight: boolean }} input reference to input so we can use the appropriate movement booleans.
     * @param {number} deltaTime Represents delta time between each update call.
     */
    update(input, deltaTime)
    {
        const moveSpeed = 1.1 * deltaTime;
        this.isMovingLeft = input.moveLeft;
        this.isMovingRight = input.moveRight;
        if (input.moveLeft)
        {
            this.position.x -= moveSpeed;
        }
        if (input.moveRight)
        {
            this.position.x += moveSpeed;
        }
        if (!this.isMovingLeft && !this.isMovingRight)
        {
            // Player is standing still, therefore reset animation frame index.
            this.animation.frameIndex = 0;
        }
        // If the player is moving at all, increment animation timer.
        this.animation.timer = (this.isMovingLeft || this.isMovingRight)
            ? this.animation.timer + deltaTime 
            : 0;
        this.boundaryCollisions();
    }

    /**
     * Renders player to the canvas.
     * @param {CanvasRenderingContext2D} context .
     */
    draw(context)
    {
        context.setTransform(1, 0, 0, 1, this.position.x + (this.size.x * 0.5), this.position.y + (this.size.y * 0.5));
        context.rotate(0);

        // Check if player is moving
        if (this.isMovingLeft || this.isMovingRight)
        {
            // Check if enough time has passed.
            if (this.animation.timer > this.animation.interval)
            {
                // Enough time has passed, increment animation frame index.
                this.animation.timer = 0;
                // Modulus operator maintains value from 0 to 3 (does not include 4)
                this.animation.frameIndex = (this.animation.frameIndex + 1) % 4;
            }
            // Apply appropriate texture rectangle, according to spritesheet and
            //  whether moving left or right.
            this.spritesheet.textureRect = this.isMovingLeft
                ? this.animation.walkLeft.rectangles[this.animation.frameIndex]
                : this.animation.walkRight.rectangles[this.animation.frameIndex];
        }
        else
        {
            // We are not moving therefore set to idle frame.
            this.spritesheet.textureRect = this.animation.idle.rectangle;
        }
        context.drawImage(
            this.spritesheet.texture,
            this.spritesheet.textureRect.position.x,
            this.spritesheet.textureRect.position.y,
            this.spritesheet.textureRect.width,
            this.spritesheet.textureRect.height,
            this.spritesheet.origin.x,
            this.spritesheet.origin.y,
            this.size.x,
            this.size.y,
        );
    }

    /**
     * Process collisions by preventing player from moving out of the screen.
     * Calculate bounding box (no rotations keeps this simple),
     * Only x-axis movement means only x-axis boundary verifcations.
     */
    boundaryCollisions()
    {
        const boundary = {
            left: 0,
            top: 0,
            right: this.windowSize.x,
            bottom: this.windowSize.y
        };
        const playerBoundary = {
            left: this.position.x,
            top: this.position.y,
            right: this.position.x + this.size.x,
            bottom: this.position.y + this.size.y
        };
        this.position.x = playerBoundary.left < boundary.left
            ? boundary.left
            : this.position.x;
        this.position.x = playerBoundary.right > boundary.right
            ? boundary.right - this.size.x
            : this.position.x;
        //this.position.y = playerBoundary.top < boundary.top
        //    ? boundary.top
        //    : this.position.y;
        //this.position.y = playerBoundary.bottom > boundary.bottom
        //    ? boundary.bottom - this.size.y
        //    : this.position.y;
    }
}