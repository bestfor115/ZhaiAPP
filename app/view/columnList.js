 'use strict';

 import React, { Component } from 'react';

 import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ListView,
  LinkingIOS,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
  ActionSheetIOS,
  NavigatorIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MenuItem  from '../component/menuItem';
import Util from '../util/util';
import Global from '../util/global';
import LinearGradient from 'react-native-linear-gradient';
import CSS from '../util/css';
import Article from './article';

var defaultLikes=[
{'title':'','icon':'http://192.168.3.100:3000/icon/like_01.jpg'},
{'title':'','icon':'http://192.168.3.100:3000/icon/like_02.jpg'},
{'title':'','icon':'http://192.168.3.100:3000/icon/like_03.jpg'},
{'title':'','icon':'http://192.168.3.100:3000/icon/like_04.jpg'},
{'title':'','icon':'http://192.168.3.100:3000/icon/like_05.jpg'},
{'title':'','icon':'http://192.168.3.100:3000/icon/like_06.jpg'},
{'title':'','icon':'http://192.168.3.100:3000/icon/like_07.jpg'},
{'title':'','icon':'http://192.168.3.100:3000/icon/like_08.jpg'},
{'title':'','icon':'http://192.168.3.100:3000/icon/like_09.jpg'},
{'title':'','icon':'http://192.168.3.100:3000/icon/like_10.jpg'}
];

module.exports = React.createClass({
  getInitialState: function() {
    return {
      datas:defaultLikes,
      isRefreshing:false,
    };
  },
  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 1000);
  },
  _jumpArticle:function(column){
    this.props.navigator.push({id:"article",display:true,title:"攻略详情",component:Article});
  },
  render: function() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var data=this.state.datas;
    var theDataSource = ds.cloneWithRows(data);
    var sizeStyle ={
      width: Util.size.width,
      height: 120,
    };
    return (
      <ListView style={[CSS.containerStyle]}
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={()=>this._onRefresh()}
            tintColor="#ddd"/>
        }
      dataSource={theDataSource}
      renderRow={(rowData) => 
        <TouchableOpacity onPress={() => this._jumpArticle(rowData)} >
        <View style={styles.recordItem}>
        <Image style={[styles.likeImage,sizeStyle]} source={{uri:rowData.icon}}>
        <View style={{flex:1}}/>
        <LinearGradient colors={['#00000000', '#44444444', '#88888888']} style={styles.linearGradient}>
        <Text style={styles.buttonText}>
        Sign in with Facebook
        </Text>
        </LinearGradient>
        </Image>
        </View>
        </TouchableOpacity>
        }/>
        );
  },
});
var styles = StyleSheet.create({
 recordItem:{
  height: 120,
  borderBottomWidth:Util.pixel,borderBottomColor:"#bbb",
  paddingTop: 1, paddingBottom:1,
},
likeHeader: {
 width: Util.size.width,
 height:40,
 flexDirection:'row',
 paddingLeft:30,
 paddingRight:30,
},
likeNum:{
  height:30,
  width: Util.size.width,
},
buttonText: {
  fontSize: 18,
  fontFamily: 'Gill Sans',
  textAlign: 'left',
  margin: 10,
  color: '#ffffff',
  backgroundColor: 'transparent',
},
likeImage: {
  flexDirection:"column",
  alignItems:"flex-end",
  resizeMode: Image.resizeMode.cover,
},
});