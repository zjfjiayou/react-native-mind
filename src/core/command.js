class Command {

    constructor() {
        this._command = {};
    }

    exec(key) {
        let result = [];
        if (this._command.hasOwnProperty(key)) {
            this._command[key].forEach((item) => {
                result.push(item.apply(this, Array.prototype.slice.call(arguments, 1)));
            });
        }

        if (result.length === 1) {
            return result[0];
        }
        return result;
    }

    register(key, value) {
        this._command[key] = [];
        this._command[key].push(value);
        return this;
    }

}

const command = new Command();

export default command;
