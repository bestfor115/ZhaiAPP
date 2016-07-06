/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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
  TextInput,
  LinkingIOS,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ActionSheetIOS,
  NavigatorIOS
} from 'react-native';

import TimerMixin  from 'react-timer-mixin';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../util/util';
import Register from './register';
var Test = require('../util/showIcon');
import Global from '../util/global';

var ThiadLogin = React.createClass({

  render: function() {
    return (
      <View style={[styles.center,styles.loginType]}>
      <Text style={[styles.loginName]}>{this.props.loginName}</Text>
      <Image style={[styles.loginIcon]} source={this.props.loginIcon}/>
      </View>
      );
  },
});

var login = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      phone: "",
      code: "",
      pwd: "",
      secondsElapsed: 0,
    };
  },

  componentDidMount: function() {

  },

  tick: function() {
    var secondsElapsed = this.state.secondsElapsed-1;
    if(secondsElapsed==0){
      this.setState({secondsElapsed: 0});
      return;
    }
    this.setTimeout(
      () => {
        this.setState({secondsElapsed: secondsElapsed});
        this.tick();
      },
      500
      );
  },

  getCode: function() {
    var phone = this.state.phone;
    if(!this.checkPhone(phone)){
      alert("请输入正确的手机号码");
      return;
    }
    var thiz = this;
    Util.post(API.getSmsCode(),{'tel':phone,'type':'verifiycode'},function (ret){
      if(ret.code==0){
        thiz.setState({secondsElapsed: 60});
        thiz.tick();
      }
      Util.log(ret.msg);
    });
  },
  jumpRegister:function(){
    var route={
        component: Register,
        title: '帐号注册',
        id:'register',
        display:true,
      };
    this.props.navigator.push(route);
  },
  login:function(){
    var phone = this.state.phone;
    var code = this.state.code;
    if(!this.checkPhone(phone)){
      alert("请输入正确的手机号码");
      return;
    }
    if(!this.checkCode(code)){
      alert("验证码为4位数字");
      return;
    }

    fetch(API.LOGIN+"?user_name="+phone+"&code="+code+"&type=verifiycode")
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.code==0){
        this._loginSucc(responseData.data);
      }else{
        alert("验证码错误");
      }
    })
    .done();
  },

  _loginSucc:function(userData){
    this.props.loginResult(userData);
  },

  logout:function(){
    this.setState({logined:false});
  },

  checkPhone:function(phone){
    return phone&&phone.length>10;
  },

  checkCode:function(code){
    return code&&code.length===4;
  },
  renderRegister:function(){
    return <NavigatorIOS
    style={{flex:1}}
    barTintColor='#6bb967'
    titleTextColor="#fff"
    tintColor="#fff"
    translucent={false}
    initialRoute={
      {
        component: Register,
        title: '帐号注册',
        leftButtonTitle:"返回",
        leftButtonIcon: require('../icon/ic_white_back.png'),
        onLeftButtonPress:() => {this.props.navigator.pop()},
      }} />;
    },
    _back:function(){
      Global.logined=true;
      this.props.navigator.pop();
    },
    renderLogin:function(){

      var getCode_text = this.state.secondsElapsed==0?'获取验证码':(this.state.secondsElapsed+'秒后重试');

      return (
        <Image style={[Util.size,styles.container]} source={require("../icon/bg_login.jpg")}>
        <TouchableHighlight style={[{marginLeft:15,marginTop:30,backgroundColor:'#00000000'}]} onPress={this._back} underlayColor="#00000000" >
        <Icon name="ios-close-circle-outline" size={30} color='white' />
        </TouchableHighlight>
        <View style={styles.loginform}>
        <Text style={[styles.title,{marginTop:10}]} >用户登陆</Text>
        <View style={[styles.inputRow,{marginTop:40}]}>
        <Text style={styles.label} >帐号</Text>
        <TextInput
        keyboardType ='numeric'
        clearButtonMode='while-editing'
        style={styles.input}
        placeholder="请输入11位手机号"
        onChangeText={(text) => this.setState({phone: text})}/>
        </View>
        <View style={[styles.line]} />

        <View style={[styles.inputRow,{marginTop:10}]}>
        <Text style={styles.label} >密码</Text>
        <TextInput
        keyboardType ='numeric'
        clearButtonMode='while-editing'
        style={styles.input}
        placeholder="6-12/位字母／数字"
        onChangeText={(text) => this.setState({pwd: text})}/>
        </View>
        <View style={[styles.line]} />

        <TouchableHighlight style={[styles.btn,styles.marginTop30]} underlayColor='#0057a84a' onPress={this.login}>
        <Text style={{color:'#fff'}}>登录</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.registerBtn,styles.marginTop30]} onPress={this.jumpRegister} underlayColor="#00000000" >
        <Text style={[styles.registerFont]} textDecorationLine='underline'>还没帐号？立即注册</Text>
        </TouchableHighlight>

        </View>


        <View style={[styles.thirdContainer]}>

        <View style={[styles.center,styles.thirdHeader,styles.transparent]} >
        <View style={[styles.thirdLine]}/>
        <Text style={[styles.thidDsn]} numberOfLines={1}> 其他方式登录 </Text>
        <View style={[styles.thirdLine]}/>
        </View>

        <View style={[styles.center,styles.loginTypeContainer]}>
        <ThiadLogin loginName='微博' loginIcon={require("../icon/ic_weibo.png")} />
        <ThiadLogin loginName='QQ' loginIcon={require("../icon/ic_qq.png")} />
        <ThiadLogin loginName='微信' loginIcon={require("../icon/ic_weixin.png")} />
        </View>
        </View>
        </Image>);
    },

    render: function() {
      return this.renderLogin();
    },
  });

