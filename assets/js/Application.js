/**
 * Where the program starts from.
 * @class
 * @classdesc Main Controller for our application
 */
class Application
{
    /**
     * Calls all pre-initialization for our application.
     * @constructor
     */
    constructor()
    {
        if (app.isTouchDevice)
        {
            console.log("Device is Touch Capable");
        }
        else
        {
            console.log("Device is NOT Touch Capable");
        }

        this.prevDt = Date.now();
        this.canvas = new Canvas("game-canvas");
        this.player = new Player();
        if (app.isTouchDevice)
        {
            this.touchInput = new TouchInput();

            this.touchInput.start();

        }
        this.isLeft = false;
        this.isRight = false;
    }

    /**
     * Entry point for application.
     */
    run()
    {
        this.loop();
    }

    /**
     * Main loop logic, contains call to update and draw using fully qualified invocations,
     * in its own function so update and draw maintain the correct this refernce.
     */
    loop()
    {
        var application = app.application;
        application.update();
        application.draw();

        window.requestAnimationFrame(application.loop);
    }

    /**
     * Main update logic.
     */
    update()
    {
        /**
         * Represents delta time between each update call.
         */
        var dt = this.calcDeltaTime();
        if (app.isTouchDevice) 
        {
            this.touchInput.update(this, dt);
        }
        this.player.update(dt);
    }

    /**
     * Main rendering logic.
     */
    draw()
    {
        this.canvas.clear();
        if (app.isTouchDevice) 
        {
           this.touchInput.draw(this.canvas.context2D); 
        }
        this.player.draw(this.canvas.context2D);
    }

    /**
     * Calculates current delta time from last time this was called.
     * @returns {Number} the current delta time.
     */
    calcDeltaTime()
    {
        var now = Date.now();
        var dt = now - this.prevDt;
        this.prevDt = now;
        return dt;
    }
}