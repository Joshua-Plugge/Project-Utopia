class Background
{
    constructor()
    {
        const windowSize = app.resolution;
        this.position = new Vector2(windowSize.x * 0, windowSize.y * 0);
        
        this.size = new Vector2(windowSize.x, windowSize.y);
        this.spritesheets = {
            textureDestroyedCity: new Image(),
            textureGoodCity: new Image(),
            textureRect: new Rectangle(0,0,1419,511),
            origin: new Vector2(this.size.x * -0.5,this.size.y * -0.5),
            opacityGoodCity: 0.0
        };
        this.timer = 0;
        this.interval = 50; // in milliseconds
        this.spritesheets.textureGoodCity.src = "assets/img/CityBG.png";
        this.spritesheets.textureDestroyedCity.src = "assets/img/DestroyedCityBG.png";
    }

    /**
     * Updates background when score is high enough.
     * @param {Score} score Reference to score.
     * @param {number} deltaTime Represents delta time between each update call.
     */
    update(score, deltaTime)
    {
        if (score.score > 100)
        {
            this.timer += deltaTime;
            while (this.timer > this.interval)
            {
                this.spritesheets.opacityGoodCity += 0.01;
                this.timer -= this.interval;
            }
            if (this.spritesheets.opacityGoodCity < 0)
            {
                this.spritesheets.opacityGoodCity = 1;
            }
        }
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
            this.spritesheets.textureDestroyedCity,
            this.spritesheets.textureRect.position.x,
            this.spritesheets.textureRect.position.y,
            this.spritesheets.textureRect.width,
            this.spritesheets.textureRect.height,
            this.spritesheets.origin.x,
            this.spritesheets.origin.y,
            this.size.x,
            this.size.y
        );

        context.globalAlpha = this.spritesheets.opacityGoodCity;
        context.drawImage(
            this.spritesheets.textureGoodCity,
            this.spritesheets.textureRect.position.x,
            this.spritesheets.textureRect.position.y,
            this.spritesheets.textureRect.width,
            this.spritesheets.textureRect.height,
            this.spritesheets.origin.x,
            this.spritesheets.origin.y,
            this.size.x,
            this.size.y
        );
        context.globalAlpha = 1;
    }
}