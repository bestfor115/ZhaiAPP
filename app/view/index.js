/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';

 import React, { Component } from 'react';

 import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  StatusBarIOS,
  NavigatorIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var Home = require('./home');
var Message = require('./message');
var Discovery = require('./discovery');
var Me = require('./me');
var Global = require('../util/global');
var Test = require('../util/showIcon');
var Login = require('./login');


var tabs=[
{'title':'主页','icon':'ios-home-outline','selected_icon':'ios-home','key':'home','component':Home},
{'title':'消息','icon':'ios-chatboxes-outline','selected_icon':'ios-chatboxes','key':'message','component':Test},
{'title':'发现','icon':'ios-flame-outline','selected_icon':'ios-flame','key':'discovery','component':Discovery},
{'title':'我','icon':'ios-person-outline','selected_icon':'ios-person','key':'me','component':Me},
];

var index = React.createClass({
  getInitialState: function() {
    return{
      selectedTab:'home',
      lastTab:'home',
      logined:true,
      hideTab:false,
    };
  },
  componentDidMount:function(){
    StatusBarIOS.setStyle('light-content');

  },
  _selectTab: function(newTabName){
    var currentTab = this.state.selectedTab;
    if(currentTab!=newTabName){
      this.setState({
        lastTab:currentTab,
      });
    }
    this.setState({
      selectedTab:newTabName,
    });
  },
  
  _search: function () {
    this._selectTab('search');
  },

  _scan: function () {
    this._selectTab('scan');
  },

  _addNavigator: function(component, title){

    return <NavigatorIOS
    style={{flex:1}}
    barTintColor='#6bb967'
    titleTextColor="#fff"
    tintColor="#fff"
    translucent={false}
    initialRoute={{
      component: component,
      title: title,
      rightButtonTitle:"",
      passProps:{
        data: 'data'
      }
    }} />;
  },

  _renderNewTab: function (component, title) {

    var lastTab = this.state.lastTab;

    return <NavigatorIOS
    style={{flex:1}}
    barTintColor='#6bb967'
    titleTextColor="#fff"
    tintColor="#fff"
    translucent={false}
    initialRoute={
      {
        component: component,
        title: title,
        onLeftButtonPress: () => this._selectTab(lastTab),
        leftButtonTitle:"返回",
        passProps:{
          data: this.state.store_id
        }
      }} />;
    },
    _configInitialRoute:function(tab){
      if(tab.key === 'me'){
        return (
            {
            component: tab.component,
            title: 'me',
            rightButtonTitle:"",
            passProps:{
              data: 'data'
            }
          }
          );
      }else{
        return (
            {
            component: tab.component,
            title: tab.title,
            rightButtonTitle:"",
            passProps:{
              data: 'data'
            }
          }
          );
      }
    },
    _visibleTab:function(val){
          this.setState({
      hideTab:val
    });
    },
    render: function() {
      if(!this.state.logined){
        return <Login/>;
      }
      const tabItem = tabs.map((elem, index) => {
        const navigtorVisible=true;
        const navigatorItem=(
          <NavigatorIOS
          style={{flex:1}}
          barTintColor={Global.tint}
          titleTextColor="#fff"
          tintColor="#fff"
          ref="nav"
          navigationBarHidden={navigtorVisible}
          translucent={false}
          initialRoute={this._configInitialRoute(elem)} />
          );

        return (
         <Icon.TabBarItem
         key={elem.key} 
         title={elem.title}
         iconName={elem.icon}
         selectedIconName={elem.selected_icon}
         selected={this.state.selectedTab ===elem.key}
         onPress={this._selectTab.bind(this,elem.key)}
         >
         <elem.component vivibleTab={this._visibleTab} navigator={this.props.navigator}/>
         </Icon.TabBarItem>
         );
      });

      return (
       <TabBarIOS  tintColor={Global.tint}
       ref='tabbar'  
       style={[styles.base, this.state.hideTab && styles.hide]}
       barTintColor="white">
       {tabItem}
       </TabBarIOS>
       );
    }
  });

var styles = StyleSheet.create({
  hide:{
    opacity:1,
  },
});
module.exports = index;

