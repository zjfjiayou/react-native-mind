import React, { Component } from 'react';
import {
    PanResponder,
    View,
    Animated,
    Easing
} from 'react-native';

import {
    G,
    Use,
} from 'react-native-svg';

import Point from '../core/point'

import { emitter } from '../core/utils'
import command from '../core/command'

const DH = {
    G: Animated.createAnimatedComponent(G)
}


//计算节点位置
function calcPosition(node){
    let totalHeight=-10,
        offsetY=0;

    node.children.forEach((item=>{
        item.navigation=new Point(0, 0, 0, 0,0);
        totalHeight+=item.shape.height+10;
    }));

    node.children.forEach((item=>{
        item.navigation.y=-(totalHeight-node.shape.height)/2+node.point.y+offsetY;
        offsetY+=item.shape.height+10;
    }));
}

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            activeNode: undefined,
            opacity:new Animated.Value(0)
        }

        emitter.once('tree.layout', (rootNode) => {
            this.setState({
                ready: true,
                activeNode: rootNode
            });

            this.forceUpdate()
        });

        emitter.on('node.press', (node) => {
            this.setState({ activeNode: node });
            this.forceUpdate();
            this.dh();
        });

        this.dh=this.dh.bind(this);
    }

    dh(){
        this.state.opacity.setValue(0);     
        Animated.timing(                          
        this.state.opacity,                 
        {
            toValue:1,
            duration: 500,
            easing:Easing.inOut(Easing.ease)          
        }
        ).start();  
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {

        if (!this.state.ready) {
            return <G></G>
        }

        //计算节点要到达的位置
        calcPosition(this.state.activeNode);

        let childrenList = this.state.activeNode.children.map((node, index) => {

            return (<DH.G
                        key={index}
                        y={node.point.y}
                        x={node.point.x}
                         opacity={this.state.opacity}
                        >
                        <Use href={'#' + node.data.node_id} x="-30" />
                    </DH.G>);
        });

        return (
            <G style={{opacity:"0"}}>
                {childrenList}
            </G>
        );
    }
}

export default Navigation;