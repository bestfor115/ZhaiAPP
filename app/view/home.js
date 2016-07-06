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
  ListView,
  LinkingIOS,
  TouchableOpacity,
  TouchableHighlight,
  ActionSheetIOS,
  NavigatorIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MenuItem  from '../component/menuItem';
import Util from '../util/util';
import Global from '../util/global';
import LinearGradient from 'react-native-linear-gradient';

import ColumnList from './columnList';

var Swiper = require('react-native-swiper');

var defaultBanners=[
'http://192.168.3.100:3000/icon/banner_01.jpg',
'http://192.168.3.100:3000/icon/banner_02.jpg',
'http://192.168.3.100:3000/icon/banner_03.jpg'
];

var defaultColumns=[
{'title':'DIY','icon':'http://192.168.3.100:3000/icon/column_01.jpg'},
{'title':'下厨','icon':'http://192.168.3.100:3000/icon/column_02.jpg'},
{'title':'电影','icon':'http://192.168.3.100:3000/icon/column_03.jpg'},
{'title':'舞会','icon':'http://192.168.3.100:3000/icon/column_04.jpg'},
{'title':'逛街','icon':'http://192.168.3.100:3000/icon/column_05.jpg'},
{'title':'体验课','icon':'http://192.168.3.100:3000/icon/column_06.jpg'},
{'title':'周边游','icon':'http://192.168.3.100:3000/icon/column_07.jpg'},
{'title':'尝美食','icon':'http://192.168.3.100:3000/icon/column_08.jpg'},
{'title':'酒吧','icon':'http://192.168.3.100:3000/icon/column_09.jpg'},
{'title':'全部','icon':'http://192.168.3.100:3000/icon/column_03.jpg'}
];

var defaultRecommends=[
{'title':'每日推荐','icon':'http://192.168.3.100:3000/icon/recommend_01.png'},
{'title':'天天特价','icon':'http://192.168.3.100:3000/icon/recommend_02.png'},
{'title':'今日特价','icon':'http://192.168.3.100:3000/icon/recommend_03.png'},
];

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

