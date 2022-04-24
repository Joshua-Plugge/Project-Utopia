class Player
{
    constructor()
    {
        this.position = new Vector2(0,0);
        this.size = new Vector2(200,200);
        this.spritesheet = {
            texture: new Image(),
            textureRect: new Rectangle(0,0,80,80),
            origin: new Vector2(this.size.x * -0.5,this.size.y * -0.5), 
        };

        this.spritesheet.texture.src = "assets/img/Player.png";

    }

    update(deltaTime)
    {
        
    }

    /**
     * Renders player to the canvas.
     * @param {CanvasRenderingContext2D} context .
     */
    draw(context)
    {
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
            this.size.y,
        );
    }
}