/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-18 14:41:19
 * @version $Id$
 */
 'use strict';

 import React, { Component } from 'react';

 import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ListView,
  Image,
  SegmentedControlIOS,
  LinkingIOS,
  TouchableHighlight,
  ActionSheetIOS,
  NavigatorIOS
} from 'react-native';

import MenuItem  from '../component/menuItem';
import Util from '../util/util';
import Global from '../util/global';
import Icon from 'react-native-vector-icons/Ionicons';

var defaultMessage=[
{'id':'1','name':'张三','avatar':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1033649457,1987438146&fm=116&gp=0.jpg','content':'this is just for test','time':'12:30'},
{'id':'2','name':'张三','avatar':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1033649457,1987438146&fm=116&gp=0.jpg','content':'this is just for test','time':'12:30'},
{'id':'3','name':'张三','avatar':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1033649457,1987438146&fm=116&gp=0.jpg','content':'this is just for test','time':'12:30'},
{'id':'4','name':'张三','avatar':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1033649457,1987438146&fm=116&gp=0.jpg','content':'this is just for test','time':'12:30'},
{'id':'5','name':'张三','avatar':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1033649457,1987438146&fm=116&gp=0.jpg','content':'this is just for test','time':'12:30'},
{'id':'6','name':'张三','avatar':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1033649457,1987438146&fm=116&gp=0.jpg','content':'this is just for test','time':'12:30'},

];

var MessageList= React.createClass({

  _renderRow: function(rowData: object, sectionID: number, rowID: number) {

    return (
      <View style={styles.itemContainer}>
            <Image style={[styles.itemLeft]} source={{uri:rowData.avatar}}></Image>

     <View style={styles.itemMid}>
      <Text>{rowData.name}</Text>
      <Text>{rowData.content}</Text>
      </View>
      <View style={styles.itemRight}>
      <Text >{rowData.time}</Text>
      </View>
      </View>
      );
  },
  render: function() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var theDataSource = ds.cloneWithRows(defaultMessage);
    return (
      <ListView
      style={styles.recordList}
      dataSource={theDataSource}
      renderRow={this._renderRow}/>
      );
  },
});


var NavView = React.createClass({

  render: function() {
    return (
      <View style={styles.nav}>
      <View  style={styles.navLeft} />
      <SegmentedControlIOS style={styles.navMid} selectedIndex={0} values={['会话', '消息']} momentary={true} tintColor='white'/>
      <View  style={styles.navRight} />
      </View>
      );
  },
});

var Home = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
      <NavView/>
      <MessageList style={styles.scrollContainer} contentOffset={{y:20}} contentInset={{top:-20}} />
      </View>
      );
  },
});

var styles = StyleSheet.create({
  container: {
   width: Util.size.width,
   height:Util.size.height,
   backgroundColor:"#EEF0F3",
 },
 scrollContainer: {
   height:Util.size.height-64-49,
   backgroundColor:"#EEF0F3",
 },
 nav:{
  flexDirection: "row",
  paddingTop: 20,
  height:64,
  borderBottomWidth: Util.pixel,
  borderBottomColor: "#ddd",
  alignItems:"center",
  backgroundColor:Global.tint
},
navMid:{
  flex:3,
  alignItems:"center",
  justifyContent:"center",
},
navLeft:{
  flex:1,
  alignItems:"flex-start",
  justifyContent:"center",
},
navRight:{
  flex:1,
  justifyContent:"flex-end",
  alignItems:"center",
  flexDirection:"row"
},
itemContainer:{
  height: 70,
  borderBottomWidth:Util.pixel,borderBottomColor:"#bbb",
  paddingTop: 5, paddingLeft: 10, paddingRight:10, paddingBottom:5,
  flexDirection:"row",
  backgroundColor:'white',
  justifyContent:"center"
},
recordList:{
  width: Util.size.width,
  height: Util.size.height - 350,
},
itemLeft:{
 width: 40,
 height:40,
},
itemMid:{
 flex:1,
 width: 40,
 marginLeft:10,
 height:40,
justifyContent:"center"
},
itemRight:{
 width: 40,
 height:40,
},
});

module.exports = Home;