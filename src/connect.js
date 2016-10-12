import React, { Component, PropTypes } from 'react';

import {Path,G} from 'react-native-svg'

class Connect extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {nodeData} = this.props;

        let path;

        //计算连线
        if(!nodeData.isRoot()){
            const x1=0;
            const y1=nodeData.shape.height/2;
            const x2=-(nodeData.point.x-nodeData.parent.point.x-nodeData.parent.shape.width);
            const y2=-(nodeData.point.y-nodeData.parent.point.y-nodeData.parent.shape.height/2);

            const pathData = "M0 " + y1+"L-20"  + " "+y1 + "L-20"+ " " + y2+"L"+x2+" "+y2;

            path=<Path
                    d={pathData}
                    fill="none"
                    stroke="#157efb"
                    strokeWidth="1"
                />
        }

        return (
            <G>{path}</G>
        );
    }
}

export default Connect;
