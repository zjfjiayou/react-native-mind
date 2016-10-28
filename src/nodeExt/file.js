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

        if(!nodeData.data.fileNameList||!nodeData.data.fileNameList.length){
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

        return (
            <G>
               <Rect
                    {...nodeStyle.image.nodeBox}
                    width={nodeData.shape.width}
                    height={nodeData.shape.height}
                />
                <Text {...nodeStyle.file.title}>{nodeData.data.title}</Text>
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
                {nodeData.data.fileNameList[0]
                ?<Text
                    {...nodeStyle.file.fileName}
                    y={nodeData.titleBox.height+nodeStyle.file.content.paddingTop}
                    x={nodeStyle.file.content.x+nodeStyle.file.content.paddingLeft+nodeStyle.file.thumb.singleWidth+nodeStyle.file.fileName.marginLeft}
                >
                    {nodeData.data.fileNameList[0]}
                </Text>
                :<G/>
                }
                {nodeData.data.fileNameList[1]
                ?<Text
                    {...nodeStyle.file.fileName}
                    y={nodeData.titleBox.height+nodeStyle.file.content.paddingTop+20}
                    x={nodeStyle.file.content.x+nodeStyle.file.content.paddingLeft+nodeStyle.file.thumb.singleWidth+nodeStyle.file.fileName.marginLeft}
                >
                    {nodeData.data.fileNameList[1]}
                </Text>
                :<G/>
                }   
            </G>
        );
    }
}


export default File;
