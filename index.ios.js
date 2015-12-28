/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;


var Title = require("./modules/Title.js");
var Footer = require("./modules/Footer.js");
var Main = require("./modules/List.js");


var reactNative = React.createClass({
  render: function() {
    return (
      <View style={styles.views}>
      <Title style={styles.title} title="标题标标题标题标题标标题标题" info="点" ></Title>

      <View style={styles.main}>
          <Main></Main>
      </View>

      <Footer style = {styles.footer}></Footer>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  views:{
    flex:1
  },
  title: {
    height:50
  },
  main:{
    flex:1,
    backgroundColor:"#fff",
  },
  footer:{
     position:"relative",
     bottom:0,
     left:0,
     right:0,
     justifyContent:'flex-end'
  }
});

AppRegistry.registerComponent('reactNative', () => reactNative);
