/**
 * Collection of data to refer to a rectangle
 * @class
 * @classdesc Defines a rectangles position and size.
 */
class Rectangle
{
    /**
     * Construct a rectangle,
     * with defined parameters.
     * @param {number} x defines the top-left x position of the rectangle.
     * @param {number} y defines the top-left y position of the rectangle.
     * @param {number} width defines the width along x-axis of the rectangle.
     * @param {number} height defines the height along y-axis of the rectangle.
     */
    constructor(x, y, width, height)
    {
        this.position = new Vector2(x, y);
        this.width = width;
        this.height = height;
    }

    /**
     * get the center of a rectangle shape.
     * @returns {Vector2} returns the center position of the rectangle.
     */
    getCenter()
    {
        return new Vector2(this.position.x + (this.width / 2), this.position.y + (this.height / 2));
    }
}