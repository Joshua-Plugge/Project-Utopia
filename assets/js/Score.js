class Score
{
    constructor()
    {
        const windowSize = app.resolution;
        this.position = new Vector2(windowSize.x * 0.005, 30);
        
        this.font = {
            color: new Color(0, 0, 0),
            size: "30px",
            type: "Times New Roman",
            toString: () => {
                return [this.font.size, this.font.type].join(" ");
            }
        };
        this.score = 0;
        this.scoreText = "Score: ";
    }

    /**
     * Increases current score that is displayed
     * @param {number} amount Amount to increase by, must be a number (not a string).
     */
    increaseScore(amount = 1)
    {
        this.score += amount;
    }

    /**
     * No update for background.
     * @param {number} deltaTime Represents delta time between each update call.
     */
    update(deltaTime)
    {
        this.score += 1;
    }

    /**
     * Renders player to the canvas.
     * @param {CanvasRenderingContext2D} context .
     */
    draw(context)
    {
        const previous = {
            font: context.font,
            fillStyle: context.fillStyle,
        };
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.rotate(0);

        context.fillStyle = this.font.color.rgba();
        context.font = this.font.toString();
        context.fillText(this.scoreText.concat(this.score), this.position.x, this.position.y);

        context.fillStyle = previous.fillStyle;
        context.font = previous.font;
    }
}