var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
  },
  loginform:{
    backgroundColor:'#00000000',
    paddingLeft:40,
    paddingRight:40,
  },
  transparent:{
   backgroundColor:'#00000000',
 },
 title: {
  color:'#ffffff',
  fontSize:20,
  flex:1,
  textAlign:'center',
},
action:{
  height:50,
},
line:{
  height:1,
  backgroundColor: '#ffffff',
},
marginleft10:{
  marginLeft:10,
},
marginTop20:{
  marginTop:20,
},
marginTop30:{
  marginTop:30,
},
marginRight10:{
  marginRight:10,
},
inputRow:{
  backgroundColor:'#00000000',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
},
input:{
  height:35,
  borderColor:'#ccc',
  color:'#fff',
  flex:1,
  fontSize:14,
},
label: {
  width:80,
  fontSize: 14,
  color:'#ffffff'
},
btn:{
  height:35,
  backgroundColor:'#4d796e',
  justifyContent:'center',
  alignItems:'center',
  borderRadius: 10,
  borderWidth:1,
  borderColor:'#ffffff',
},
registerBtn:{
  height:20,
  backgroundColor:'#00000000',
  justifyContent:'center',
  alignItems:'flex-end',
},
registerFont:{
  fontSize:12,
  color:'#ffffff',
},
thirdContainer:{
 height:100,
 flex:1,
 justifyContent:"flex-end",
},
thirdHeader: {
 width: Util.size.width,
 height:20,
 paddingLeft:30,
 paddingRight:30,
 flexDirection:'row',
},
thidDsn:{
  fontSize: 14,
  color:'#ffffff'
},
thirdLine: {
 flex: 1,
 height:Util.pixel,
 backgroundColor:'#ffffff',
},
center:{
  justifyContent:'center',
  alignItems:'center',
},
loginTypeContainer:{
  flexDirection:'row',
  flexWrap:'wrap',  
},
loginName:{
  fontSize: 12,
  color:'#ffffff',
  backgroundColor:'#00000000',
},
loginIcon:{
  width:35,
  height:35,
},
loginType:{
  width:80,
  height:80,
}
});

module.exports = login;
