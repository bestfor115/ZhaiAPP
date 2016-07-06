var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  PixelRatio
} = React;

var CSS = {

  //单位像素
  pixel: 1 / PixelRatio.get(),
  //屏幕尺寸
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  tint:'#6bb967',
  bgClolor:'#EEF0F3',
  containerStyle:{
    marginTop:64,
    backgroundColor:'#EEF0F3',
    flex:1,
  },
};

module.exports = CSS;