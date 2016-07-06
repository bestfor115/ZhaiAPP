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

var NavView = React.createClass({

  render: function() {
    return (
      <View style={styles.nav}>
      <View  style={styles.navLeft} />
      <Text style={styles.navMid} >发现</Text>
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
      <ScrollView style={styles.scrollContainer} contentOffset={{y:20}} contentInset={{top:-20}}>
      <MenuItem
      title='宅友圈'
      topSpace='large'
      leftIcon={require("../icon/ic_broadcast.png")} 
      />
      <MenuItem
      title='扫一扫'
      topSpace='large'
      leftIcon={require("../icon/ic_sys.png")} 
      />
      <MenuItem
      title='摇一摇'
      leftIcon={require("../icon/ic_yyy.png")} 
      />
      <MenuItem
      title='附近的人'
      topSpace='large'
      leftIcon={require("../icon/ic_location.png")} 
      />
      <MenuItem
      title='漂流瓶'
      leftIcon={require("../icon/ic_plp.png")} 
      />

      </ScrollView>
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
  fontSize:18,
  color:'white',
  textAlign:'center'
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
});

module.exports = Home;