import React, { Component, PropTypes } from 'react'
import pureRender from 'pure-render-decorator'

import {G,Rect} from 'react-native-svg'

import Connect from './connect'
import Expand from './expand'

import Text from './nodeExt/text'
import Image from './nodeExt/image'
import File from './nodeExt/file'
import Content from './nodeExt/content'


class Node extends Component {
    constructor(props) {
        super(props);

        this.hideChildren=this.hideChildren.bind(this);
    }

    hideChildren(){
        this.props.nodeData.data.expand=!this.props.nodeData.data.expand;

        console.log(this.props.nodeData.data.expand)

        this.props.redraw()
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps.nodeData.data.expand,this.props.nodeData.data.expand,nextState)
        // if(nextProps.nodeData.data.expand!=this.props.nodeData.data.expand){
        //     return true;
        // }
        return false
    }

    render(){
        let path,
            node;

        const {nodeData} = this.props;


        //节点类型分类
        switch(nodeData.data.type){
            case 1:
                node=<Image nodeData={nodeData}></Image>;
                break;
            case 2:
                node=<File nodeData={nodeData}></File>;
                break;
            case 3:
                node=<Content nodeData={nodeData}></Content>;
                break;
            default:
                node=<Text nodeData={nodeData}></Text>;
                break;
        }

        //判断节点是否展开
        if(!nodeData.isRoot()&&nodeData.parent.data.expand===false){
            return <G></G>
        }

        console.log('update')

        return (
            <G
                y={nodeData.point.y}
                x={nodeData.point.x}
                onPress={()=>{console.log(nodeData)}}
            >
                <Connect nodeData={nodeData}/>
                {node}
                <Expand nodeData={nodeData} hideChildren={this.hideChildren}></Expand>
            </G>
        );
    }
}


export default Node;
