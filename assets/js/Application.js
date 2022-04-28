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
        this.background = new Background();
        this.player = new Player();
        this.score = new Score();
        if (app.isTouchDevice)
        {
            this.touchInput = new TouchInput();
            this.touchInput.start();
        }
        else
        {
            this.keyInput = new KeyboardInput();
            this.keyInput.start();
        }
        this.playerInput = {
            moveLeft: false,
            moveRight: false
        };;

        this.drops = new Drops(); 
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
        this.background.update(dt);
        if (app.isTouchDevice) 
        {
            this.touchInput.update(this.playerInput, dt);
        }
        else
        {
            this.keyInput.update(this.playerInput, dt);
        }
        this.drops.update(dt);
        this.player.update(this.playerInput, dt);
        this.score.update(dt);
    }

    /**
     * Main rendering logic.
     */
    draw()
    {
        this.canvas.clear();
        this.background.draw(this.canvas.context2D);
        if (app.isTouchDevice) 
        {
           this.touchInput.draw(this.canvas.context2D); 
        }
        else
        {
            this.keyInput.draw(this.canvas.context2D);
        }
        this.drops.draw(this.canvas.context2D);
        this.player.draw(this.canvas.context2D);
        this.score.draw(this.canvas.context2D);
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