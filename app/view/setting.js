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
  LinkingIOS,
  TouchableHighlight,
} from 'react-native';

import MenuItem  from '../component/menuItem';
import Util from '../util/util';
import Icon from 'react-native-vector-icons/Ionicons';
import CSS from '../util/css';

var Home = React.createClass({
  render: function() {
    return (
      <ScrollView style={[CSS.containerStyle]} >

      <MenuItem
      title='帐号绑定'
      topSpace='large'
      />
      <MenuItem
      title='清除图片缓存'
      />

      <MenuItem
      title='评价宅家'
      topSpace='large'
      />
      <MenuItem
      title='关于宅家'
      />


      <TouchableHighlight onPress={this._performClick} style={{marginTop:10}} underlayColor="#dad9d7" >
      <View style={[styles.itemContainer]}>
      <Text  style={[styles.itemFont]}>退出登录</Text>
      </View>
      </TouchableHighlight>
      </ScrollView>
      );
  },
});

var styles = StyleSheet.create({
  itemContainer: {
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'#ffffff',
    height:44,
    marginBottom:1,
    paddingLeft:20,
    paddingRight:20,
  },
  itemFont:{
    flex:1,
    color:'red',
    textAlign:"center"
  },
  leftIcon:{
    width:20,
    height:20,
    marginRight:15,
  }
});
module.exports = Home;