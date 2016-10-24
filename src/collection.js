import React, { Component, PropTypes } from 'react'

import {emitter} from './core/utils'

import {G} from 'react-native-svg'

import {NodeTree} from './core/nodeTree'
import Node from './node'
import command from './core/command'
import options from './core/options'

class Collection extends Component {
    static propTypes = {
        nodeTree: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state={
            ready:false,
            nodeTree:new NodeTree(this.props.nodeTree.root)
        }

        this.layout=this.layout.bind(this);

    }

    get allNode(){
        return this.state.nodeTree.allNode;
    }

    layout(){
        this.forceUpdate();
    }

    componentDidMount() {
        const self=this;

        command.register('changeLayout',(mode,rootId)=>{
            if(rootId==self.state.nodeTree.root.data.node_id){
                self.state.nodeTree.chooseLayout(mode);
                command.exec('redraw',rootId);
            }
        });

        command.register('redraw',(rootId)=>{
            if(rootId==self.state.nodeTree.root.data.node_id){
                self.state.nodeTree.calcPosition();
            }
        });

        command.register('draw',(rootId)=>{
            if(rootId==self.state.nodeTree.root.data.node_id){
                this.setState({
                    ready:true
                });
            }
        });        
    }


    render() {

        if(!this.state.ready){
            return <G></G>;
        }

        const nodeList = this.allNode.map(node=>{
            return <Node redraw={this.layout} nodeData={node} key={node.data.node_id}></Node>
        });

        //加了一个反转，使得子节点先渲染，进而使得子节点的连线先渲染，最后在渲染节点上的图片
        return (
            <G>{nodeList.reverse()}</G>
        );
    }
}

export default Collection;
