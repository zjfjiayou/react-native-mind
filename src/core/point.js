class Point {

    constructor(x, y, offsetX, childOffsetY) {
        this.x = x;
        this.y = y;
        this.childOffsetY = childOffsetY;
        this.offsetX = offsetX;
    }

    set x(x) {
        this._x = x;
    }

    get x() {
        return this._x;
    }

    set y(y) {
        this._y = y;
    }

    get y() {
        return this._y;
    }

    set childOffsetY(childOffsetY) {
        this._childOffsetY = childOffsetY;
    }

    get childOffsetY() {
        return this._childOffsetY;
    }

    set offsetX(offsetX) {
        this._offsetX = offsetX;
    }

    get offsetX() {
        return this._offsetX;
    }
}


module.exports = Point;
