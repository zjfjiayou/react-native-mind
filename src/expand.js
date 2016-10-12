import React, { Component, PropTypes } from 'react';

import {Image,G} from 'react-native-svg'

class Expand extends Component {

    constructor(props) {
        super(props);
        this.hideChildren=this.hideChildren.bind(this);
    }

    hideChildren(){
        this.props.hideChildren();
    }

    render() {
        const {nodeData}=this.props;
        const x = nodeData.shape.width+18;
        const y = nodeData.shape.height/2-10;

        //判断是否显示收缩展开图标
        if (!nodeData.getChildren().length){
            return (<G></G>)
        }

        return (
            <G x={x} y={y} onPress={this.hideChildren}>
                <Image href={require('./icon/expand-open.png')} width='20' height='20'/>
            </G>
        );
    }
}

export default Expand;
