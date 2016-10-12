import React, {
    Component,
    PropTypes
} from 'react'

import {
    Text,
    G,
    Rect
} from 'react-native-svg'

import nodeStyle from '../style/node.style'

class T extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {nodeData}=this.props;
        return (
            <G>
               <Rect
                    {...nodeStyle.text.nodeBox}
                    width={nodeData.shape.width}
                    height={nodeData.shape.height}
                />
              <Text {...nodeStyle.text.title}>{nodeData.data.text}</Text>
            </G>
        );
    }
}


export default T;
