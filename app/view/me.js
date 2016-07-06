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
var Test = require('../util/showIcon');
var Login = require('./login');
var Register = require('./register');
var Setting = require('./setting');


var NavView = React.createClass({

  render: function() {
    return (
      <View style={styles.nav}>
      <View  style={styles.navLeft} />
      <Text style={styles.navMid} >个人中心</Text>
      <View  style={styles.navRight} />
      </View>
      );
  },
});


var Home = React.createClass({
  jumpSetting:function(){
    this.props.navigator.push({id:"setting",title:"设置",component:Setting});
  },
  jumpLogin:function(){
    this.props.navigator.push({id:"login",display:false,title:"登录",component:Login});
  },
  _renderProfile: function() {
    if(Global.logined){
      return (
        <TouchableHighlight style={{marginTop:10}}  >
        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#ffffff',height:80,paddingLeft:20,paddingRight:20}}>

        <Image style={[styles.image]} source={{uri:Global.user.avatar}}></Image>

        <View style={{flex:1,marginLeft:10}}>
        <Text  style={{color:'#333333'}}>{Global.user.nick}</Text>
        <Text  style={{color:'#333333',marginTop:5}}>{Global.user.phone}</Text>
        </View>
        <Icon name="ios-arrow-forward" size={24} color={Global.tint} />
        </View>
        </TouchableHighlight>
        );
    }else{
      return (
        <TouchableHighlight style={{marginTop:10}}  onPress={this.jumpLogin}>
        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#ffffff',height:80,paddingLeft:20,paddingRight:20}}>
        <Image style={[styles.image]} source={require("../icon/ic_portrait.png")}/>
        <View style={{flex:1,marginLeft:10}}>
        <Text  style={{color:'#333333'}}>未登录</Text>
        <Text  style={{color:'#333333',marginTop:5}}>登录以后更多功能</Text>
        </View>
        </View>
        </TouchableHighlight>
        );
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
      <NavView/>
      <ScrollView style={styles.scrollContainer} contentOffset={{y:20}} contentInset={{top:-20}}>
      {this._renderProfile()}
      <MenuItem
      title='联系人'
      topSpace='large'
      leftIcon={require("../icon/ic_contact.png")} 
      />
      <MenuItem
      title='兴趣群'
      leftIcon={require("../icon/ic_group.png")} 
      />

      <MenuItem
      title='足迹'
      topSpace='large'
      leftIcon={require("../icon/ic_footprint.png")} 
      />
      <MenuItem
      title='收藏'
      leftIcon={require("../icon/ic_favorite.png")} 
      />

      <MenuItem
      title='小屋'
      topSpace='large'
      leftIcon={require("../icon/ic_house.png")} 
      />
      <MenuItem
      title='积分商城'
      leftIcon={require("../icon/ic_store.png")} 
      />

      <MenuItem
      title='设置'
      onClick={this.jumpSetting}
      topSpace='large'
      leftIcon={require("../icon/ic_setting.png")} 
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
image: {
  width:70,
  height:70,
  borderRadius:3,
  resizeMode: Image.resizeMode.contain,
},
});

module.exports = Home;