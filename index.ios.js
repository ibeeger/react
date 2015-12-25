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

var reactNative = React.createClass({
  render: function() {
    return (
      <View style={styles.views}>
      <Title style={styles.title} title="标题标标题标题标题标标题标题" info="点" />
      <View style={styles.main}>
        <Text>文字</Text>
      </View>

      <Footer style = {styles.footer}></Footer>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  views:{
    flex:1,
  },
  title: {
    height:50,
    flex:1
  },
  main:{
    flex:6
  },
  footer:{
     justifyContent:'flex-end'
  }
});

AppRegistry.registerComponent('reactNative', () => reactNative);
