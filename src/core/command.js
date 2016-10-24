class Command{

    constructor(){
        this._command={};
    }

    exec(key){
        if(this._command.hasOwnProperty(key)){
            this._command[key].forEach((item)=>{
                item.apply(this,Array.prototype.slice.call(arguments,1));
            });
        }
    }

    register(key,value){
        this._command[key] = [];
        this._command[key].push(value);
        return this;
    }

}

const command=new Command();

export default command;