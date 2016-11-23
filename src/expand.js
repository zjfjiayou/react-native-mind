import React, { Component } from 'react';

import {emitter} from './core/utils';

import {Image,G} from 'react-native-svg';

class Expand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expand:true
        };
        this.hideChildren = this.hideChildren.bind(this);
    }

    hideChildren(){
        this.state.expand = !this.state.expand;
        this.props.hideChildren(this.state.expand);
        emitter.emit('expand.press',this.props.nodeData);
    }

    render() {
        const {nodeData} = this.props;
        const x = nodeData.shape.width + 10;
        const y = nodeData.shape.height / 2 - 10;

        //判断是否显示收缩展开图标
        if (!nodeData.getChildren().length){
            return (<G />);
        }

        return (
            <G
                x={x}
                y={y}
                onPress={this.hideChildren}
            >
                {this.state.expand
                    ? <Image href={require('./icon/expand-open.png')} width="20" height="20"/>
                    : <Image href={require('./icon/expand-close.png')} width="20" height="20"/>
                }
            </G>
        );
    }
}

export default Expand;
