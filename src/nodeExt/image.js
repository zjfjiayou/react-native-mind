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

class Img extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {nodeData}=this.props;

        //图像列表
        let imageList=nodeData.data.content.map((item,index)=>{
            return  <Image
                    key={index}
                    href={item.url}
                    width={nodeStyle.image.content.singleWidth}
                    height={nodeStyle.image.content.singleHeight}
                    y={nodeData.titleBox.height+nodeStyle.image.content.paddingTop}
                    x={nodeStyle.image.content.x+index*(nodeStyle.image.content.singleWidth+nodeStyle.image.content.marginLeft)+nodeStyle.image.content.marginLeft}
                    preserveAspectRatio="xMinYMin slice"/>
        });

        //添加图像的
        if(nodeData.data.content.length<4){
            imageList.push(
                        <G
                            key='add'
                            y={nodeData.titleBox.height+nodeStyle.image.content.paddingTop}
                            x={nodeStyle.image.content.x+nodeData.data.content.length*(nodeStyle.image.content.singleWidth+nodeStyle.image.content.marginLeft)+nodeStyle.image.content.marginLeft}
                        >
                            <Rect
                                fill='#fff'
                                stroke='#ccc'
                                width={nodeStyle.image.content.singleWidth}
                                height={nodeStyle.image.content.singleHeight}
                            />
                            <Text
                                y='-10'
                                x='7'
                                fontSize = '40'
                                fontWeight='400'
                                fontFamily = 'Heiti SC'
                                fill='#ccc'
                            >+</Text>
                        </G>
                    )
        }

        return (
            <G>
               <Rect
                    {...nodeStyle.image.nodeBox}
                    width={nodeData.shape.width}
                    height={nodeData.shape.height}
                />
               <Rect
                    {...nodeStyle.image.content}
                    width={nodeData.contentBox.width-2*nodeStyle.image.content.x}
                    height={nodeData.contentBox.height-nodeStyle.image.content.y}
                    y={nodeData.titleBox.height}
                />
                {imageList}
                <Text {...nodeStyle.image.title}>{nodeData.data.text}</Text>
            </G>
        );
    }
}


export default Img;
