class KeyboardInput
{
    /**
     * Construct input class.
     * @constructor
     */
    constructor()
    {
        this.events = {
            onKeyDown: this.onKeyDown.bind(this),
            onKeyUp: this.onKeyUp.bind(this)
        };
        this.isLeftKeyDown = false;
        this.isRightKeyDown = false;
    }

    /**
     * Initialize event callbacks, appended to the document
     */
    start()
    {
        document.addEventListener("keyup", this.events.onKeyUp, false);
        document.addEventListener("keydown", this.events.onKeyDown, false);
    }

    /**
     * Revmove event callbacks, appended to the document
     */
    stop()
    {
        document.removeEventListener("keyup", this.events.onKeyUp, false);
        document.removeEventListener("keydown", this.events.onKeyDown, false);
    }

    /**
     * Update input's elements.
     * @param {{ moveLeft: boolean, moveRight: boolean }} input reference to input so we can set appropriate movement booleans.
     * @param {number} dt delta time between each update call.
     */
    update(input, dt)
    {
        input.moveLeft = this.isLeftKeyDown;
        input.moveRight = this.isRightKeyDown;
    }

    /**
     * Draw the input's elements to the canvas.
     * @param {CanvasRenderingContext2D} context2D the canvas' 2d context used as target for drawing.
     */
    draw(context2D)
    {
    }

    /**
     * Callback function occurred when key is pressed down.
     * Key values retrieved according to
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
     * @param {KeyboardEvent} event Holds key event data.
     */
    onKeyDown(event)
    {
        switch (event.key)
        {
            case "a":
            case "Left": // IE/Edge browser specific value
            case "ArrowLeft":
                this.isLeftKeyDown = true;
                break;
            case "d":
            case "Right": // IE/Edge browser specific value
            case "ArrowRight":
                this.isRightKeyDown = true;
                break;
            default:
                return; // Quit function on input we don't handle
        }
        event.preventDefault();
    }

    /**
     * Callback function occurred when key is released.
     * @param {KeyboardEvent} event Holds key event data.
     */
    onKeyUp(event)
    {
        switch (event.key)
        {
            case "a":
            case "Left": // IE/Edge browser specific value
            case "ArrowLeft":
                this.isLeftKeyDown = false;
                break;
            case "d":
            case "Right": // IE/Edge browser specific value
            case "ArrowRight":
                this.isRightKeyDown = false;
                break;
            default:
                return; // Quit function on input we don't handle
        }
        // Cancel default action to avoid it being handled twice.
        event.preventDefault();
    }
}