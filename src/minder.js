import React, { Component, PropTypes } from 'react';

import {Svg,G} from 'react-native-svg';

import Collection from './collection';

class Minder extends Component {
    static propTypes = {
        dataList: PropTypes.array,
    };

    constructor(props) {
        super(props);

        this.state={
            x:0,
            y:0
        }

        this._initX=0;
        this._initY=0;
        this._ox=0;
        this._oy=0;

        this.move=this.move.bind(this);
        this.press=this.press.bind(this);
        this.pressOut=this.pressOut.bind(this);
    }

    move(evn){
        const dx=evn.nativeEvent.pageX-this._ox+this._initX;
        const dy=evn.nativeEvent.pageY-this._oy+this._initY;

        this.setState({
            x:dx,
            y:dy
        });
    }

    press(evn){
        this._ox=evn.nativeEvent.pageX;
        this._oy=evn.nativeEvent.pageY;
    }

    pressOut(){
        this._initX=this.state.x;
        this._initY=this.state.y;
    }

    render() {

        const pageContent = this.props.dataList.map(nodeTree=>{
            return <Collection nodeTree={nodeTree} key={nodeTree.root.data.id}></Collection>
        });

        return (
            <Svg
                style={{flex:1}}
                onStartShouldSetResponder={()=>{return true}}
                onMoveShouldSetResponder={()=>{return true}}
                onResponderStart={this.press}
                onResponderMove={this.move}
                onResponderRelease={this.pressOut}
            >
                <G
                    x={this.state.x}
                    y={this.state.y+this.props.height/2}
                >
                    {pageContent}
                </G>
            </Svg>
        );
    }
}

export default Minder;
