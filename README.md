##Installation
1.Install library from npm

`npm install react-native-mind --save`

2.Link native code

`react-native link react-native-mind`

`react-native link react-native-svg`

or use `rnpm` instead:

`rnpm link react-native-mind`

`rnpm link react-native-svg`

##preview
![image](./demo.png)
##Usage
```javascript
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules
} from 'react-native';

import {Minder,emitter,command} from 'react-native-mind'

const Dimensions = require('Dimensions');
const TOTALWIDTH = Dimensions.get('window').width;
const TOTALHEIGHT = Dimensions.get('window').height;


let dataList = [{
  "root": {
    "data": {
      "node_id": "522bbeef44ec",
      "title": "根节点",
      "content_type": "content.builtin.title",
      "content":""
    },
    "children": [{
      "data": {
        "node_id": "b7f3m1o36u0c",
        "title": "二级节点1",
        "content_type": "content.builtin.title"
      },
    "children": [{
        "data": {
          "node_id": "b7f323vlqyp4o",
          "title": "三级节点1",
          "content_type": "content.builtin.title",
          "content":""
        }
      }, {
        "data": {
          "node_id": "b7f3m1l3qy24o",
          "title": "三级节点2",
          "content_type": "content.builtin.title",
          "content":""
        },
      }, {
        "data": {
          "node_id": "b7f3m4vl33p4o",
          "title": "三级节点3",
          "content_type": "content.builtin.title",
          "content":""
        }
      }]      
    }, {
      "data": {
        "node_id": "b7f3m1o16u2c",
        "title": "二级211111",
        "content_type": "content.builtin.title",
        "content":""
      },
      "children": [{
        "data": {
          "node_id": "b7f33vlqyp4o",
          "title": "三级节点4",
          "content_type": "content.builtin.title",
          "content":""
        }
      }, {
        "data": {
          "node_id": "b7f3m1lqy24o",
          "title": "三级节点5",
          "content_type": "content.builtin.title",
          "content":""
        },
      }, {
        "data": {
          "node_id": "b7f3mvl33p4o",
          "title": "三级节点6",
          "content_type": "content.builtin.title",
          "content":""
        }
      },{
        "data": {
          "node_id": "b7f3mvl323p4o",
          "title": "三级节点7",
          "content_type": "content.builtin.title",
          "content":""
        }
      }]
    }, {
      "data": {
        "node_id": "b7f3m1o26usc",
        "title": "二级3",
        "content_type": "content.builtin.title",
        "content":""
      }
    }, {
      "data": {
        "node_id": "b7f3m1o26u2c",
        "title": "二级4",
        "content_type": "content.builtin.title",
        "content":""
      }
    }]
  }
}];

export default class reactNativeMindExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Minder dataList={dataList} height={TOTALHEIGHT-40} width={TOTALWIDTH}></Minder>
      </View>
    );
  }
}
```

