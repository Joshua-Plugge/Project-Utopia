/**
 * Container for 2 numbers.
 * @class
 * @classdesc Used merely a simple container for 2 numbers.
 */
class Vector2
{
    /**
     * Constructs our vector with 2 floats.
     * @constructor
     * @param {Number} x represents x-coordinate (defaults to 0).
     * @param {Number} y represents y-coordinate (defaults to 0).
     */
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    /**
     * Constructs string out of this.
     * @param {number} digits Defines the number of digits (defaults to 2), use null for full precision.
     * @returns {string} Returns a string format of the vector (x,y).
     */
    toString(digits = 2)
    {
        if (digits === null)
        {
            return "(" + this.x.toString() + "," + this.y.toString() + ")";
        }
        else
        {
            return "(" + this.x.toFixed(digits).toString() + "," + this.y.toFixed(digits).toString() + ")";
        }
    }

    /**
     * Gets the unit vector of this.
     * @returns {Vector2} Returns a unit vector of this.
     */
    unit()
    {
        var length = this.len();
        return new Vector2(this.x / length, this.y / length);
    }

    /**
     * Gets the length of a vector
     * @returns {Number} returns length of the vector.
     */
    len()
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    /**
     * Adds the right hand side vector to this vector.
     * @param {Vector2} rhs Right hand side.
     * @returns {Vector2} returns reference to altered implicitly called vector.
     */
    add(rhs)
    {
        this.x += rhs.x;
        this.y += rhs.y;
        return this;
    }

    /**
     * Subtracts the right hand side vector from this vector.
     * @param {Vector2} rhs Right hand side.
     * @returns {Vector2} returns reference to altered implicitly called vector.
     */
    sub(rhs)
    {
        this.x -= rhs.x;
        this.y -= rhs.y;
        return this;
    }

    /**
     * 
     * @param {Vector2} rhs Right hand side.
     * @returns {Vector2} returns reference to altered implicitly called vector.
     */
    mult(rhs)
    {
        this.x *= rhs.x;
        this.y *= rhs.y;
        return this;
    }

    /**
     * 
     * @param {number} num scalar to divide by.
     * @returns {Vector2} returns divided vector.
     */
    div(num)
    {
        this.x /= num;
        this.y /= num;
        return this;
    }

    /**
     * 
     * @param {Vector2} lhs left hand side.
     * @param {Vector2} rhs right hand side.
     * @returns {Vector2} New added Vector2.
     */
    static add(lhs, rhs)
    {
        return new Vector2(lhs.x + rhs.x, lhs.y + rhs.y);
    }

    /**
     * 
     * @param {Vector2} lhs left hand side.
     * @param {Vector2} rhs right hand side.
     * @returns {Vector2} New subtracted Vector2.
     */
    static sub(lhs, rhs)
    {
        return new Vector2(lhs.x - rhs.x, lhs.y - rhs.y);
    }

    /**
     * 
     * @param {Vector2} lhs left hand side.
     * @param {Vector2} rhs right hand side.
     * @returns {Vector2} New multiplied vector.
     */
    static mult(lhs, rhs)
    {
        return new Vector2(lhs.x * rhs.x, lhs.y * rhs.y);
    }

    /**
     * 
     * @param {Vector2} vec vector to divide.
     * @param {number} num number to divide our vec by.
     * @returns {Vector2} New divided vector2.
     */
    static div(vec, num)
    {
        return new Vector2(vec.x / num, vec.y / num);
    }
}