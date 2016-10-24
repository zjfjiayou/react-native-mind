import { register } from '../core/nodeTree'
import nodeStyle from '../style/node.style'

const normal = {

    init: function () {

        //计算节点所占区域大小
        this.root.postTraverse((node) => {

            node.area.width = node.shape.width;
            
            if (node.isRoot()) {
                return
            }

            if(node.data.expand===false){
                node.parent.area.height = 0;
            }

            if (node.isLeaf()) {
                node.parent.area.height += node.shape.height;
                node.area.height = node.shape.height;
                if (!node.isLast()) {
                    node.parent.area.height += nodeStyle.blankBottom;
                    node.area.height += nodeStyle.blankBottom;
                }
            } else {
                node.parent.area.height += node.area.height;
            }

        });

        //计算节点Y轴偏移位置
        this.allNode.forEach((node, index) => {      

            if (node.isRoot()) {
                return
            }

            node.point.y = -(node.parent.area.height - node.parent.shape.height) / 2 + (node.area.height - node.shape.height) / 2 + node.parent.point.y + node.parent.point.childOffsetY

            //记录偏移
            if (node.isLeaf()) {
                node.parent.point.childOffsetY += node.shape.height + nodeStyle.blankBottom;
            } else {
                node.parent.point.childOffsetY += node.area.height;
            }
            node.point.x = node.parent.point.offsetX + node.parent.shape.width + nodeStyle.blankLeft;
            node.point.offsetX = node.point.x;
        });
    }
}

register('normal', normal);