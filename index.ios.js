/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';

 import {
 	AppRegistry,
 	StyleSheet,
 	NavigatorIOS,
 	Navigator,
 	TouchableOpacity,
 	Text,
 	Image,
 	View
 } from 'react-native';

 var Index = require('./app/view/index');
 var Register = require('./app/view/register');
 var Show = require('./app/util/showIcon');

 
 import Global from './app/util/global';


 class NavigationBar extends Navigator.NavigationBar {
 	render() {
 		var routes = this.props.navState.routeStack;

 		if (routes.length) {
 			var route = routes[routes.length - 1];

 			if (route.display === false) {
 				return null;
 			}
 		}

 		return super.render();
 	}
 }

 var NavigationBarRouteMapper = {
 	LeftButton: function(route, navigator, index, navState) {
 		if (route.id === 'main') {
 			return null;
 		}
 		var previousRoute = navState.routeStack[index - 1];
 		return (
 			<TouchableOpacity
 			onPress={() => navigator.pop()}
 			style={styles.navBarLeftButton}>
 			<Image source={require('./app/icon/ic_white_back.png')} style={styles.backImage}>
 			</Image>
 			</TouchableOpacity>
 			);
 	},
 	RightButton: function(route, navigator, index, navState) {
 		if (route.id === 'detail') {
 			return null;
 		}
 		return (
 			<TouchableOpacity
 			onPress={() => navigator.push({id:'detail',title:'Detail'})}
 			style={styles.navBarRightButton}>
 			<Text style={[styles.navBarText, styles.navBarButtonText]}>
 			</Text>
 			</TouchableOpacity>
 			);
 	},

 	Title: function(route, navigator, index, navState) {
 		return (
 			<Text style={[styles.navBarText, styles.navBarTitleText]}>
 			{route.title}
 			</Text>
 			);
 	},
 };

 var ZhaiAPP  = React.createClass({
 	renderNav:function(route,nav){
 		return <route.component navigator={nav} />
 	},
 	render:function(){
 		return (
 			<Navigator
 			style = {styles.container}
 			initialRoute={{id:"main",title:"",component:Index,display:false}}
 			renderScene={this.renderNav}
 			configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
 			navigationBar={
 				<NavigationBar
 				routeMapper={NavigationBarRouteMapper}
 				style={[styles.navBar,styles.bar]}
 				/>
 			}/>
 			);
 	},
 });

 var styles = StyleSheet.create({
 	backImage:{
 		width:20,
 		height:20,
 	},
 	container: {
 		flex: 1,
 	},
 	bar: {
 		height:64,
 		paddingTop:20,
 		backgroundColor: Global.tint,
         alignItems:"center",
 		 flexDirection:'row',
 	},
 	button: {
 		padding: 15,
 	},
 	containView:{
 		flex: 1,
 		backgroundColor:'gray',
 		justifyContent: 'center',
 	},
 	detailContainView:{
 		flex:1,
 		justifyContent: 'center',
 		backgroundColor:'green',
 	},
 	blackText:{
 		fontSize:20,
 		textAlign:'center',
 	},
 	navBar: {
 		backgroundColor: 'white',
 	},
 	navBarText: {
 		fontSize: 16,
 		marginVertical: 10,
 	},
 	navBarTitleText: {
 		fontWeight: '500',
 		fontSize:18,
 		color:'white',
 		textAlign:'center',
 	},
 	navBarLeftButton: {
 		paddingLeft: 10,
 		paddingTop:10,
 		justifyContent: 'center',
 	},
 	navBarRightButton: {
 		paddingRight: 10,
 		justifyContent: 'center',
 	},
 	navBarButtonText: {
 		color: '#5890FF',
 	},
 });


 AppRegistry.registerComponent('ZhaiAPP', () => ZhaiAPP);
