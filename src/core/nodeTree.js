import {NativeModules} from 'react-native'
import {emitter} from './utils'
import Node from './node'
import nodeStyle from '../style/node.style'


//获取文字宽度
const testLength=NativeModules.Testlength;
//切分文字
const splitText=NativeModules.splitTextByWidth;

// splitText.processString('1213你你你a',{font:'Heiti SC',fontSize:14},{width:28,height:50},(error,textList)=>{
//     console.log(textList)
// })

class NodeTree {
    constructor(nodeData) {
        this._root = this.createNode(nodeData, null);
        this.importNode(this._root,nodeData);

        //计算节点大小和位置
        this.calcPosition();
    }

    get root() {
        return this._root;
    }

    get allNode() {
        var nodes = [];
        this.root.traverse(function(node) {
            nodes.push(node);
        });
        return nodes;
    }

    //递归导入节点数据
    importNode(node,json) {
        var data = json.data;
        node.data = {};

        for (var field in data) {
            node.setData(field, data[field]);
        }

        var childrenTreeData = json.children || [];
        for (var i = 0; i < childrenTreeData.length; i++) {
            var childNode = this.createNode(null, node);
            this.importNode(childNode, childrenTreeData[i]);
        }
        return node;
    }

    //初始化node对象
    createNode(data, parent) {
        const node = new Node(data);
        this.appendNode(node, parent);
        return node;
    }

    appendNode(node, parent) {
        if (parent) parent.insertChild(node);
        return this;
    }

    //计算节点位置
    calcPosition(){

        let promiseList=[];

        //计算标题所占长度与高度
        this.allNode.forEach(node=>{
            let p = new Promise((resolve, reject) => {
                testLength.processString(node.data.text, {
                        font: 'Heiti SC',
                        fontSize: node.style.title.fontSize
                    }, {
                        width: 400,
                        height: 50
                    },
                    (error, w, h) => {
                        node.titleBox.height = Number(h) + nodeStyle.paddingTop + nodeStyle.paddingBottom;
                        node.titleBox.width = Number(w) + nodeStyle.paddingLeft + nodeStyle.paddingRight;
                        resolve();
                    });
            });

            promiseList.push(p);
        });

        //切分文件标题
        this.allNode.forEach(node=>{
            if (node.data.type===2){
                let p = new Promise((resolve, reject) => {
                    splitText.processString(node.data.content[0].name, {
                        font: 'Heiti SC',
                        fontSize: node.style.title.fontSize
                    }, {
                        width: node.style.text.width,
                        height: 50
                    }, (error, textList) => {
                        node.data.fileNameList=textList
                        resolve();
                    });
                });
                promiseList.push(p);
            }
        });

        //切分正文
        this.allNode.forEach(node=>{
            if (node.data.type===3){
                let p = new Promise((resolve, reject) => {
                    splitText.processString(node.data.content, {
                        font: 'Heiti SC',
                        fontSize: node.style.title.fontSize
                    }, {
                        width: node.style.text.width,
                        height: 50
                    }, (error, textList) => {
                        node.data.contentList=textList.filter((item)=>{return item!=''});
                        resolve();
                    });
                });
                promiseList.push(p);
            }
        });

        Promise.all(promiseList).then(()=>{

            //计算内容所占大小
            this.allNode.forEach(node=>{
                let style=node.style;
                switch(node.data.type){
                    case 1:
                        node.contentBox.width=((node.data.content?node.data.content.length:0)+1)*(style.content.singleWidth+style.content.marginLeft)-style.content.marginLeft+style.content.paddingLeft+style.content.paddingRight+2*style.content.x;
                        node.contentBox.height=style.content.singleHeight+style.content.paddingTop+style.content.paddingBottom+style.content.y;
                        break;
                    case 2:
                        node.contentBox.width=style.content.singleWidth+style.content.paddingLeft+style.content.paddingRight+2*style.content.x;
                        node.contentBox.height=style.content.singleHeight+style.content.paddingTop+style.content.paddingBottom+style.content.y;
                        break;
                    case 3:
                        node.contentBox.width=style.content.singleWidth+style.content.paddingLeft+style.content.paddingRight+2*style.content.x;
                        node.contentBox.height=style.content.singleHeight*node.data.contentList.length+style.content.paddingTop+style.content.paddingBottom+style.content.y;
                        break;
                }
            });

            //计算节点Y轴偏移位置
            this.allNode.forEach((node,index)=>{
                if(node.isRoot()){
                    return
                }

                const childrenMaxHeight=node.maxHeight;

                var dy=0;

                if(childrenMaxHeight){
                    if(node.shape.height<childrenMaxHeight){
                        dy=(childrenMaxHeight-node.shape.height)/2;
                    }
                }

                node.point.y=-node.parent.maxHeight/2+node.parent.point.y+node.parent.shape.height/2+nodeStyle.blankBottom/2;

                if(node.index==0&&node.children.length>1){
                    node.point.y=node.parent.point.y+node.parent.shape.height/2-node.shape.height/2;
                }

                //计算大于第二例的位置
                if(node.index>0){
                    node.point.y+=node.parent.point.childOffsetY+dy;
                    dy*=2;
                }


                //记录偏移
                node.parent.point.childOffsetY+=node.shape.height+dy+nodeStyle.blankBottom;
                node.point.x=node.parent.point.offsetX+node.parent.shape.width+nodeStyle.blankLeft;
                node.point.offsetX=node.point.x;
            });

            emitter.emit('collection.redraw');
        });
    }

}

module.exports = NodeTree;
