import React, {
    Component
} from 'react';

import {
    Text,
    G,
    Rect
} from 'react-native-svg';

import nodeStyle from '../style/node.style';

class Title extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {nodeData} = this.props;
        return (
            <G>
               <Rect
                    {...nodeStyle.title.nodeBox}
                    width={nodeData.shape.width}
                    height={nodeData.shape.height}
                />
              <Text {...nodeStyle.title.title}>{nodeData.data.title}</Text>
            </G>
        );
    }
}


export default Title;
