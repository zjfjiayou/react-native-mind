import React, { Component, PropTypes } from 'react'

import {emitter} from './core/utils'
import {G,Rect} from 'react-native-svg'

import Connect from './connect'
import Expand from './expand'

import Title from './nodeExt/title'
import Image from './nodeExt/image'
import File from './nodeExt/file'
import Content from './nodeExt/content'
import command from './core/command'

class Node extends Component {
    constructor(props) {
        super(props);

        this.hideChildren=this.hideChildren.bind(this);
    }

    hideChildren(expand){

        this.props.nodeData.postTraverse((node)=>{
            node.data.expand=expand;
            node._chenged=true;
        },true);

        command.exec('redraw',this.props.nodeData.root.data.node_id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.nodeData._chenged){
            nextProps.nodeData._chenged=false;
            return true;
        }
        return false;
    }

    render(){
        let path,
            node;

        const {nodeData} = this.props;


        //节点类型分类
        switch(nodeData.data.content_type){
            case 'content.builtin.image':
                node=<Image nodeData={nodeData}></Image>;
                break;
            case 'content.builtin.attachment':
                node=<File nodeData={nodeData}></File>;
                break;
            case 'content.builtin.text':
                node=<Content nodeData={nodeData}></Content>;
                break;
            default:
                node=<Title nodeData={nodeData}></Title>;
                break;
        }

        //判断节点是否展开
        if(!nodeData.isRoot()&&nodeData.data.expand===false){
            return <G></G>
        }

        return (
            <G
                y={nodeData.point.y}
                x={nodeData.point.x}

            >
                <Connect nodeData={nodeData}/>
                <G
                    id={nodeData.data.node_id}
                    onPress={(evn)=>{
                        emitter.emit('node.press',nodeData);
                    }}                    
                >
                {node}
                </G>
                <Expand nodeData={nodeData} hideChildren={this.hideChildren}></Expand>
            </G>
        );
    }
}


export default Node;
