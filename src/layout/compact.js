import { register } from '../core/nodeTree';
import nodeStyle from '../style/node.style';

const compact = {

    init: function () {

        function calcCoordinate() {
            //计算节点Y轴偏移位置
            this.allNode.forEach((node, index) => {
                node.point.childOffsetY = 0;
                node.point.offsetX = 0;
                node.point.x = 0;
                node.point.y = 0;

                if (node.isRoot()) {
                    node.area.height = 0;
                    node.children.forEach((item) => {
                        node.area.height += item.shape.height + item.blank.height;
                    });
                    return;
                }

                node._index = index;

                node.point.y = -(node.parent.area.height - node.parent.shape.height) / 2 + node.blank.height + node.parent.point.y + node.parent.point.childOffsetY - (node.parent.children.length - 1) * 5;

                //记录偏移
                node.parent.point.childOffsetY += node.shape.height + node.blank.height;
                node.point.x = node.parent.point.offsetX + node.parent.shape.width + nodeStyle.blankLeft;
                node.point.offsetX = node.point.x;
            });
        }

        this.root.postTraverse((node) => {
            node.area.width = node.shape.width;

            if (node.isRoot()) {
                return;
            }

            if (node.isLeaf()) {
                node.parent.area.height += node.shape.height;
                node.area.height = node.shape.height;
            } else {
                node.parent.area.height += node.shape.height;
            }
        });

        while (this.layoutIsOverlap()) {
            let p = false;
            calcCoordinate.bind(this)();
            for (let i = 0, iEnd = this.allNode.length; i < iEnd; i++) {
                let node = this.allNode[i];
                for (let j = 0; j < iEnd; j++) {
                    let node1 = this.allNode[j];
                    if (i === j) {break;}

                    let data = node.overlap(node1);

                    if (data[0]) {
                        p = true;
                        let temp;
                        if (node._index > node1._index) {
                            temp = node;
                        } else {
                            temp = node1;
                        }

                        //找到通用的父节点
                        let cp = node.commonParent(node1);


                        //找到需要改变的节点
                        while (temp) {
                            if (temp.parent.data.node_id === cp.data.node_id) {
                                break;
                            }
                            temp = temp.parent;
                        }
                        //妈蛋！会出现临界值
                        temp.blank.height += Math.ceil(data[2]);

                        // temp.root.area.height+=data[2];
                        break;
                    }
                }
                if (p) {break;}
            }

        }
    }
};

register('compact', compact);
