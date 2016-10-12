class Box {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    set width(width) {
        this._width = width;
    }

    get width() {
        return this._width;
    }

    set height(height) {
        this._height = height;
    }

    get height() {
        return this._height;
    }
}


module.exports = Box;