var BannerView = React.createClass({

  render: function() {
    return (
      <Swiper style={styles.wrapper} autoplay={true} height={125}
      showsButtons={false}
      dot={<View style={{backgroundColor: 'rgba(255,255,255,0.2)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
      activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.5)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>  

      {this.props.banners.map(function(banner){
        return (
          <TouchableHighlight key={banner}>
          <Image style={[styles.slide,]} source={{uri: banner}}></Image>
          </TouchableHighlight>
          );
      })}
      </Swiper>
      );
  },
});



//每个单项组件
var ItemBlock = React.createClass({
  render: function() {
    var item = this.props.column;
    return (
      <View style={[styles.itemBlock]}>
      <Image style={[styles.image]} source={{uri: item.icon}}></Image>
      <Text style={[styles.font18]}>{item.title}</Text>
      </View>
      );
  }
});

var ColumnView = React.createClass({
  _jumpColumnList:function(type){
    this.props.navigator.push({id:"columnList",display:true,title:type,component:ColumnList});
  },
  render: function() {
    var collumnNum = this.props.collumnNum;
    var itemWidth = Math.floor((Util.size.width-20)/collumnNum);
    var size ={
      width: itemWidth,
      height: itemWidth*0.75,
    };

    var itemviews = [];

    for(var ii = 0;ii<this.props.columns.length;ii++){
      const item =this.props.columns[ii];
      var topVale=ii < collumnNum?0:15;
      var topStyle={
        marginTop:topVale,
      };
      itemviews.push(
        <TouchableOpacity ref="column" style={[styles.center,size,topStyle]} key={this.props.columns[ii].title} onPress={() => this._jumpColumnList(item.title)}>
        <View style={[styles.itemBlock]}>
        <Image style={[styles.image]} source={{uri: this.props.columns[ii].icon}}></Image>
        <Text style={[styles.font18]}>{this.props.columns[ii].title}</Text>
        </View>
        </TouchableOpacity>
        );
    }

    return(
        <View style={styles.columnContainer}>
        {itemviews}
        </View>
        );
    }
  });

    var RecommendView = React.createClass({

      render: function() {
        var itemWidth = Math.floor((Util.size.width-20)/3);
        var size ={
          width: itemWidth,
          height: itemWidth*0.95,
        };

        var itemviews = [];

        for(var ii = 0;ii<this.props.recommends.length;ii++){
          itemviews.push(
            <View style={[styles.center,size]} key={this.props.recommends[ii].title}>
            <Image style={[styles.image,size]} source={{uri: this.props.recommends[ii].icon}}></Image>
            </View>
            );
        }

        return(
          <View style={styles.recommendContainer}>
          {itemviews}
          </View>
          );
      }
    });

    var TestView = React.createClass({

      render: function() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var data=this.props.likes;
        var theDataSource = ds.cloneWithRows(data);
        var sizeStyle ={
          width: Util.size.width,
          height: 120,
        };
        return (
          <ListView
          dataSource={theDataSource}
          renderRow={(rowData) => 
            <View style={styles.recordItem}>
            <Image style={[styles.likeImage,sizeStyle]} source={{uri:rowData.icon}}>
            <View style={{flex:1}}/>
            <LinearGradient colors={['#00000000', '#44444444', '#88888888']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
            Sign in with Facebook
            </Text>
            </LinearGradient>
            </Image>
            </View>}/>
            );
      },
    });

    var NavView = React.createClass({

      render: function() {
        return (
          <View style={styles.nav}>
          <View style={styles.navLeft}>
          <Text style={styles.fontLocation}>深圳 <Icon name="ios-arrow-down" size={18} color='white'> </Icon></Text>
          </View>
          <Text style={[styles.fontHotword,styles.navMid]}><Icon name="ios-search" size={18} color={Global.tint}> </Icon>输入关键词</Text>
          <View style={styles.navRight}>
          <Icon name="ios-menu" size={23} color='white' style={{paddingRight:10}}></Icon>
          </View>
          </View>
          );
      },
    });

    var Home = React.createClass({
      getInitialState: function() {
        var width = Math.floor(Util.size.width/3);
        return {
          loaded:false,
          banners:defaultBanners,
          columns:defaultColumns,
          recommends:defaultRecommends,
          likes:defaultLikes
        };
      },
      render: function() {
        return (
          <View style={styles.container}>
          <NavView/>
          <ScrollView style={styles.scrollContainer} contentOffset={{y:20}} contentInset={{top:-20}}>
          <BannerView banners={this.state.banners} />
          <ColumnView columns={this.state.columns} collumnNum={5} navigator={this.props.navigator}/>
          <RecommendView recommends={this.state.recommends} />
          <View style={[styles.center,styles.likeHeader]} >
          <View style={[styles.headerLine]}/>
          <Icon name="ios-heart" size={24} color='red' />
          <Text>  猜你喜欢</Text>
          <View style={[styles.headerLine]}/>
          </View>
          <TestView likes={this.state.likes}/>
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
   headerLine: {
     flex: 1,
     height:Util.pixel,
     backgroundColor:"gray",
   },
   wrapper: {
    backgroundColor:"red",
    height:125,
  },
  slide: {
    height:125,
    resizeMode: Image.resizeMode.stretch,
  },
  columnContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:"white",
    padding:10,
  },
  recommendContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:"white",
    padding:10,
    marginTop:15
  },
  center:{
    justifyContent:'center',
    alignItems:'center',
  },
  itemBlock:{
    borderRadius:5,
  },
  font18:{
    fontSize:10,
    color:'#333333',
    marginTop:5,
    textAlign:'center'
  },
  fontLocation:{
    fontSize:14,
    color:'white',
    paddingLeft:10,
    textAlign:'center'
  },
  fontHotword:{
    fontSize:11,
    color:'gray',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:3,
    paddingBottom:3,
    borderRadius:15,
    backgroundColor:"white",
    textAlign:'left'
  },
  image: {
    width:40,
    height:40,
    resizeMode: Image.resizeMode.contain,
  },
  likeImage: {
    flexDirection:"column",
    alignItems:"flex-end",
    resizeMode: Image.resizeMode.cover,
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
  navLeft:{
    flex:1,
    alignItems:"flex-start",
    justifyContent:"center",
  },
  navMid:{
    flex:4,
    alignItems:"center",
    justifyContent:"center",
  },
  navRight:{
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection:"row"
  },
  linearGradient: {
    height:30,
    width: Util.size.width,
    paddingLeft: 15,
    paddingRight: 15,
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
});

    module.exports = Home;