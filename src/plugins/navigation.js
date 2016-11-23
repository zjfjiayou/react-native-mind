import React, { Component } from 'react';
import {
    Animated,
    Easing
} from 'react-native';

import {
    G,
    Use,
    Rect
} from 'react-native-svg';

import Point from '../core/point';

import { emitter } from '../core/utils';
import command from '../core/command';



class AG extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <G {...this.props} opacity={this.props.opacity} />
        );
    }
}

const DH = {
    G: Animated.createAnimatedComponent(AG)
};

var animateMap = [];

//计算节点位置
function calcPosition(node){
    let totalHeight = -10,
        offsetY = 0;

    node.children.forEach((item=>{
        item.navigation = new Point(0, 0, 0, 0,0);
        totalHeight += item.shape.height + 10;
    }));

    node.children.forEach((item=>{
        item.navigation.y = -(totalHeight - node.shape.height) / 2 + node.point.y + offsetY;
        offsetY += item.shape.height + 10;
    }));
}
var animateMap = {};

//搞动画
function makeAnimate(node){
    animateMap = {};

    //计算节点要到达的位置
    calcPosition(node);

    node.children.forEach((item=>{
        animateMap[item.data.node_id] = {opacity:new Animated.Value(0),y:new Animated.Value(node.point.y)};
    }));
}


class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            activeNode: undefined
        };

        emitter.once('tree.layout', (rootNode) => {
            this.state.ready = true;
            this.state.activeNode = rootNode;

            makeAnimate(rootNode);
            this.dh();
            this.forceUpdate();
        });

        emitter.on('node.press', (node) => {
            //移动到当前节点
            command.exec('moveToStart',node.root.data.node_id,node.point);
            this.state.activeNode = node;

            makeAnimate(node);
            this.dh();
            this.forceUpdate();
        });

        this.dh = this.dh.bind(this);
    }

    dh(){
        this.state.activeNode.children.forEach((item)=>{
            animateMap[item.data.node_id].opacity.setValue(0);
            animateMap[item.data.node_id].y.setValue(item.point.y);

            Animated.parallel([Animated.timing(animateMap[item.data.node_id].opacity,
            {
                toValue:1,
                duration: 300,
                easing:Easing.inOut(Easing.ease)
            }),Animated.timing(animateMap[item.data.node_id].y,
            {
                toValue:item.navigation.y,
                duration: 300,
                easing:Easing.inOut(Easing.ease)
            })]).start();
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {

        if (!this.state.ready) {
            return <G />;
        }

        let childrenList = this.state.activeNode.children.map((node, index) => {

            return (<DH.G
                        key={index}
                        y={animateMap[node.data.node_id].y}
                        x={node.point.x}
                        opacity={animateMap[node.data.node_id].opacity}
                        strokeWidth="3"
                        onPress={()=>{
                            emitter.emit('node.press',node);
                        }}
                        >
                            <Rect
                                width={node.shape.width}
                                height={node.shape.height}
                            />
                            <Use href={'#' + node.data.node_id}/>
                    </DH.G>);
        });

        return (
            <G >
                {childrenList}
            </G>
        );
    }
}

export default Navigation;
