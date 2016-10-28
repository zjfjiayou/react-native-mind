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

        //修改显示模式
        command.register('changeLayout',(mode,rootId)=>{
            if(rootId==self.state.nodeTree.root.data.node_id){
                self.state.nodeTree.chooseLayout(mode);
                command.exec('redraw',rootId);
            }
        });

        //重算坐标并重绘绘
        command.register('redraw',(rootId)=>{
            if(rootId==self.state.nodeTree.root.data.node_id){
                self.state.nodeTree.calcPosition();
            }
        });

        //重绘
        command.register('layout',(rootId)=>{
            if(rootId==self.state.nodeTree.root.data.node_id){
                this.setState({
                    ready:true
                });
            }
        });

        //获取根节点
        command.register('getRoot',(rootId)=>{
            if(rootId&&(rootId==self.state.nodeTree.root.data.node_id)){
                return self.state.nodeTree.root;
            }

            if(rootId==undefined){
                return self.state.nodeTree.root;
            }
        });

        //获取根节点
        command.register('moveToStart',(rootId,point)=>{
            if(rootId&&(rootId==self.state.nodeTree.root.data.node_id)){

                this.props.moveToStart(point);

                return self.state.nodeTree.root;
            }
        });        
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.ready){
            emitter.emit('tree.layout',this.state.nodeTree.root);
        }
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
