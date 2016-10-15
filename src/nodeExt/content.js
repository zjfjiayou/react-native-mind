import React, {
    Component,
    PropTypes
} from 'react'

import {
    Text,
    G,
    Rect,
    Image
} from 'react-native-svg'

import nodeStyle from '../style/node.style'

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {nodeData}=this.props;
        let textList;

        textList=nodeData.data.contentList.map((item,index)=>{
            if(item==''){
                return false;
            }
            return <Text
                        key={index}
                        {...nodeStyle.content.text}
                        y={nodeData.titleBox.height+nodeStyle.content.content.paddingTop+index*nodeStyle.lineHeight}
                        x={nodeStyle.content.content.x+nodeStyle.content.content.paddingLeft}
                    >
                    {item}
                </Text>
        });

        if(!nodeData.data.contentList.length){
            textList=<Text
                        {...nodeStyle.content.text}
                        fontSize='12'
                        y={nodeData.titleBox.height+2}
                        x={nodeStyle.content.content.x+nodeStyle.content.content.paddingLeft}
                    >
                    请填写内容
                </Text>
        }

        return (
            <G>
               <Rect
                    {...nodeStyle.image.nodeBox}
                    width={nodeData.shape.width}
                    height={nodeData.shape.height}
                />
                <Text {...nodeStyle.content.title}>{nodeData.data.title}</Text>
               <Rect
                    {...nodeStyle.image.content}
                    width={nodeData.contentBox.width-2*nodeStyle.image.content.x}
                    height={nodeData.contentBox.height-nodeStyle.image.content.y}
                    y={nodeData.titleBox.height}
                />
                {textList}
            </G>
        );
    }
}


export default Content;
