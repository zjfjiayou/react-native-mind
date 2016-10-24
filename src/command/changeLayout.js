import command from '../core/command'
import options from '../core/options'
import {NodeTree} from '../core/nodeTree'


function main(layoutStr,rootId){
    options.set('layout',layoutStr);
    command.exec('redraw',rootId);

}


command.register('changeLayout',main);