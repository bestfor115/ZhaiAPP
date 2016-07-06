'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native';

import Icon , { glyphMap } from 'react-native-vector-icons/Ionicons';

import Util from './util';

import Global from './global';


module.exports= React.createClass({

  render: function() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var data=[];
    for(var o in glyphMap){  
      data.push(o);
    }  
    var theDataSource = ds.cloneWithRows(data);
    return (
      <ListView
      style={styles.recordList}
      dataSource={theDataSource}
      renderRow={(rowData) => 
        <View style={styles.recordItem}>
        <Text style={styles.recordItemTitle}>{rowData}</Text>
        <View style={{alignItems: "center"}}>
        <Icon style={styles.recordItemTime} name={rowData} size={24} color={Global.tint} ></Icon>
        </View>
        </View>}/>
      );
  },
});

    const styles = StyleSheet.create({
      recordList:{
        width: Util.size.width,
        height: Util.size.height - 350,
        paddingLeft: 15,
        marginTop:64,
      },
      recordItem:{
        height: 40,
        borderBottomWidth:Util.pixel,borderBottomColor:"#bbb",
        paddingTop: 5, paddingLeft: 10, paddingRight:10, paddingBottom:5,
        flexDirection:"row",
        alignItems:"center"
      },
      recordItemTitle:{
        backgroundColor:"transparent",
        flex:1,
        textAlign:"left",
        paddingLeft:20,
        color:"#777"
      },
      recordItemTime:{
        backgroundColor:"transparent",
        flex:1,
        textAlign:"right",
        paddingRight:20,
      },
    });