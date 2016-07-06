'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Global from '../util/global';

module.exports= React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    topSpace:React.PropTypes.oneOf(['normal', 'large']),
    indicator: React.PropTypes.string,
    leftIcon: Image.propTypes.source,
  },
  getDefaultProps : function () { 
    return {
      topSpace : 'normal',
      indicator : 'detail',
    };
  },
  _performClick:function(){
    var onClick = this.props.onClick;
    if(onClick){
      onClick();
    }
  },

  render: function() {
    var margin2Top =this.props.topSpace=='large'?10:0;
    var rightIconView=this.props.indicator?<Icon name="ios-arrow-forward" size={24} color={Global.tint} />:<View/>;
    var leftIconView=this.props.leftIcon?<Image style={[styles.leftIcon]} source={this.props.leftIcon}/>:<View/>;
    return (
      <TouchableOpacity onPress={this._performClick} style={{marginTop:margin2Top}} underlayColor="#dad9d7" >
      <View style={[styles.itemContainer]}>
      {leftIconView}
      <Text  style={[styles.itemFont]}>{this.props.title}</Text>
      {rightIconView}
      </View>
      </TouchableOpacity>
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
    color:'#333333',
    textAlign:"left"
  },
  leftIcon:{
    width:20,
    height:20,
    marginRight:15,
  }
});