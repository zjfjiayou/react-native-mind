import config from '../config';

class Options {

    constructor() {
        this._options = {};

        this.set(config);
    }

    set(key, value) {
        if (Object.prototype.toString.call(key) === '[object Object]') {
            var data = key;
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    this._options[key] = data[key];
                }
            }
        } else {
            this._options[key] = value;
        }
        return this;
    }

    get(key) {
        return key ? this._options[key] : this._options;
    }

}

const options = new Options();


export default options;

