/**
 * Created by lihua on 15/7/12.
 */

 import React, { Component } from 'react';

 import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ListView,
  WebView,
  RefreshControl,
  TouchableHighlight,
  ActionSheetIOS,
  NavigatorIOS
} from 'react-native';
import CSS from '../util/css';
import Icon from 'react-native-vector-icons/Ionicons';

var webview = React.createClass({

  render: function(){
    var showURL='http://news.sina.cn/gn/2016-06-30/detail-ifxtsatn7780092.d.html?vt=4&pos=3';
    return(
      <View style={[CSS.containerStyle]}>
      <WebView url={showURL} style={[styles.webContainer]}>

      </WebView>
      <View style={[styles.operationContainer]}>
      <View style={[styles.operationItem]}>
       <Text style={[styles.operationFont]}>  <Icon name="ios-heart" size={18} color={CSS.tint} /> 收藏</Text>
      </View>
      <View style={[styles.operationItem]}>
       <Text style={[styles.operationFont]}> <Icon name="ios-thumbs-up" size={18} color={CSS.tint} /> 点赞</Text>
      </View>
      <View style={[styles.operationItem]}>
      <Text style={[styles.operationFont]}> <Icon name="ios-share-alt" size={18} color={CSS.tint} /> 评论</Text>
      </View>
      </View>
      </View>
      );
  }

});
var styles = StyleSheet.create({
 webContainer:{
  flexDirection: "column",
  alignItems:"flex-end",
},
operationContainer:{
  borderTopWidth:CSS.pixel,
  borderTopColor:"#bbb",
  backgroundColor:"white",
  height:50,
  flexDirection: "row",
},
operationFont:{
textAlign:"center",
fontSize:14,
color:CSS.tint,
},
operationItem:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
},
});
module.exports = webview;
