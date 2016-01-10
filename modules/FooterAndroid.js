/*
* @Author: willclass
* @Date:   2015-12-25 10:52:49
* @Last Modified by:   willclass
* @Last Modified time: 2015-12-25 17:52:35
*/

'use strict';


var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;

var Footer = React.createClass({
    render:function(){
      return (
          <View style={styles.footer}>
              <TouchableHighlight onPress = {this.props.onPressOne} style={styles.touch} underlayColor="rgba(0,0,0,0.3)">
              <View style={styles.cell}>
              <Image
               style={styles.icon}
               source={require('./asstes/home.png')}
             />
             <Text style={styles.text}>主页</Text>
              </View>
              </TouchableHighlight>

              <TouchableHighlight  onPress = {this.props.onPressTwo} style={styles.touch} underlayColor="rgba(0,0,0,0.3)">
              <View style={styles.cell}>
                  <Image
                   style={styles.icon}
                    source={require('./asstes/list.png')}
                 />
                 <Text style={styles.text}>列表</Text>
              </View>
              </TouchableHighlight>

                <TouchableHighlight
                   onPress = {this.props.onPressThree}
                 style={styles.touch} underlayColor="rgba(0,0,0,0.3)">
                <View style={styles.cell}>
                <Image
                 style={styles.icon}
                  source={require('./asstes/shop.png')}
               />
               <Text style={styles.text}>购物</Text>
                </View>
                </TouchableHighlight>


              <TouchableHighlight 
                 onPress = {this.props.onPressFour}
              style={styles.touch} underlayColor="rgba(0,0,0,0.3)">
              <View style={styles.cell}>
              <Image
               style={styles.icon}
                source={require('./asstes/help.png')}
             />
             <Text style={styles.text}>帮助</Text>
              </View>
              </TouchableHighlight>

          </View>
      )
    }
});

var styles = StyleSheet.create({
    footer:{
      flexDirection:"row",
      backgroundColor:"#ef5343",
      height:60,
    },
    icon:{
      resizeMode: Image.resizeMode.contain,
      height:50,
      alignSelf:"center",
      flex:1,
    },
    touch:{
      flex:1,
      overflow:"hidden"
    },
    cell:{
      justifyContent: 'center',
      height:50,
    },
    text:{
      textAlign:"center",
      color:"#ffffff"
    }
});

module.exports = Footer;
