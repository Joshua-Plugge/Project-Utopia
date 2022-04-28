class TouchInput
{
    /**
     * Construct input class.
     * @constructor
     */
    constructor()
    {
        this.textureRight = new Image();
        this.textureLeft = new Image();
        this.textureRight.src = "assets/img/Right Arrow.png";
        this.textureLeft.src = "assets/img/Left Arrow.png";
        this.windowSize = app.resolution;

        this.events = {
            onTouchStart: this.onTouchStart.bind(this),
            onTouchMove: this.onTouchMove.bind(this),
            onTouchEnd: this.onTouchEnd.bind(this)
        };

        /**
         * @type {{$0: Touch, $1: Touch, $2: Touch}}
         */
        this.touches = {};

        let regionSize = new Vector2(this.windowSize.x * 0.2,this.windowSize.y * 0.2);
        let regionPosY = this.windowSize.y * 0.8;

        /**
         * @type {[{position: Vector2, size: Vector2, isPressed: boolean, tag: HTMLDivElement}]}
         */
        this.regions = [];

        this.regions.push(
            {
                position: new Vector2(this.windowSize.x * 0.01, regionPosY),
                size: new Vector2(regionSize.x, regionSize.y),
                isPressed: false,
                tag: document.createElement("div")
            }
        );
        this.regions.push(
            {
                position: new Vector2(this.windowSize.x * 0.79, regionPosY),
                size: new Vector2(regionSize.x, regionSize.y),
                isPressed: false,
                tag: document.createElement("div")
            }
        );

        for (let i = 0; i < this.regions.length; ++i)
        {
            let region = this.regions[i];
            region.tag.id = "div" + (i + 1);
            region.tag.classList.add("input");
            region.tag.style.position = "absolute";
            region.tag.style.left = region.position.x + "px";
            region.tag.style.top = region.position.y + "px";
            region.tag.style.width = region.size.x + "px";
            region.tag.style.minWidth = region.size.x + "px";
            region.tag.style.maxWidth = region.size.x + "px";
            region.tag.style.height = region.size.y + "px";
            region.tag.style.minHeight = region.size.y + "px";
            region.tag.style.maxHeight = region.size.y + "px";
        }
    }

    /**
     * 
     */
    start()
    {
        let length = this.regions.length;
        for (let i = 0; i < length; ++i)
        {
            let htmlTag = this.regions[i].tag;
            htmlTag.addEventListener("touchstart", this.events.onTouchStart, false);
            htmlTag.addEventListener("touchmove", this.events.onTouchMove, false);
            htmlTag.addEventListener("touchend", this.events.onTouchEnd, false);
            document.body.appendChild(htmlTag);
        }
    }

    /**
     * 
     */
    stop()
    {
        let length = this.regions.length;
        for (let i = 0; i < length; ++i)
        {
            let htmlTag = this.regions[i].tag;
            htmlTag.removeEventListener("touchstart", this.events.onTouchStart, false);
            htmlTag.removeEventListener("touchmove", this.events.onTouchMove, false);
            htmlTag.removeEventListener("touchend", this.events.onTouchEnd, false);
            htmlTag.parentNode.removeChild(htmlTag);
        }
    }

    /**
     * Update input's elements.
     * @param {{ moveLeft: boolean, moveRight: boolean }} input reference to input so we can set appropriate movement booleans.
     * @param {number} dt delta time between each update call.
     */
    update(input, dt)
    {
        let regions = this.regions;

        input.moveLeft = regions[0].isPressed;
        input.moveRight = regions[1].isPressed;
    }

    /**
     * Draw the input's elements to the canvas.
     * @param {CanvasRenderingContext2D} context2D the canvas' 2d context used as target for drawing.
     * @param {WorldMetric} worldMetric the world metric system, used to convert world units into pixel units.
     */
    draw(context2D)
    {
        /**
         * 
         * @param {{position: Vector2, size: Vector2, isPressed: boolean, tag: HTMLDivElement}} region
         * @param {HTMLImageElement} texture
         */
        let drawRegion = function (region, texture)
        {
            let pixelRegion = {
                position: region.position,
                size: region.size,
                origin: new Vector2(
                    region.size.x * 0.5,
                    region.size.y * 0.5
                ),
                texture: texture,
                pressed: region.isPressed
            };

            if (pixelRegion.pressed)
            {
                const scale = 0.05
                context2D.setTransform(
                      1 + scale
                    , 0
                    , 0
                    , 1 + scale
                    , pixelRegion.position.x + pixelRegion.origin.x - pixelRegion.size.x * scale
                    , pixelRegion.position.y + pixelRegion.origin.y - pixelRegion.size.y * scale
                );
                context2D.rotate(0.0);
                context2D.drawImage(
                    pixelRegion.texture
                    , -(pixelRegion.origin.x - pixelRegion.size.x * scale)
                    , -(pixelRegion.origin.y - pixelRegion.size.y * scale)
                    , pixelRegion.size.x
                    , pixelRegion.size.y
                );
            }
            else
            {
                context2D.setTransform(
                      1
                    , 0
                    , 0
                    , 1
                    , pixelRegion.position.x + pixelRegion.origin.x
                    , pixelRegion.position.y + pixelRegion.origin.y
                );
                context2D.rotate(0.0);
                context2D.drawImage(
                    pixelRegion.texture
                    , -pixelRegion.origin.x
                    , -pixelRegion.origin.y
                    , pixelRegion.size.x
                    , pixelRegion.size.y
                );
            }
        };

        drawRegion(this.regions[0], this.textureLeft);
        drawRegion(this.regions[1], this.textureRight);
    }

    /**
     * Callback function occurred when input element is
     * tapped-down on by a touch capable device.
     * @param {TouchEvent} event Holds touch event data.
     */
    onTouchStart(event)
    {
        /**
         * @type {{position: Vector2, size: Vector2, tag: HTMLDivElement, isPressed: boolean}}
         */
        let region;
        if (event.target.id === "div1")
        {
            region = this.regions[0];
            region.isPressed = true;
        }
        else if (event.target.id === "div2")
        {
            region = this.regions[1];
            region.isPressed = true;
        }
        event.preventDefault();
    }

    /**
     * Callback function occured when input element has a
     * tap moved on it by a touch capable device.
     * @param {TouchEvent} event Holds touch event data.
     */
    onTouchMove(event)
    {

    }

    /**
     * Callback function occured when input element is
     * tapped-up on by a touch capable device.
     * @param {TouchEvent} event Holds touch event data.
     */
    onTouchEnd(event)
    {
        /**
         * @type {{position: Vector2, size: Vector2, tag: HTMLDivElement, isPressed: boolean}}
         */
        let region;
        if (event.target.id === "div1")
        {
            region = this.regions[0];
            region.isPressed = false;
        }
        else if (event.target.id === "div2")
        {
            region = this.regions[1];
            region.isPressed = false;
        }
        event.preventDefault();
    }
}