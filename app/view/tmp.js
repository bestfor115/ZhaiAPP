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
  TouchableHighlight,
  ActionSheetIOS,
  NavigatorIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MenuItem  from '../component/menuItem';
import Util from '../util/util';
import Global from '../util/global';

var Swiper = require('react-native-swiper');

var defaultBanners=[
'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg',
'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg',
'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg'
];

var defaultColumns=[
{'title':'DIY','icon':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=593595799,2708285468&fm=116&gp=0.jpg'},
{'title':'下厨','icon':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=593595799,2708285468&fm=116&gp=0.jpg'},
{'title':'电影','icon':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=593595799,2708285468&fm=116&gp=0.jpg'},
{'title':'舞会','icon':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=593595799,2708285468&fm=116&gp=0.jpg'},
{'title':'逛街','icon':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=593595799,2708285468&fm=116&gp=0.jpg'},
{'title':'体验课','icon':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=593595799,2708285468&fm=116&gp=0.jpg'},
{'title':'周边游','icon':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=593595799,2708285468&fm=116&gp=0.jpg'},
{'title':'尝美食','icon':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=593595799,2708285468&fm=116&gp=0.jpg'},
{'title':'酒吧','icon':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=593595799,2708285468&fm=116&gp=0.jpg'},
{'title':'全部','icon':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=593595799,2708285468&fm=116&gp=0.jpg'}
];

var defaultRecommends=[
{'title':'每日推荐','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3923420677,4060894385&fm=116&gp=0.jpg'},
{'title':'天天特价','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3923420677,4060894385&fm=116&gp=0.jpg'},
{'title':'今日特价','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3923420677,4060894385&fm=116&gp=0.jpg'},
];

var defaultLikes=[
{'title':'','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg'},
{'title':'','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg'},
{'title':'','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg'},
{'title':'','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg'},
{'title':'','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg'},
{'title':'','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg'},
{'title':'','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg'},
{'title':'','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg'},
{'title':'','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg'},
{'title':'','icon':'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826070225,588621629&fm=116&gp=0.jpg'}
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

  render: function() {
    var collumnNum = this.props.collumnNum;
    var itemWidth = Math.floor((Util.size.width-20)/collumnNum);
    var size ={
      width: itemWidth,
      height: itemWidth*0.75,
    };

    var itemviews = [];

    for(var ii = 0;ii<this.props.columns.length;ii++){
      var topVale=ii < collumnNum?0:15;
      var topStyle={
        marginTop:topVale,
      };
      itemviews.push(
        <View style={[styles.center,size,topStyle]} key={this.props.columns[ii].title}>
        <ItemBlock column={this.props.columns[ii]} />
        </View>
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
      height: 80,
    };
    return (
      <ListView
      dataSource={theDataSource}
      renderRow={(rowData) => 
        <View style={styles.recordItem}>
        <Image style={[styles.image,sizeStyle]} source={{uri:rowData.icon}}></Image>
        </View>}/>
        );
  },
});

var NavView = React.createClass({

  render: function() {
    return (
      <View style={styles.nav}>
      <View style={styles.navLeft}>
      <Icon name="person-add" size={23} style={{color:"#1b95e0", paddingLeft:10}}></Icon>
      </View>
      <View style={styles.navMid}>
      <Icon name="social-twitter" size={27} style={{color:"#1b95e0"}}></Icon>
      </View>
      <View style={styles.navRight}>
      <Icon name="ios-search-strong" size={23} style={{color:"#1b95e0", width:30}}></Icon>
      <Icon name="compose" size={23} style={{color:"#1b95e0", width:30, paddingRight:10}}></Icon>
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
      <ScrollView style={styles.scrollContainer}>
      <BannerView banners={this.state.banners} />
      <ColumnView columns={this.state.columns} collumnNum={5} />
      <RecommendView recommends={this.state.recommends} />
      <View style={[styles.center,styles.likeHeader]} >
      <View style={[styles.headerLine]}/>
      <Icon name="ios-heart" size={24} color='red' />
      <Text>  猜你喜欢</Text>
      <View style={[styles.headerLine]}/>
      </View>
      <TestView likes={this.state.likes}/>
      </ScrollView>
      <NavView />
      </View>
      );
  },
});

var styles = StyleSheet.create({
  container: {
   width: Util.size.width,
   height:Util.size.height-29,
   position:"relative",
   backgroundColor:"#EEF0F3",
   top:-20
 },
  scrollContainer: {
   height:Util.size.height-29,
   backgroundColor:"#EEF0F3",
 },
 recordItem:{
  height: 82,
  borderBottomWidth:Util.pixel,borderBottomColor:"#bbb",
  paddingTop: 1, paddingBottom:1,
  flexDirection:"row",
  alignItems:"center"
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
image: {
  width:40,
  height:40,
  resizeMode: Image.resizeMode.contain,
},
nav:{
  flexDirection: "row",
  paddingTop: 20,
  height:64,
  top:-Util.size.height+49,
  position:"relative",
  borderBottomWidth: Util.pixel,
  borderBottomColor: "#ddd",
  alignItems:"center",
  backgroundColor:"red"
},
navLeft:{
  flex:1,
  alignItems:"flex-start",
  justifyContent:"center",
},
navMid:{
  flex:1,
  alignItems:"center",
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