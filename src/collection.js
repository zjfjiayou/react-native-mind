import React, { Component, PropTypes } from 'react'

import {emitter} from './core/utils'

import {G} from 'react-native-svg'

import NodeTree from './core/nodeTree'
import Node from './node';

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

        emitter.once('collection.redraw',()=>{
            this.setState({
                ready:true
            });
        });

        this.layout=this.layout.bind(this);

    }

    get allNode(){
        return this.state.nodeTree.allNode;
    }

    layout(){
        this.forceUpdate();
    }

    componentDidMount() {
        console.log('一棵节点树渲染完成');
    }


    render() {

        if(!this.state.ready){
            return <G></G>;
        }

        const nodeList = this.allNode.map(node=>{
            return <Node redraw={this.layout} nodeData={node} key={node.data.id}></Node>
        });

        //加了一个反转，使得子节点先渲染，进而使得子节点的连线先渲染，最后在渲染节点上的图片
        return (
            <G>{nodeList.reverse()}</G>
        );
    }
}

export default Collection;
