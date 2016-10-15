import utils from './utils'
import Point from './point'
import Box from './box'

import nodeStyle from '../style/node.style'


class Node {
    constructor(data) {

        // 指针
        this.parent = null;
        this.root = this;
        this.children = [];
        this.point = new Point(0, 0, 0, 0);
        this.titleBox = new Box(0, 0);
        this.contentBox = new Box(0, 0);
        this.area = new Box(0, 0);

        // 数据
        // this.data = {
        //     id: utils.guid(),
        //     created: +new Date()
        // };
        this.data=data;

    }

    getData(key) {
        return key ? this.data[key] : this.data;
    }

    setData(key, value) {
        if (typeof key == 'object') {
            var data = key;
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
        var level = 0,
            ancestor = this.parent;
        while (ancestor) {
            level++;
            ancestor = ancestor.parent;
        }
        return level;
    }

    get serializeContent(){
        return JSON.parse(this.data.content);
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
        var children = this.getChildren();
        if (!excludeThis) fn(this);
        for (var i = 0; i < children.length; i++) {
            children[i].preTraverse(fn);
        }
    }

    /**
     * 后序遍历当前节点树
     * @param  {Function} fn 遍历函数
     */
    postTraverse(fn, excludeThis) {
        var children = this.getChildren();
        for (var i = 0; i < children.length; i++) {
            children[i].postTraverse(fn);
        }
        if (!excludeThis) fn(this);
    }

    traverse(fn, excludeThis) {
        return this.preTraverse(fn, excludeThis);
    }

    insertChild(node, index) {
        if (index === undefined) {
            index = this.children.length;
        }
        // if (node.parent) {
        //     node.parent.removeChild(node);
        // }
        node.parent = this;
        node.root = this.root;
        node.index = index;

        this.children.splice(index, 0, node);
    }
}

module.exports = Node;
