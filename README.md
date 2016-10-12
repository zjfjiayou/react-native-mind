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

import Minder from 'react-native-mind'

const Dimensions = require('Dimensions');
const TOTALWIDTH = Dimensions.get('window').width;
const TOTALHEIGHT = Dimensions.get('window').height;

const dataList = [{
  "root": {
    "data": {
      "id": "522bbeef44ec",
      "created": 1460421842,
      "text": "脑图构建流程",
      "type": 0
    },
    "children": [{
      "data": {
        "id": "b7f3m1o36u0c",
        "created": 1474965441670,
        "text": "二级节点",
        "type": 3,
        "content":'i love you so much,那么爱你为什么？'
      }
    }, {
      "data": {
        "id": "b7f3m1o16u2c",
        "created": 1474965441670,
        "text": "我是很长的节点",
        "type": 0
      },
      "children": [{
        "data": {
          "id": "b7f33vlqyp4o",
          "created": 1474965506832,
          "text": "三级节点4",
          "type": 0
        }
      }, {
        "data": {
          "id": "b7f3m1lqy24o",
          "created": 1474965506832,
          "text": "三级节点5",
          "type": 0
        }
      }, {
        "data": {
          "id": "b7f3mvl33p4o",
          "created": 1474965506832,
          "text": "三级节点6",
          "type": 0
        }
      }]
    }, {
      "data": {
        "id": "b7f3m1o26usc",
        "created": 1474965441670,
        "text": "二级节点222",
        "type": 2,
        "expand":true,
        "content":[{suffix:'text',name:'德玛西亚万岁.jpge'}]
      }
    }, {
      "data": {
        "id": "b7f3m1o26u2c",
        "created": 1474965441670,
        "text": "二级节点222驱蚊器问2",
        "type": 0
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

