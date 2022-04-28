class Drops
{
    constructor()
    {
        this.windowSize = app.resolution;
        this.spawnLocationY = this.windowSize.y * -0.1;
        /** @type {Array<Vector2>} */
        this.positions = [];

        this.spawn = {
            timer: 0,
            interval: 1000 // in milliseconds
        };


        this.size = new Vector2(this.windowSize.x * 0.2, this.windowSize.y * 0.2);
        this.spritesheet = {
            texture: new Image(),
            textureRect: new Rectangle(0, 0, 80, 80),
            origin: new Vector2(this.size.x * -0.5, this.size.y * -0.5),
        };
        this.spritesheet.texture.src = "assets/img/Player.png";
    }

    /**
     * No update for background.
     * @param {number} deltaTime Represents delta time between each update call.
     */
    update(deltaTime)
    {
        const moveSpeed = 0.5 * deltaTime;
        this.positions.forEach((position, index, array) =>
        {
            position.y += moveSpeed;
            if (position.y > this.windowSize.y + this.size.y)
            {
                array = array.splice(index, 1);
            }
        });
        this.spawn.timer += deltaTime;
        if (this.spawn.timer > this.spawn.interval)
        {
            this.spawn.timer -= this.spawn.interval;
            this.positions.push(this.generateSpawnPosition());
        }
    }

    /**
     * Generates a spawn position
     */
    generateSpawnPosition()
    {
        const posX = (this.windowSize.x * 0.2) + Math.random() * (this.windowSize.x * 0.6);
        return new Vector2(posX, this.spawnLocationY);
    }

    /**
     * Renders player to the canvas.
     * @param {CanvasRenderingContext2D} context .
     */
    draw(context)
    {
        for (const position of this.positions)
        {
            context.setTransform(1, 0, 0, 1, position.x + (this.size.x * 0.5), position.y + (this.size.y * 0.5));
            context.rotate(0);

            context.drawImage(
                this.spritesheet.texture,
                this.spritesheet.textureRect.position.x,
                this.spritesheet.textureRect.position.y,
                this.spritesheet.textureRect.width,
                this.spritesheet.textureRect.height,
                this.spritesheet.origin.x,
                this.spritesheet.origin.y,
                this.size.x,
                this.size.y
            );
        }
    }
}