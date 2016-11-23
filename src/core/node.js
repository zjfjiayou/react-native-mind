import Point from './point';
import Box from './box';
import nodeStyle from '../style/node.style';

class Node {
    constructor(data) {

        // 指针
        this.parent = null;
        this.root = this;
        this.children = [];
        this._chenged = true;
        this.point = new Point(0, 0, 0, 0, 0);
        this.titleBox = new Box(0, 0);
        this.contentBox = new Box(0, 0);
        this.area = new Box(0, 0);
        this.blank = new Box(0, 0);

        // 数据
        this.data = data;
    }

    init() {
        this.point = new Point(0, 0, 0, 0, 0);
        this.titleBox = new Box(0, 0);
        this.contentBox = new Box(0, 0);
        this.area = new Box(0, 0);
        this.blank = new Box(0, 0);
    }

    //将节点平移到第四象限
    translationY(node) {
        let p1, p2, p3, p4;

        p1 = [this.coordinate.x1, this.coordinate.y1];
        p2 = [this.coordinate.x3, this.coordinate.y3];
        p3 = [node.coordinate.x1, node.coordinate.y1];
        p4 = [node.coordinate.x3, node.coordinate.y3];

        let increment;
        increment = Math.max(Math.abs(p1[1]), Math.abs(p3[1]));

        return [
            [p1[0], p1[1] + increment],
            [p2[0], p2[1] + increment],
            [p3[0], p3[1] + increment],
            [p4[0], p4[1] + increment]
        ];

    }

    //判断节点的子节点是否覆盖,算法参考http://www.cnblogs.com/avril/archive/2013/04/01/2993875.html
    overlap(node) {
        let points, m, n;

        //节点收起就不会重合
        if (node.data.expand === false || this.data.expand === false) {
            return [false, 0, 0];
        }

        points = this.translationY(node);

        m = [Math.max(points[0][0], points[2][0]), Math.max(points[0][1], points[2][1])];
        n = [Math.min(points[1][0], points[3][0]), Math.min(points[1][1], points[3][1])];


        if ((m[0] < n[0]) && (m[1] < n[1])) {
            return [true, Math.abs(n[0] - m[0]), n[1] - m[1]];
        } else {
            return [false, 0, 0];
        }
    }

    //获取第一个子节点
    get firstChild() {
        for (let i, iEnd = this.children.length; i < iEnd; i++) {
            if (this.children[i].isFirst()) {
                return this.children[i];
            }
        }
    }

    //共同的父节点
    commonParent(node) {
        let p1 = node;
        while (p1) {
            let p2 = this;
            while (p2) {
                if (p2.data.node_id === p1.data.node_id) {
                    return p2;
                }
                p2 = p2.parent;
            }
            p1 = p1.parent;
        }
    }

    //获取最后一个子节点
    get lastChild() {
        for (let i, iEnd = this.children.length; i < iEnd; i++) {
            if (this.children[i].isLast()) {
                return this.children[i];
            }
        }
    }

    get coordinate() {
        let x1, x2, x3, x4, y1, y2, y3, y4;
        x4 = x1 = this.point.x - 25;
        x3 = x2 = this.point.x + this.shape.width;
        y2 = y1 = this.point.y;
        y4 = y3 = this.point.y + this.shape.height + 10;

        return { x1, x2, x3, x4, y1, y2, y3, y4 };
    }

    getData(key) {
        return key ? this.data[key] : this.data;
    }

    setData(key, value) {
        if (Object.prototype.toString.call(key) === '[object Object]') {
            let data = key;
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    this.data[key] = data[key];
                }
            }
        } else {
            this.data[key] = value;
        }
        return this;
    }

    getChildren() {
        return this.children;
    }

    get level() {
        let level = 0,
            ancestor = this.parent;
        while (ancestor) {
            level++;
            ancestor = ancestor.parent;
        }
        return level;
    }

    get serializeContent() {
        if (Object.prototype.toString.call(this.data.content) === '[object String]') {
            return JSON.parse(this.data.content);
        }
        return this.data.content;
    }

    get style() {
        let style;
        switch (this.data.content_type) {
            case 'content.builtin.image':
                style = nodeStyle.image;
                break;
            case 'content.builtin.attachment':
                style = nodeStyle.file;
                break;
            case 'content.builtin.text':
                style = nodeStyle.content;
                break;
            default:
                style = nodeStyle.title;
                break;
        }
        return style;
    }

    get shape() {
        let box = new Box(0, 0);
        box.width = Math.max(this.titleBox.width, this.contentBox.width);
        box.height = this.titleBox.height + this.contentBox.height;
        return box;
    }


    isRoot() {
        return this.root === this;
    }

    /**
     * 判断节点是否叶子
     */
    isLeaf() {
        return this.children.length === 0;
    }

    /**
     * 判断节点是初始
     */
    isFirst() {
        return this.index === 0;
    }

    /**
     * 判断节点是最后一个节点
     */
    isLast() {
        return this.index === this.parent.children.length;
    }

    /**
     * 先序遍历当前节点树
     * @param  {Function} fn 遍历函数
     */
    preTraverse(fn, excludeThis) {
        let children = this.getChildren();
        if (!excludeThis) {
            fn(this);
        }
        for (let i = 0; i < children.length; i++) {
            children[i].preTraverse(fn);
        }
    }

    /**
     * 后序遍历当前节点树
     * @param  {Function} fn 遍历函数
     */
    postTraverse(fn, excludeThis) {
        let children = this.getChildren();
        for (let i = 0; i < children.length; i++) {
            children[i].postTraverse(fn);
        }
        if (!excludeThis) {
            fn(this);
        }
    }

    traverse(fn, excludeThis) {
        return this.preTraverse(fn, excludeThis);
    }

    get prev() {

        if (this.index === 0 || this.isRoot()) {
            return null;
        }

        for (let i = 0, iEnd = this.parent.children.length; i < iEnd; i++) {

            if ((this.parent.children[i].index - 1) === this.index) {
                return this.parent.children[i];
            }
        }

    }

    insertChild(node, index) {
        if (index === undefined) {
            index = this.children.length;
        }
        node.parent = this;
        node.root = this.root;
        node.index = index;

        this.children.splice(index, 0, node);
    }
}

module.exports = Node;
