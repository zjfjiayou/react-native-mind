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

class File extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {nodeData}=this.props;

        let addIcon;

        //添加图像的
        // if(!nodeData.data.content.length){
        //     addIcon = <G
        //                     y={nodeData.titleBox.height+nodeStyle.image.content.paddingTop}
        //                     x={nodeStyle.image.content.x+nodeData.data.content.length*(nodeStyle.image.content.singleWidth+nodeStyle.image.content.marginLeft)+nodeStyle.image.content.marginLeft}
        //                 >
        //                     <Rect
        //                         fill='#fff'
        //                         stroke='#ccc'
        //                         width={nodeStyle.image.content.singleWidth}
        //                         height={nodeStyle.image.content.singleHeight}
        //                     />
        //                     <Text
        //                         y='-10'
        //                         x='7'
        //                         fontSize = '40'
        //                         fontWeight='400'
        //                         fontFamily = 'Heiti SC'
        //                         fill='#ccc'
        //                     >+</Text>
        //                 </G>
        // }

        return (
            <G>
               <Rect
                    {...nodeStyle.image.nodeBox}
                    width={nodeData.shape.width}
                    height={nodeData.shape.height}
                />
                <Text {...nodeStyle.file.title}>{nodeData.data.text}</Text>
               <Rect
                    {...nodeStyle.image.content}
                    width={nodeData.contentBox.width-2*nodeStyle.image.content.x}
                    height={nodeData.contentBox.height-nodeStyle.image.content.y}
                    y={nodeData.titleBox.height}
                />
                <Image
                    href={require('../icon/file.jpg')}
                    width={nodeStyle.file.thumb.singleWidth}
                    height={nodeStyle.file.thumb.singleHeight}
                    y={nodeData.titleBox.height+nodeStyle.file.content.paddingTop}
                    x={nodeStyle.file.content.x+nodeStyle.file.content.marginLeft}
                    preserveAspectRatio="xMinYMin slice"/>
                <Text
                    {...nodeStyle.file.title}
                    y={nodeData.titleBox.height+nodeStyle.file.content.paddingTop}
                    x={nodeStyle.file.content.x+nodeStyle.file.content.paddingLeft+nodeStyle.file.thumb.singleWidth+nodeStyle.file.text.marginLeft}
                >
                    {nodeData.data.fileNameList[0]}
                </Text>
               <Text
                    {...nodeStyle.file.title}
                    y={nodeData.titleBox.height+nodeStyle.file.content.paddingTop+20}
                    x={nodeStyle.file.content.x+nodeStyle.file.content.paddingLeft+nodeStyle.file.thumb.singleWidth+nodeStyle.file.text.marginLeft}
                >
                    {nodeData.data.fileNameList[1]}
                </Text>
            </G>
        );
    }
}


export default File;
