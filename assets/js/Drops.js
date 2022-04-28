class Drops
{
    constructor()
    {
        this.windowSize = app.resolution;
        this.spawnLocationY = this.windowSize.y * -0.1;
        /** @type {Array<{imageIndex: number, position: Vector2>} */
        this.items = [];

        this.spawn = {
            timer: 0,
            interval: 1000 // in milliseconds
        };


        this.size = new Vector2(this.windowSize.x * 0.1, this.windowSize.y * 0.15);
        this.spritesheet = {
            textures: [new Image(), new Image(), new Image(), new Image()],
            textureRect: new Rectangle(0, 0, 598, 870),
            origin: new Vector2(this.size.x * -0.5, this.size.y * -0.5),
        };
        this.spritesheet.textures[0].src = "assets/img/food.png";
        this.spritesheet.textures[1].src = "assets/img/electricity.png";
        this.spritesheet.textures[2].src = "assets/img/moneybag.png";
        this.spritesheet.textures[3].src = "assets/img/waterdrop.png";
    }

    /**
     * No update for background.
     * @param {number} deltaTime Represents delta time between each update call.
     */
    update(player, score, deltaTime)
    {
        const moveSpeed = 0.5 * deltaTime;
        this.items.forEach((item, index, array) =>
        {
            item.position.y += moveSpeed;
            if (item.position.y > this.windowSize.y + this.size.y)
            {
                array = array.splice(index, 1);
            }
            if (item.position.y + this.size.y > player.position.y
                && !(item.position.x + this.size.x < player.position.x
                || item.position.x > player.position.x + player.size.x))
            {
                array = array.splice(index, 1);
                score.increaseScore(5);
            }
        });
        this.spawn.timer += deltaTime;
        if (this.spawn.timer > this.spawn.interval)
        {
            this.spawn.timer -= this.spawn.interval;
            this.items.push(this.generateItem());
        }
    }

    /**
     * Generates item
     */
    generateItem()
    {
        // Generates a random number from 0 to 3 (inclusive)
        const randomIndex = Math.floor(Math.random() * 100) % 4;
        return { imageIndex: randomIndex, position: this.generateSpawnPosition() };
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
        for (const item of this.items)
        {
            context.setTransform(1, 0, 0, 1, item.position.x + (this.size.x * 0.5), item.position.y + (this.size.y * 0.5));
            context.rotate(0);

            context.drawImage(
                this.spritesheet.textures[item.imageIndex],
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