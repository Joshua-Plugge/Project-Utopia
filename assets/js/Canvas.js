/**
 * Represents our target canvas for all draw calls.
 * @class
 * @classdesc Uses the html canvas tag as the target for all draw calls.
 */
class Canvas
{
    /**
     * Construct a canvas with the passed id.
     * @constructor
     * @param {String} canvasID Defines the canvas' ID.
     */
    constructor(canvasID)
    {
        this.htmlCanvas = this.createHTMLCanvas(canvasID);
        this.context2D = this.htmlCanvas.getContext("2d");
        this.backgroundColor = new Color(0, 0, 0, 255);
        this.resolution = {
            x: this.htmlCanvas.width, 
            y: this.htmlCanvas.height
        };
    }

    /**
     * Initialises the canvas - the drawing surface. The canvas
     * is added to the document. When a HTML document is loaded into a
     * browser, it becomes a document object. This document object is
     * the root node of the HTML document and is considered the 'owner' of all other
     * nodes such as forms, buttons, the canvas etc.
     * @param {String} canvasID Defines the id of the canvas.
     * @returns {HTMLCanvasElement} returns reference to the created canvas.
     */
    createHTMLCanvas(canvasID)
    {
        // Use the document object to create a new element canvas.
        var canvas = document.createElement("canvas");
        // Assign the canvas an id so we can reference it elsewhere.
        canvas.id = canvasID;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Adds the canvas element to the document.
        document.body.appendChild(canvas);

        return canvas;
    }

    /**
     * Clears the html canvas' current content.
     */
    clear()
    {
        this.context2D.setTransform(1, 0, 0, 1, 0, 0);
        this.context2D.fillStyle = this.backgroundColor.rgba();
        this.context2D.clearRect(0, 0, this.resolution.x, this.resolution.y);
    }
}