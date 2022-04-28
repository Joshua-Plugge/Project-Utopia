class Background
{
    constructor()
    {
        const windowSize = app.resolution;
        this.position = new Vector2(windowSize.x * 0, windowSize.y * 0);
        
        this.size = new Vector2(windowSize.x, windowSize.y);
        this.spritesheet = {
            texture: new Image(),
            textureRect: new Rectangle(0,0,1419,511),
            origin: new Vector2(this.size.x * -0.5,this.size.y * -0.5),
            opacity: 1.0
        };
        this.timer = 0;
        this.interval = 50; // in milliseconds
        this.spritesheet.texture.src = "assets/img/CityBG.png";
    }

    /**
     * No update for background.
     * @param {number} deltaTime Represents delta time between each update call.
     */
    update(deltaTime)
    {
        this.timer += deltaTime;
        while (this.timer > this.interval)
        {
            this.spritesheet.opacity -= 0.01;
            this.timer -= this.interval;
        }
        if (this.spritesheet.opacity < 0)
        {
            this.spritesheet.opacity = 1;
        }
    }

    /**
     * Renders player to the canvas.
     * @param {CanvasRenderingContext2D} context .
     */
    draw(context)
    {
        context.globalAlpha = this.spritesheet.opacity;
        context.setTransform(1, 0, 0, 1, this.position.x + (this.size.x * 0.5), this.position.y + (this.size.y * 0.5));
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
        context.globalAlpha = 1;
    }
}